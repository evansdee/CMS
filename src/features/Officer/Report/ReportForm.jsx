import {} from "react";
import { useReportData } from "./ReportDataContext";
import Label from "../../../ui/Label";
import Select from "../../../ui/Select";
import { months } from "../../../helper/data";
import Button from "../../../ui/Button";
import styled from "styled-components";
import { useCourse } from "../Enrollment/useCourse";

const Container = styled.div`
    display: flex;
    gap: 2em;
    justify-content: center;
    align-items: center;
    padding: 1em 0;
    flex-wrap: wrap;

    @media(max-width:768px){
      gap: 1em;
      padding: .5em 0;
      /* color: red; */
    }
`

export default function ReportForm() {
  const {data} = useCourse()

  const session = data?.sort((a, b) => {
    if (a.courseName.toLowerCase() < b.courseName.toLowerCase()) return -1;
    if (a.courseName.toLowerCase() > b.courseName.toLowerCase()) return 1;
    return 0;
  });
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
