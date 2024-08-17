/* eslint-disable react/prop-types */


import {} from 'react'
import Table from '../../../ui/Table'
import Td from '../../../ui/TableRow'
import { formatToNaira } from '../../../helper/helper'
import ButtonIcon from '../../../ui/ButtonIcon'
import { FaBookOpenReader } from 'react-icons/fa6'
import { useUpdateCourse } from '../Enrollment/useCourse'
import SpinnerMini from '../../../ui/SpinnerMini'

export default function CourseApprovalRow({course}) {
    const {mutate,isPending}=useUpdateCourse()

    const {id,courseName,courseCode,codeAlt,newAmount} = course

    function handleApprove(){
        mutate({newCourse:{...course,isApproved:true},id})
    }
  return (
    <Table.Row>
        <Td>
        {courseName}
        </Td>
        <Td>
        {`${courseCode}/${codeAlt}`}
        </Td>
        <Td>
            {formatToNaira(newAmount)}
        </Td>
        <Td>
            <ButtonIcon onClick={handleApprove}>
               { isPending ? <SpinnerMini/>:<FaBookOpenReader/>}
            </ButtonIcon>
        </Td>
    </Table.Row>
  )
}
