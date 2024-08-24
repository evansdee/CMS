import { useState, useMemo } from "react";
import EnrollmentExistSearch from "./EnrollmentExistSearch";
import Table from "../../../ui/Table";
import EnrollDark from "../../../assets/enroll-dark.png";
import EnrollLight from "../../../assets/enroll-light.png";
import EmptyData from "../../../ui/EmptyData";

import EnrollmentExistRow from "./EnrollmentExistRow";

export default function EnrollmentExistList({ data }) {
  const [search, setSearch] = useState("");

  const txt = search.toLowerCase();

  const filteredData = useMemo(() => {
    return search.length >= 5
      ? data
          ?.filter(
            (ele) =>
              ele.status &&
              ele.certificateNo.length > 0 &&
              ele.isSignature !== null
          )
          .filter(
            (ele) =>
              ele.fullName.toLowerCase().includes(txt) ||
              ele.courseCode.toLowerCase().includes(txt)
          )
      : [];
  }, [data, search, txt]);
  console.log(filteredData);

  return (
    <div>
      <EnrollmentExistSearch search={search} setSearch={setSearch} />
      <br />
      {!filteredData?.length ? (
        <EmptyData img1={EnrollDark} img2={EnrollLight} size={30}/>
      ) : (
        <Table>
          <Table.Header data={["Fullname", "Course Name", "Dob", "Action"]} />
          <Table.Body
            data={filteredData}
            render={(exist) => (
              <EnrollmentExistRow key={exist.id} exist={exist} />
            )}
          />
        </Table>
      )}
    </div>
  );
}
