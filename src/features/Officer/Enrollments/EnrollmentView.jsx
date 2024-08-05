/* eslint-disable react/prop-types */
import { FaBookOpenReader } from "react-icons/fa6";
import GridContainer from "../../../ui/GridContainer";
import GridItem from "../../../ui/GridItem";
import Flex from "../../../ui/Flex";
import { FaUser } from "react-icons/fa";
import { format } from "date-fns";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import Button from "../../../ui/Button";
import { useUpdateEnrollment } from "./useUpdateEnrollment";
import { useCount, useUpdateCourseCount } from "../Enrollment/useCourseCount";
import { useDeleteEnrollment } from "./useDeleteEnrollment";

export default function EnrollmentView({ data,onCloseModal }) {
    const { updateCount } = useUpdateCourseCount();
    const { data: countList } = useCount();
  const { mutate:updateStudent } = useUpdateEnrollment();
  const mutate = useDeleteEnrollment()
  const { id, fullName, photo, dob, courseCode, codeAlt } = data;

  function handleUpdate() {
    const count = countList?.filter((ele) => ele.courseCode === courseCode)[0];

    let newObj = {
        newEnrollment: {
          ...data,
          status: true,
          certificateNo: `JINSR/${courseCode}/${codeAlt}/${count?.count}/${format(
            new Date(),
            "yyyy"
          )}`,
        },
        id: id,
      }

    console.log(newObj);
    updateStudent(newObj);

     updateCount({
      item: { ...count, count: count.count + 1 },
      countId: count.courseCode,
    });
    onCloseModal?.()
  }

  function handleDelete(){
    mutate(id)
    onCloseModal?.()

  }

  return (
    <GridContainer>
      <GridItem className="item1">
        <img src={photo} />
        <p>
          <Flex align="center" gap=".5em">
            <FaUser />
            <span>{fullName}</span>
          </Flex>
        </p>
        <p>
          <Flex align="center" gap=".5em">
            <LiaBirthdayCakeSolid />
            <span>{format(dob, "dd MMM yyyy")}</span>
          </Flex>
        </p>
        <Flex gap="1em">
          <Button variation="btn" size="small" onClick={handleUpdate}>
            Approve
          </Button>
          <Button variation="danger" size="small" onClick={handleDelete}>
            Decline
          </Button>
        </Flex>
      </GridItem>
      <GridItem className="item2">
        <p>
          <FaBookOpenReader />
        </p>
      </GridItem>
      <GridItem className="item3">Span Rest</GridItem>
      <GridItem className="item4">Item 1</GridItem>
      <GridItem className="item5">Item 2</GridItem>
    </GridContainer>
  );
}
