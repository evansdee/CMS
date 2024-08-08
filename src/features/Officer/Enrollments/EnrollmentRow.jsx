/* eslint-disable react/prop-types */
import {} from "react";
import Table from "../../../ui/Table";
import styled, { css } from "styled-components";
import ButtonIcon from "../../../ui/ButtonIcon";
import Modal from "../../../ui/Modal";
import { CiViewList } from "react-icons/ci";
import EnrollmentView from "./EnrollmentView";


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

  ${(prop) =>
    prop.status &&
    css`
      &:nth-last-child(1) {
        color: var(--color-green-700);
      }
    `};
`;

export default function EnrollmentRow({ enroll }) {
  const {  fullName, courseName, enrollDate, status } = enroll;

  return (
    <>
      <Table.Row>
        <GridCell>{fullName}</GridCell>
        <GridCell>{courseName}</GridCell>
        <GridCell>{enrollDate}</GridCell>
        <GridCell status={status}>
          {status ? "Approved" : "Awaiting Approval"}
        </GridCell>

        {!status && (
          <GridCell status={status}>
            <Modal>
              <ButtonIcon>
                <Modal.Open opens="editLocal">
                  <CiViewList />
                </Modal.Open>
              </ButtonIcon>

              <Modal.Window name="editLocal">
                <EnrollmentView data={enroll} />
              </Modal.Window>
            </Modal>
          </GridCell>
        )}
      </Table.Row>
    </>
  );
}
