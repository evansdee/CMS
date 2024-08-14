import Table from "../../../ui/Table";
import * as XLSX from "xlsx";
import { useReportData } from "./ReportDataContext";
import ReportRow from "./ReportRow";

export default function ReportList() {
  const { filteredData } = useReportData();
  const tableData = filteredData.map(
    (
      {
        firstName,
        middleName,
        lastName,
        dob,
        courseName,
        enrollDate,
        means,
        meansId,
        country,
        certificateNo,
      },
      i
    ) => ({
      firstName,
      middleName,
      lastName,
      dob,
      courseName,
      enrollDate,
      means,
      meansId,
      country,
      certificateNo,
    })
  );

  const handleExport = () => {
    // Define headers
    const headers = [
      [
        "First Name",
        "Middle Name",
        "Last Name",
        "DoB",
        "Nationality",
        "Course Name",
        "Certificate No",
        "Date Issued",
        "ID",
        "ID No",
      ],
    ];
  
    // Convert table data to an array of arrays
    const data = tableData.map((row) => [
      row.firstName,
      row.middleName,
      row.lastName,
      row.dob,
      row.country,
      row.courseName,
      row.certificateNo,
      row.enrollDate,
      row.means,
      row.meansId,
    ]);

    // Combine headers and data
    const worksheetData = [...headers, ...data];

    // Convert the array of arrays to a worksheet
    const ws = XLSX.utils.aoa_to_sheet(worksheetData);

    // Create a new workbook and add the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, "TableData.xlsx");
  };

  //   console.log(tableData);

  return (
    <>
      <Table>
        <Table.Header
          data={[
            "s/n",
            "First Name",
            "Other Name",
            "Last Name",
            "Dob",
            "Nationality",
            "Course",
            "Certificate No",
            "Date Issued",
            "Id",
            "Id No",
          ]}
        />
        <Table.Body
          data={filteredData}
          render={(ele, i) => (
            <ReportRow key={ele.id} student={ele} index={i} />
          )}
        />
      </Table>
      <button onClick={handleExport}>Export to Excel</button>
    </>
  );
}
