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

// WORK ON THE OVERALL COLOR AND SESSION DESIGN ALSO ENROLLMENT
// ALSO MAKE THE TABLES REUSABLE

const GridRow = styled.div`
  display: grid;
  grid-template-columns: 1fr repeat(4, 0.25fr);
  /* grid-template-columns: 1fr repeat(2, 0.175fr) 0.15fr 0.1fr; */
  gap: 1em;
  /* background-color: ${(props) =>
    props.index % 2 === 0 ? "#f2f2f2" : "#fff"}; */
  padding: 10px;
  /* text-align: center; */
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const GridCell = styled.div`
  padding: 0 0.5rem;

  &:not(:nth-child(5n + 1)) {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  &:nth-child(5n + 1) {
    padding: 0.5em;
  }
`;

export default function SessionRow({ row, index }) {

   const {mutate,isPending} = useDeleteSession()
   console.log(row.startDate)

  return (
    <>
      <GridRow index={index}>
        <GridCell>{row.courseName}</GridCell>
        <GridCell>{format(row.startDate, "EEEE dd MMM yyyy")}</GridCell>
        <GridCell>{format(row.endDate, "EEEE dd MMM yyyy")}</GridCell>
        <GridCell
          style={{
            color: row.active ? "var(--color-green)" : "var(--color-red-700)",
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
            <ButtonIcon>
              <Modal.Open opens="deleteSession">
                <HiOutlineTrash />
              </Modal.Open>
            </ButtonIcon>
            <Modal.Window name="deleteSession">
              <ConfirmDelete
                resourceName={row.courseName}
                onConfirm={()=>mutate(row.id)}
                disabled={isPending}
              />
            </Modal.Window>
            <Modal.Window name="editSession">
              <CreateSessionForm sessionToEdit={row} />
            </Modal.Window>
          </Modal>
        </GridCell>
      </GridRow>
    </>
  );
}
