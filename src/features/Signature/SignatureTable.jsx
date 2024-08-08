import {} from "react";
import { useGetEnrollment } from "../Officer/Enrollment/useEnrollment";
import Table from "../../ui/Table";
import SignatureRow from "./SignatureRow";
import Spinner from "../../ui/Spinner";
import BottomButtonAll from "../../ui/BottomButtonAll";
import { useUpdateAllSignature } from "./useUpdateAllSignature";
import toast from "react-hot-toast";

export default function SignatureTable() {
  const { data, isLoading } = useGetEnrollment();
  const { mutate, isPending } = useUpdateAllSignature();
  if (isLoading || isPending) return <Spinner />;
  const activeSignature = data?.filter(
    (ele) => ele.isSignature === null && ele.status
  );

  console.log(activeSignature);

  function handleAll(arr, value) {
    mutate(
      { objects: arr, value },
      {
        onSuccess: () => {
          toast.success(
            `${value ? "Signature Approved Successfully" : "No Signature"}`
          );
        },
      }
    );
  }
  return (
    <>
      <Table column="repeat(3,1fr)">
        <Table.Header data={["Student", "Certificate Number", "Action"]} />
        <Table.Body
          data={activeSignature}
          render={(enroll) => <SignatureRow key={enroll.id} enroll={enroll} />}
        />
      </Table>

      {activeSignature.length > 1 && (
        <>
        <BottomButtonAll onClick={() => handleAll(activeSignature, true)}>
          Approve all
        </BottomButtonAll>
        <BottomButtonAll onClick={() => handleAll(activeSignature, false)}>
          Disapprove all
        </BottomButtonAll>
        </>
      )}
    </>
  );
}
