

import {} from 'react'
import Table from '../../../ui/Table'
import { useCourse } from '../Enrollment/useCourse'
import CourseApprovalRow from './CourseApprovalRow'

export default function CourseApprovalList() {
    const {data,isLoading} = useCourse()

    const approval = data?.filter(ele=>(!ele.isApproved))
    console.log(approval)
  return (
    <Table>
        <Table.Header data={["Course Name", 'Course Code',"Fee","Action"]}/>
        <Table.Body data={approval} render={course=>(<CourseApprovalRow course={course}/>)}/>
    </Table>
  )
}
