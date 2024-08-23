/* eslint-disable react/prop-types */
import {} from "react";
import Stat from "../../ui/Stat";
import { PiStudentFill } from "react-icons/pi";
import { formatToNaira } from "../../helper/helper";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { useCourse } from "../Officer/Enrollment/useCourse";
import { FaBookOpenReader } from "react-icons/fa6";
import { RiRefund2Fill } from "react-icons/ri";

export default function Stats({ data }) {

  const students = data?.length
  const fees = data?.reduce((acc,ele)=>{
    return acc + parseInt(ele.amount)
  },0)

  const renew = data?.filter(ele=>(ele.isRenewal))

  const {data:courses} = useCourse()
  return (
    <>
      <Stat
        title={"Approved Student"}
        color={"blue"}
         icon={<PiStudentFill />}
         value={students}
      />
      <Stat
        title={"Fees Paid"}
        color={"green"}
         icon={<HiOutlineBanknotes />}
         value={formatToNaira(fees)}
      />
      <Stat
        title={"Approved Courses"}
        color={"indigo"}
         icon={<FaBookOpenReader />}
         value={courses?.length}
      />
      <Stat
        title={"Renewal"}
        color={"yellow"}
         icon={<RiRefund2Fill />}
         value={renew?.length}
      />
    </>
  );
}
