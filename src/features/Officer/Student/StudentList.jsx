/* eslint-disable react/prop-types */
import { useMemo } from "react";
import { useGetEnrollment } from "../Enrollment/useEnrollment";
import Table from "../../../ui/Table";
import StudentRow from "./StudentRow";
import LStu from "../../../assets/student-light-mode.svg";
import DStu from "../../../assets/student-dark-mode.png";
import Spinner from "../../../ui/Spinner";
import ErrorFallback from "../../../ui/ErrorFallback";
import EmptyData from "../../../ui/EmptyData";

export default function StudentList({ search, setSearch }) {

  const { data, error, isLoading } = useGetEnrollment();
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
              ele.courseCode.toLowerCase().includes(txt)
            // ele.gsm.toLowerCase().includes(txt)
          )
      : [];
  }, [data, search, txt]);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorFallback error={error} />;

  // console.log(filteredData);

  if (!filteredData?.length)return <EmptyData  img1={DStu} img2={LStu} />;
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
          render={(ele) => (
            <StudentRow key={ele.id} student={ele} setSearch={setSearch} />
          )}
        />
      </Table>
    </div>
  );
}
