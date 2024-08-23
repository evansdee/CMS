/* eslint-disable react/prop-types */
import {} from "react";
// import Table from "../../../ui/Table";
import EnrollmentRow from "./EnrollmentRow";
import { filterDataFromOneDayAgo } from "../../../helper/helper";
import Menus from "../../../ui/Menus";
import Spinner from "../../../ui/Spinner";
import Table from "../../../ui/Table";

export default function EnrollmentList({ enrollArr, enrollment, isPending }) {
  const filteredData = filterDataFromOneDayAgo(enrollment);
  let data =
    enrollArr.length > 0
      ? enrollArr
      : filteredData?.filter(
          (ele) => ele.status === true && ele.isSignature !== null
        );

  if (isPending) return <Spinner />;

  return (
    <>
      {/* <div> */}
      <Menus>
        <Table>
          <Table.Header
            data={[
              "Student",
              "Course",
              "Enrollment Date",
              "Bank",
              "Amount",
              "status",
              "action",
            ]}
          />
          <Table.Body
            data={data}
            render={(enroll) => (
              <EnrollmentRow key={enroll.id} enroll={enroll} />
            )}
          />
        </Table>
      </Menus>
      {/* </div> */}
    </>
  );
}
