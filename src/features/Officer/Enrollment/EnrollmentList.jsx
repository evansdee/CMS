import {useMemo} from "react";
import EnrollmentRow from "./EnrollmentRow";
import { filterDataFromOneDayAgo } from "../../../helper/helper";
import Menus from "../../../ui/Menus";
import Spinner from "../../../ui/Spinner";
import Table from "../../../ui/Table";
import EnrollLight from "../../../assets/enroll-light.png";
import EnrollDark from "../../../assets/enroll-dark.png";
import EmptyData from "../../../ui/EmptyData";
import { parse } from "date-fns";

export default function EnrollmentList({ enrollArr, enrollment, isPending }) {
  const filteredData = filterDataFromOneDayAgo(enrollment);
  const dateFormat = "dd MMMM yy, h:mm a";

  const data = useMemo(() => {
    return enrollArr.length > 0
      ? enrollArr.sort(
          (a, b) =>
            parse(a.enrollDate, dateFormat, new Date()) -
            parse(b.enrollDate, dateFormat, new Date())
        ).reverse()
      : filteredData
          ?.filter((ele) => ele.status === true && ele.isSignature !== null)
          .sort(
            (a, b) =>
              parse(a.enrollDate, dateFormat, new Date()) -
              parse(b.enrollDate, dateFormat, new Date())
          )
          .reverse();
  }, [enrollArr, filteredData, dateFormat]);
  

  if (isPending) return <Spinner />;

  if (!data?.length) return <EmptyData img1={EnrollDark} img2={EnrollLight} />;

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
