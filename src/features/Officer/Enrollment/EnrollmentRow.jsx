/* eslint-disable react/prop-types */
import {} from "react";
import Table from "../../../ui/Table";
import styled from "styled-components";
import ButtonIcon from "../../../ui/ButtonIcon";
import { IoIosPaperPlane } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { HiOutlineTrash } from "react-icons/hi2";
import Modal from "../../../ui/Modal";
import EditLocalEnrollment from "./EditLocalEnrollment";
import { useLocalEnroll } from "../../../hook/EnrollmentListContext";
import { useAddEnrollment } from "./useEnrollment";

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
  const { gsm, fullName, courseName, enrollDate, bank, status } = enroll;
  // console.log(enroll)

  const { setEnroll } = useLocalEnroll();

  function handleDelete(gsm) {
    setEnroll((p) => p.filter((ele) => ele.gsm !== gsm));
  }

  function handleSubmit(gsm) {
    mutate(enroll);
    setEnroll((p) => p.filter((ele) => ele.gsm !== gsm));
  }
  return (
    <>
      <Table.Row>
        <GridCell>{fullName}</GridCell>
        <GridCell>{courseName}</GridCell>
        <GridCell>{enrollDate}</GridCell>
        <GridCell>{bank}</GridCell>
        <GridCell>00000</GridCell>
        <GridCell status={status} style={{color:`${status  ? "var(--color-green-700)" : "var(--color-yellow-700)"}`}}>
          {status ? "Approved" : "Awaiting Approval"}
        </GridCell>
        {!status && <GridCell>
          <Modal>
            <ButtonIcon>
              <Modal.Open opens="editLocal">
                <FaEdit />
              </Modal.Open>
            </ButtonIcon>
            <ButtonIcon onClick={() => handleSubmit(gsm)} disabled={isPending}>
              <IoIosPaperPlane />
            </ButtonIcon>
            <ButtonIcon
              variation="danger"
              onClick={() => handleDelete(gsm)}
              disabled={isPending}
            >
              <HiOutlineTrash />
            </ButtonIcon>
            <Modal.Window name="editLocal">
              <EditLocalEnrollment enroll={enroll} setEnroll={setEnroll} />
            </Modal.Window>
          </Modal>
        </GridCell>}
      </Table.Row>
    </>
  );
}
