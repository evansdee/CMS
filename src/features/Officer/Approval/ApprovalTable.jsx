import Table from "../../../ui/Table-v1";
import EnrollmentRow from "./ApprovalRow";
import ErrorFallback from "../../../ui/ErrorFallback";
import { useApproval } from "./useApproval";
import DarkApp from "../../../assets/approval-dark.png";
import LightApp from "../../../assets/approval-light.png";
import EmptyData from "../../../ui/EmptyData";


export default function EnrollmentTable() {
  const {  error, activeEnrollment } =
    useApproval();

  if (error)
    return <ErrorFallback error={error} />;

  //   const newData = activeEnrollment.map(ele=>{
  //     const {codeAlt,courseCode} = ele
  //   const count = countList?.filter((ele) => ele.codeAlt === codeAlt)[0];

  //   return {
  //     ...ele,
  //     status: true,
  //     certificateNo: `JINSR/${courseCode}/${codeAlt}/${count?.count}/${format(
  //       new Date(),
  //       "yyyy"
  //     )}`,
  //   }
  //   updateCount({
  //     item: { ...count, count: count.count + 1 },
  //     countId: count.codeAlt,
  //   });
  //   })
  // }
  // console.log(activeEnrollment);
  
  if (!activeEnrollment?.length) return <EmptyData img1={DarkApp} img2={LightApp} />;

  return (
    <>
      <Table column="1fr  1fr repeat(3, 0.5fr)">
        <Table.Header
          data={["Student", "Course", "Enrollment Date", "status", "action"]}
        />
        <Table.Body
          data={activeEnrollment}
          render={(enroll) => <EnrollmentRow key={enroll.id} enroll={enroll} />}
        />
      </Table>
    </>
  );
}
