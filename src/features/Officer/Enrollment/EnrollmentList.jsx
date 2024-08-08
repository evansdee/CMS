import {} from "react";
import Table from "../../../ui/Table";
import { useLocalEnroll } from "../../../hook/EnrollmentListContext";
import EnrollmentRow from "./EnrollmentRow";
import { useAddAllEnrollment, useGetEnrollment } from "./useEnrollment";
import { filterDataFromOneDayAgo } from "../../../helper/helper";
import Menus from "../../../ui/Menus";
import Spinner from "../../../ui/Spinner";
import BottomButtonAll from "../../../ui/BottomButtonAll";


export default function EnrollmentList() {
  const { data: enrollment } = useGetEnrollment();

  const { enrollArr, setEnroll } = useLocalEnroll();
  const { mutate, isPending } = useAddAllEnrollment();

  const filteredData = filterDataFromOneDayAgo(enrollment);
  let data =
    enrollArr.length > 0
      ? enrollArr
      : filteredData?.filter((ele) => ele.status === true && ele.isSignature !== null);

  if (isPending) return <Spinner />;

  function handleEnroll() {
    mutate(
      enrollArr.map((ele) => {
        const { lid, ...allEle } = ele;
        return allEle;
      })
    );
    setEnroll([]);
  }
  // console.log(filteredData);
  return (
    <>
      <div>
        <Menus>
          <Table column="1fr 1fr repeat(5, 0.5fr)">
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
      </div>
      {enrollArr.length > 1 && (
        <BottomButtonAll onClick={handleEnroll}>Enroll All</BottomButtonAll>
      )}
    </>
  );
}
