import {} from "react";
import { useParams } from "react-router-dom";
import { useCertificate } from "../Enrollment/useEnrollment";
import Spinner from "../../../ui/Spinner";

export default function CertificatePrint() {
  const params = useParams("");
  const { data, isLoading } = useCertificate(parseInt(params.id));

  if (isLoading) return <Spinner />;

//   console.log(data);
  return <div>CertificatePrint</div>;
}
