/* eslint-disable react/prop-types */
import { IoIosPaperPlane } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { HiOutlineTrash, HiSquare2Stack } from "react-icons/hi2";
import EditLocalEnrollment from "./EditLocalEnrollment";
import { useLocalEnroll } from "../../../hook/EnrollmentListContext";
import { useAddEnrollment } from "./useEnrollment";
import { formatToNaira, parseDateInclude } from "../../../helper/helper";
import { nanoid } from "nanoid";
import Modal from "../../../ui/Modal";
import Menus from "../../../ui/Menus";
import Table from "../../../ui/Table";
import Td from "../../../ui/TableRow";
import SpinnerMini from "../../../ui/SpinnerMini";

export default function EnrollmentRow({ enroll }) {
  const { mutate, isPending } = useAddEnrollment();
  const { lid, fullName, courseName, enrollDate, bank, status, amount } =
    enroll;

  const { enrollArr: arr, setEnroll } = useLocalEnroll();
  // if (isPending) return <Spinner />;

  function handleDelete(lid) {
    setEnroll((p) => p.filter((ele) => ele.lid !== lid));
  }

  // console.log(enroll)
  function handleDuplicate() {
    const dup = { ...enroll, lid: nanoid() };
    // console.log(dup)

    setEnroll([...arr, dup]);
  }

  function handleSubmit(id) {
    const { lid, ...enr } = enroll;
    mutate({ ...enr },{
      onSuccess:()=>{

        setEnroll((p) => p.filter((ele) => ele.lid !== id));
      }
    });
  }
  return (
    <>
      <Table.Row>
        <Td>{fullName}</Td>
        <Td>{courseName}</Td>
        <Td>{parseDateInclude(enrollDate)}</Td>
        <Td>{bank}</Td>
        <Td>{formatToNaira(amount)}</Td>
        <Td
          status={status}
          style={{
            color: `${
              status ? "var(--color-green-700)" : "var(--color-yellow-700)"
            }`,
          }}
        >
          {status ? "Approved" : "Awaiting Approval"}
        </Td>
        {!status && (
          <Td>
            <Modal>
             {isPending ? <SpinnerMini/>: <Menus.Menu disabled={isPending}>
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
              </Menus.Menu>}
            </Modal>
          </Td>
        )}
      </Table.Row>
    </>
  );
}
