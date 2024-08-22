import { useReducer } from "react";
import { useParams } from "react-router-dom";
import { useCertificate } from "../Enrollment/useEnrollment";
import Spinner from "../../../ui/Spinner";
import { useCourse } from "../Enrollment/useCourse";
import CertificatePanel from "./CertificatePanel";
import Certificate from "../Templates/Certificate";
import ErrorFallback from "../../../ui/ErrorFallback";

const initialState = {
  certNo: 25,
  name: 30,
  country: 25,
  dob: 25,
  doi: 25,
  fromToDate: 25,
  qrCode: 80,
  img:40
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
    case "img":
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
    (ele) => ele.courseName === data.courseName
  );

  console.log(data);
  return (
    <>
      <CertificatePanel state={state} handleInput={handleInputChange} data={data}/>
      <Certificate  state={state} cert={cert} data={data}/>
    </>
  );
}
