/* eslint-disable react/prop-types */
import styled from "styled-components";
import ButtonIcon from "../../../ui/ButtonIcon";
import { FaEdit } from "react-icons/fa";
import Modal from "../../../ui/Modal";
import CreateSessionForm from "./CreateSessionForm";
import { format } from "date-fns";
import { HiOutlineTrash } from "react-icons/hi2";
import ConfirmDelete from "../../../ui/ConfirmDelete";
import { useDeleteSession } from "./useDeleteSession";
import Table from "../../../ui/Table";

// WORK ON THE OVERALL COLOR AND SESSION DESIGN ALSO ENROLLMENT
// ALSO MAKE THE TABLES REUSABLE


const GridCell = styled.div`
  /* padding: 0 0.5rem; */

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

export default function SessionRow({ row }) {
  const { mutate, isPending } = useDeleteSession();

  const {id,courseName,startDate,endDate,active} = row
  console.log(row.startDate);

  return (
    <>
      <Table.Row >
        <GridCell>{row.courseName}</GridCell>
        <GridCell>{format(startDate, "EEEE dd MMM yyyy")}</GridCell>
        <GridCell>{format(endDate, "EEEE dd MMM yyyy")}</GridCell>
        <GridCell
          style={{
            color: active ? "var(--color-green)" : "var(--color-red-700)",
          }}
        >
          {row.active ? "true" : "false"}
        </GridCell>
        <GridCell>
          <Modal>
            <ButtonIcon>
              <Modal.Open opens="editSession">
                <FaEdit />
              </Modal.Open>
            </ButtonIcon>
            <ButtonIcon variation='danger'>
              <Modal.Open opens="deleteSession">
                <HiOutlineTrash />
              </Modal.Open>
            </ButtonIcon>
            <Modal.Window name="deleteSession">
              <ConfirmDelete
                resourceName={courseName}
                onConfirm={() => mutate(id)}
                disabled={isPending}
              />
            </Modal.Window>
            <Modal.Window name="editSession">
              <CreateSessionForm sessionToEdit={row} />
            </Modal.Window>
          </Modal>
        </GridCell>
      </Table.Row>
    </>
  );
}
