/* eslint-disable react/prop-types */
import {} from "react";
import Table from "../../../ui/Table";
import styled from "styled-components";
import ButtonIcon from "../../../ui/ButtonIcon";
import { IoIosPaperPlane } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { HiOutlineTrash, HiSquare2Stack } from "react-icons/hi2";
import Modal from "../../../ui/Modal";
import EditLocalEnrollment from "./EditLocalEnrollment";
import { useLocalEnroll } from "../../../hook/EnrollmentListContext";
import { useAddEnrollment } from "./useEnrollment";
import { formatToNaira } from "../../../helper/helper";
import { format, parse } from "date-fns";
import { nanoid } from "nanoid";
import Menus from "../../../ui/Menus";

const GridCell = styled.div`
  padding: 0 0.5rem;

  &:not(:first-child) {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  &:nth-child(5n + 1) {
    padding: 0.5em;
  }
`;

export default function EnrollmentRow({ enroll }) {
  const { mutate, isPending } = useAddEnrollment();
  const { lid, fullName, courseName, enrollDate, bank, status, amount } =
    enroll;

  const parseDate = (date) => {
    if (date.includes("-")) {
      return format(
        parse(date, "dd-MMMM-yy", new Date()),
        "dd MMMM yy hh:MM aaa"
      );
    } else {
      return date;
    }
  };

  const { enrollArr: arr, setEnroll } = useLocalEnroll();

  function handleDelete(lid) {
    setEnroll((p) => p.filter((ele) => ele.lid !== lid));
  }

  function handleDuplicate() {
    const dup = { ...enroll, lid: nanoid() };

    setEnroll([...arr, dup]);
  }

  function handleSubmit(id) {
    const { lid, ...enr } = enroll;
    mutate({ ...enr });
    setEnroll((p) => p.filter((ele) => ele.lid !== id));
  }
  return (
    <>
      <Table.Row>
        <GridCell>{fullName}</GridCell>
        <GridCell>{courseName}</GridCell>
        <GridCell>{parseDate(enrollDate)}</GridCell>
        {/* <GridCell>{formattedDate}</GridCell> */}
        <GridCell>{bank}</GridCell>
        <GridCell>{formatToNaira(amount)}</GridCell>
        <GridCell
          status={status}
          style={{
            color: `${
              status ? "var(--color-green-700)" : "var(--color-yellow-700)"
            }`,
          }}
        >
          {status ? "Approved" : "Awaiting Approval"}
        </GridCell>
        {!status && (
          <GridCell>
            <Modal>
              <Menus.Menu>
                <Menus.Toggle id={lid} />

                <Menus.List id={lid}>
                  <Modal.Open opens="editLocal">
                    <Menus.Button icon={<FaEdit />}>Edit</Menus.Button>
                  </Modal.Open>

                  <Menus.Button
                    icon={<HiSquare2Stack />}
                    onClick={() => handleDuplicate()}
                  >
                    Duplicate
                  </Menus.Button>

                  <Menus.Button
                    icon={<IoIosPaperPlane />}
                    onClick={() => handleSubmit(lid)}
                    disabled={isPending}
                  >
                    Enroll
                  </Menus.Button>
                  <Menus.Button
                    icon={<HiOutlineTrash />}
                    onClick={() => handleDelete(lid)}
                    disabled={isPending}
                  >
                    Delete
                  </Menus.Button>
                </Menus.List>

                <Modal.Window name="editLocal">
                  <EditLocalEnrollment enroll={enroll} setEnroll={setEnroll} />
                </Modal.Window>
              </Menus.Menu>
            </Modal>
          </GridCell>
        )}
      </Table.Row>
    </>
  );
}
