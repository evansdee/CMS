/* eslint-disable react/prop-types */
import {} from "react";
import styled, { css } from "styled-components";

import { FcApprove, FcDisapprove } from "react-icons/fc";
import toast from "react-hot-toast";
import SpinnerMini from "../../ui/SpinnerMini";
import Table from "../../ui/Table-v1";
import ButtonIcon from "../../ui/ButtonIcon";
import { useUpdateEnrollment } from "../Officer/Approval/useUpdateEnrollment";


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

export default function SignatureRow({ enroll }) {
  const { id, fullName, certificateNo } = enroll;
  const { mutate: updateStudent,isPending } = useUpdateEnrollment();


  function handleApprove() {
    const newObj = {
      newEnrollment: {
        ...enroll,
        isSignature: true,
      },
      id: id,
    };

    console.log(newObj)
    updateStudent(newObj,{onSuccess:()=>toast.success(`Signature Approved`)})
  }

  function handleDissapprove(){
    const newObj = {
        newEnrollment: {
          ...enroll,
          isSignature: false,
        },
        id: id,
      };
  
      console.log(newObj)
    updateStudent(newObj,{onSuccess:()=>toast.success(`Signature Dissapproved`)})

  }

  return (
    <>
      <Table.Row>
        <GridCell>{fullName}</GridCell>
        <GridCell>{certificateNo}</GridCell>

        <GridCell>
        { isPending ? <SpinnerMini/> : <>
        <ButtonIcon onClick={handleApprove}>
            <FcApprove />
          </ButtonIcon>
          <ButtonIcon onClick={handleDissapprove}>
            <FcDisapprove />
          </ButtonIcon>
        </>
          }
        </GridCell>
      </Table.Row>
    </>
  );
}
