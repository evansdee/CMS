import { useReducer } from "react";
import { useParams } from "react-router-dom";
import { useCertificate } from "../Enrollment/useEnrollment";
import Spinner from "../../../ui/Spinner";
import { useCourse } from "../Enrollment/useCourse";
import CertificatePanel from "./CertificatePanel";
import Certificate from "../Templates/PSCB";
import ErrorFallback from "../../../ui/ErrorFallback";

const initialState = {
  certNo: 10,
  name: 10,
  country: 10,
  dob: 10,
  doi: 10,
  fromToDate: 10,
  qrCode: 50,
};

function certificateReducer(state, action) {
  switch (action.type) {
    case "certNo":
    case "name":
    case "country":
    case "dob":
    case "doi":
    case "fromToDate":
    case "qrCode":
      return {
        ...state,
        [action.type]: action.payload,
      };
    default:
      return state;
  }
}

export default function CertificatePrint() {
  const params = useParams();
  const { data: courses } = useCourse();
  const { data, isLoading,error } = useCertificate(parseInt(params.id));

  const [state, dispatch] = useReducer(certificateReducer, initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: `${name}`, payload: value });
  };

  if (isLoading) return <Spinner />;
  if(error) return <ErrorFallback error={error}/>

  const cert = courses?.find(
    (ele) => ele.courseCode === data.courseCode && ele.codeAlt === data.codeAlt
  );

  // console.log(cert);
  return (
    <>
      <CertificatePanel state={state} handleInput={handleInputChange} />
      <Certificate  state={state}/>
    </>
  );
}
