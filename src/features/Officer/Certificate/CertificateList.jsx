import {} from "react";
import Table from "../../../ui/Table";
import { useGetEnrollment } from "../Enrollment/useEnrollment";
import { filterDataFromOneDayAgo } from "../../../helper/helper";
import CertificateRow from "./CertificateRow";
import Spinner from "../../../ui/Spinner";
import Image from "../../../ui/Image";
import Flex from "../../../ui/Flex";
import DarkCert from '../../../assets/cert-dark-mode.png';
import LightCert from '../../../assets/cert-light-mode.png';
import { useDarkMode } from "../../../hook/DarkModeToggle";


export default function CertificateList() {
  const {isDark} = useDarkMode()

  const { data: enrollment,isLoading } = useGetEnrollment();
  const filteredData = filterDataFromOneDayAgo(enrollment);


  if(isLoading) return <Spinner/>
  const data = filteredData?.filter(
    (ele) => ele.status === true && ele.isSignature !== null
  );

  if (!filteredData?.length)
    return (
      <Flex align='center' justify='center'>
        <Image
          width="40%"
          src={isDark ? DarkCert : LightCert}
        />
      </Flex>
    );
  // console.log(data)
  return (
    <>
      <Table>
        <Table.Header
          data={[
            "Student",
            "Course",
            "Certificate No",
            "Date Issued",
            "Print Status",
            "Action",
          ]}
        />
        <Table.Body data={data} render={cert=>(<CertificateRow key={cert.id} cert={cert}/>)}/>
      </Table>
    </>
  );
}
