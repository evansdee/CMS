/* eslint-disable react/prop-types */

import {} from "react";
import Table from "../../../ui/Table";
import Td from "../../../ui/TableRow";
import { formatToNaira } from "../../../helper/helper";
import ButtonIcon from "../../../ui/ButtonIcon";
import { FaBookOpenReader } from "react-icons/fa6";
import { useDeleteCourse, useUpdateCourse } from "../Enrollment/useCourse";
import SpinnerMini from "../../../ui/SpinnerMini";
import { HiOutlineTrash } from "react-icons/hi2";

export default function CourseApprovalRow({ course }) {
  const { mutate, isPending } = useUpdateCourse();
  const { mutate:dell, isDeleting } = useDeleteCourse();


  const { id, courseName, courseCode, codeAlt, newAmount } = course;

  console.log(id)
  function handleApprove() {
    mutate({ newCourse: { ...course, isApproved: true }, id });
  }

  function handleDelete(){
    dell(id)
  }
  return (
    <Table.Row>
      <Td>{courseName}</Td>
      <Td>{`${courseCode}/${codeAlt}`}</Td>
      <Td>{formatToNaira(newAmount)}</Td>
      <Td>
        {isPending || isDeleting ? (
          <SpinnerMini />
        ) : (
          <>
            <ButtonIcon onClick={handleApprove}>
              <FaBookOpenReader />
            </ButtonIcon>
            <ButtonIcon variation='danger' onClick={handleDelete}>
              <HiOutlineTrash />
            </ButtonIcon>
          </>
        )}
      </Td>
    </Table.Row>
  );
}
