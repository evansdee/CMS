import {} from "react";
import Table from "../../../ui/Table";
import { useLocalEnroll } from "../../../hook/EnrollmentListContext";
import EnrollmentRow from "./EnrollmentRow";
import { useAddAllEnrollment, useGetEnrollment } from "./useEnrollment";
import Button from "../../../ui/Button";
import { filterDataFromOneDayAgo } from "../../../helper/helper";
import Menus from "../../../ui/Menus";
import styled from "styled-components";
const Bottom = styled.div`
float: right;
margin: .5em 1em;
`;

export default function EnrollmentList() {
  const { data: enrollment } = useGetEnrollment();

  const { enrollArr, setEnroll } = useLocalEnroll();
  const { mutate } = useAddAllEnrollment();

  const filteredData = filterDataFromOneDayAgo(enrollment);
  let data =
    enrollArr.length > 0
      ? enrollArr
      : filteredData?.filter((ele) => ele.status === true);

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
          <Bottom>

          <Button
          size='small'
            onClick={() => {
              mutate(
                enrollArr.map((ele) => {
                  const { lid, ...allEle } = ele;
                  return allEle;
                })
              );
              setEnroll([]);
            }}
            >
            Enroll All
          </Button>
             </Bottom>
        )}
    </>

  );
}
