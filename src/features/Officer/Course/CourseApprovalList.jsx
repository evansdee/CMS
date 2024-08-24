

import {} from 'react'
import Table from '../../../ui/Table'
import { useCourse } from '../Enrollment/useCourse'
import CourseApprovalRow from './CourseApprovalRow'
import Spinner from '../../../ui/Spinner'
import ErrorFallback from '../../../ui/ErrorFallback'
import CourseSvg from "../../../assets/course.png"
import Image from "../../../ui/Image";
import Flex from "../../../ui/Flex";

export default function CourseApprovalList() {
    const {data,isLoading,error} = useCourse()
    if(isLoading) return <Spinner/>
    if (error) return <ErrorFallback error={error} />;

    const approval = data?.filter(ele=>(!ele.isApproved))
    if (!approval?.length)
      return (
        <Flex align="center" justify="center">
          <Image width="35%" src={CourseSvg} />
        </Flex>
      );
  return (
    <Table>
        <Table.Header data={["Course Name", 'Course Code',"Fee","Action"]}/>
        <Table.Body data={approval} render={course=>(<CourseApprovalRow course={course}/>)}/>
    </Table>
  )
}
