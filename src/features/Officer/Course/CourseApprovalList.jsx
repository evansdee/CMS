

import {} from 'react'
import Table from '../../../ui/Table'
import { useCourse } from '../Enrollment/useCourse'
import CourseApprovalRow from './CourseApprovalRow'
import Spinner from '../../../ui/Spinner'
import ErrorFallback from '../../../ui/ErrorFallback'

export default function CourseApprovalList() {
    const {data,isLoading,error} = useCourse()
    if(isLoading) return <Spinner/>
    if (error) return <ErrorFallback error={error} />;

    const approval = data?.filter(ele=>(!ele.isApproved))
    console.log(approval)
  return (
    <Table>
        <Table.Header data={["Course Name", 'Course Code',"Fee","Action"]}/>
        <Table.Body data={approval} render={course=>(<CourseApprovalRow course={course}/>)}/>
    </Table>
  )
}
