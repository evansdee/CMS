import {} from "react";
import Table from "../../../ui/Table";
import { useGetEnrollment } from "../Enrollment/useEnrollment";
import { filterDataFromOneDayAgo } from "../../../helper/helper";
import CertificateRow from "./CertificateRow";

export default function CertificateList() {
  const { data: enrollment } = useGetEnrollment();
  const filteredData = filterDataFromOneDayAgo(enrollment);

  const data = filteredData?.filter(
    (ele) => ele.status === true && ele.isSignature !== null
  );

  // console.log(data)
  return (
    <>
      <Table>
        <Table.Header
          data={[
            "Student",
            "Course",
            "Certificate No",
            "Date Issued",
            "Print Status",
            "Action",
          ]}
        />
        <Table.Body data={data} render={cert=>(<CertificateRow key={cert.id} cert={cert}/>)}/>
      </Table>
    </>
  );
}
