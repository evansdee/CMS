import { useState, useMemo } from "react";
import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";
import { useGetEnrollment } from "../Enrollment/useEnrollment";
import Table from "../../../ui/Table";
import CertificateRow from "./CertificateRow";
import Flex from "../../../ui/Flex";
import DarkCert from '../../../assets/cert-dark-mode.png';
import LightCert from '../../../assets/cert-light-mode.png';
import Image from "../../../ui/Image";
import { useDarkMode } from "../../../hook/DarkModeToggle";

export default function CertificateSearch() {
    const {isDark} = useDarkMode()
  const { data: certificates } = useGetEnrollment();
  const [search, setSearch] = useState("");
  const data = certificates?.filter(
    (ele) => ele.status === true && ele.isSignature !== null
  );

  const filterData = useMemo(() => {
    if (search.length >= 3) {
      return data?.filter(
        ({ fullName, gsm }) => fullName.toLowerCase().includes(search) || gsm?.includes(search)
      );
    }
    
    return [];
  }, [data, search]);


  return (
    <div>
      <FormRow label="Find Certificate">
        <Input
          placeholder="Search by Full Name or Phone number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </FormRow>

      {!filterData?.length ? <Flex align='center' justify='center'>
        <Image
          width="30%"
          src={isDark ? DarkCert : LightCert}
        />
      </Flex>:<Table>
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
          data={filterData}
          render={(cert) => <CertificateRow key={cert.id} cert={cert} />}
        />
      </Table>}
    </div>
  );
}
