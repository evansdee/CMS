/* eslint-disable react/prop-types */
import {useMemo} from "react";
import { useGetEnrollment } from "../Enrollment/useEnrollment";
import Table from "../../../ui/Table";
import StudentRow from "./StudentRow";

export default function StudentList({ search }) {
  const { data } = useGetEnrollment();
  const txt = search.toLowerCase();

  const filteredData = useMemo(()=>{
    return search.length >= 3
    ? data
        ?.filter(
          (ele) =>
            ele.status &&
            ele.certificateNo.length > 0 &&
            ele.isSignature !== null
        )
        .filter(
          (ele) =>
            ele.fullName.toLowerCase().includes(txt) ||
            ele.certificateNo.toLowerCase().includes(txt) 
            // ele.gsm.toLowerCase().includes(txt)
        )
    : [];
  },[data,search,txt])
    

  //   console.log(filteredData);
  return (
    <div>
      <Table>
        <Table.Header
          data={[
            "Last Name",
            "First Name",
            "Other Names",
            "Date of Birth",
            "Phone",
            "Registration Date",
            "Details",
          ]}
        />
      <Table.Body
          data={filteredData}
          render={(ele) => <StudentRow key={ele.id} student={ele} />}
        />
      </Table>

    </div>
  );
}
