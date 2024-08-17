import {} from "react";
import { useReportData } from "./ReportDataContext";
import Label from "../../../ui/Label";
import Select from "../../../ui/Select";
import { months } from "../../../helper/data";
import Button from "../../../ui/Button";
import styled from "styled-components";
import { useSession } from "../Session/useSession";

const Container = styled.div`
    display: flex;
    gap: 2em;
    justify-content: center;
    align-items: center;
    padding: 1em 0;
`

export default function ReportForm() {
  const {data:session} = useSession()
  const {  search, handleFilter, handleInput, years } = useReportData();

  return (
    <Container>
      <Label label="Months">
        <Select name="month" value={search.month} onChange={handleInput}>
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </Select>
      </Label>
      <Label label="Year:">
         
          <Select name="year" value={search.year} onChange={handleInput}>
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
        </Label>
        <Label label="Course">
           
          <Select
            name="selectedCourse"
            value={search.selectedCourse}
            onChange={handleInput}
          >
            <option value="">All Courses</option>
            {session?.map((ele) => (
              <option key={ele.id} value={ele.courseName}>
                {ele.courseName}
              </option>
            ))}
            {/* Add more courses as needed */}
          </Select>
        </Label>
      

      <Button onClick={handleFilter} size="medium">Search</Button>

    </Container>
  );
}
