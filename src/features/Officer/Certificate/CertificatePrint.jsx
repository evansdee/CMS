import { useReducer } from "react";
import { useParams } from "react-router-dom";
import { useCertificate } from "../Enrollment/useEnrollment";
import Spinner from "../../../ui/Spinner";
import { useCourse } from "../Enrollment/useCourse";
import CertificatePanel from "./CertificatePanel";
import Certificate from "../Templates/Certificate";
import ErrorFallback from "../../../ui/ErrorFallback";
import { useCertificateState } from "./useCertificateState";



export default function CertificatePrint() {
  const params = useParams();
  const { data: courses } = useCourse();
  const { data, isLoading,error } = useCertificate(parseInt(params.id));


  const { state, dispatch } = useCertificateState();

   
  if (isLoading || isGetting) return <Spinner />;
  if (error) return <ErrorFallback error={error} />;
  const cert = courses?.find((ele) => ele.courseName === data.courseName);

  console.log(cert);
  console.log(data);
  return (
    <>
      <CertificatePanel state={state} handleInput={handleInputChange} data={data}/>
      <Certificate dispatch={dispatch} state={state} cert={cert} data={data}/>
    </>
  );
}
