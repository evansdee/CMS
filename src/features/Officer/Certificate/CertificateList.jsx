import {} from "react";
import Table from "../../../ui/Table";
import { useGetEnrollment } from "../Enrollment/useEnrollment";
import {
  filterDataFromOneDayAgo,
  filterDataFromLastDays,
  sortByCourseAndCertificate,
} from "../../../helper/helper";
import CertificateRow from "./CertificateRow";
import Spinner from "../../../ui/Spinner";
import Image from "../../../ui/Image";
import Flex from "../../../ui/Flex";
import DarkCert from "../../../assets/cert-dark-mode.png";
import LightCert from "../../../assets/cert-light-mode.png";
import { useDarkMode } from "../../../hook/DarkModeToggle";
import { useSearchParams } from "react-router-dom";
import ErrorFallback from "../../../ui/ErrorFallback";
import { parse } from "date-fns";

export default function CertificateList() {
  const { isDark } = useDarkMode();

  const { data: enrollment, isLoading, error } = useGetEnrollment();
  const today = filterDataFromOneDayAgo(enrollment);
  const three = filterDataFromLastDays(enrollment,2);
  const seven = filterDataFromLastDays(enrollment,6);

  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("date") || "today";
  // console.log(three, seven, today);

  let filterArray;

  if (isLoading) return <Spinner />;
  if (error) return <ErrorFallback error={error} />;

  function handleFilter(arr) {
    const data = arr.filter(
      (ele) => ele.status === true && ele.isSignature !== null && !ele.printStatus
    );

    return data;
  }

  if (filterValue === "today") filterArray = handleFilter(today);
  if (filterValue === "3") filterArray = handleFilter(three);
  if (filterValue === "7") filterArray = handleFilter(seven);


  
 


  

  filterArray = sortByCourseAndCertificate(filterArray)

  console.log(filterArray,"lol")

  if (!filterArray?.length)
    return (
      <Flex align="center" justify="center">
        <Image width="40%" src={isDark ? DarkCert : LightCert} />
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
        <Table.Body
          data={filterArray}
          render={(cert) => <CertificateRow key={cert.id} cert={cert} />}
        />
      </Table>
    </>
  );
}
