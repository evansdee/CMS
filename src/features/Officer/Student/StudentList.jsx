/* eslint-disable react/prop-types */
import { useMemo } from "react";
import { useGetEnrollment } from "../Enrollment/useEnrollment";
import Table from "../../../ui/Table";
import StudentRow from "./StudentRow";
import Image from "../../../ui/Image";
import Flex from "../../../ui/Flex";

export default function StudentList({ search,setSearch }) {
  const { data } = useGetEnrollment();
  const txt = search.toLowerCase();

  const filteredData = useMemo(() => {
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
  }, [data, search, txt]);

  console.log(filteredData)

  if (!filteredData?.length)
    return (
      <Flex align='center' justify='center'>
        <Image
          width="40%"
          src="https://qtubihsbqxewhrenphaz.supabase.co/storage/v1/object/public/asset/urban-no-data-found-3.png"
        />
      </Flex>
    );
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
          render={(ele) => <StudentRow key={ele.id} student={ele} setSearch={setSearch}/>}
        />
      </Table>
    </div>
  );
}
