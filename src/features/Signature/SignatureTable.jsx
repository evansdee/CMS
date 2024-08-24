import {} from "react";
import Table from "../../ui/Table-v1";
import SignatureRow from "./SignatureRow";
import { useSignature } from "./useSignature";
import SignLight from "../../assets/SignLight.png"
import SignDark from "../../assets/SignDark.png"
import EmptyData from "../../ui/EmptyData";

export default function SignatureTable() {
  const { activeSignature} = useSignature();

  if (!activeSignature?.length)return <EmptyData img1={SignDark} img2={SignLight} />;
  return (
    <>
      <Table column="repeat(3,1fr)">
        <Table.Header data={["Student", "Certificate Number", "Action"]} />
        <Table.Body
          data={activeSignature}
          render={(enroll) => <SignatureRow key={enroll.id} enroll={enroll} />}
        />
      </Table>
    </>
  );
}
