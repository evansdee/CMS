/* eslint-disable react/prop-types */
import {
  createContext,
  useCallback,
  useState,
  useMemo,
  useContext,
} from "react";
import { useGetEnrollment } from "../Enrollment/useEnrollment";
import { format, parse } from "date-fns";
import { sortByCourseAndCertificate } from "../../../helper/helper";

const ReportContext = createContext();

export default function ReportDataProvider({ children }) {
  const { data: enrollment } = useGetEnrollment();
  const [filteredData, setFilteredData] = useState([]);
  const initialSearchState = {
    month: "",
    year: "",
    selectedCourse: "",
  };

  const [search, setSearch] = useState(initialSearchState);

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - 2023 + 1 }, (_, i) => 2023 + i);
  }, []);

  function sortByCertificateNumber(arr) {
    return arr.sort((a, b) => {
      // Extract the last numeric part from certificateNo
      const getCertNumber = (cert) => {
        const parts = cert.split('/');
        return parseInt(parts[parts.length - 1], 10); // Assumes the last part is the number to sort by
      };
  
      const certNoA = getCertNumber(a.certificateNo);
      const certNoB = getCertNumber(b.certificateNo);
  
      return certNoA - certNoB;
    });
  }
  

  function handleInput(e) {
    const { value, name } = e.target;

    setSearch((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const approveList = useMemo(() => {
    return enrollment?.filter((ele) => ele.status && ele.isSignature !== null);
  }, [enrollment]);

  // console.log(approveList,years,enrollment)

  const handleFilter = useCallback(() => {
    if (!search.month || !search.year || !search.selectedCourse) return null;

    const filtered = approveList?.filter((item) => {
      const itemDate = parse(
        item.enrollDate,
        "dd MMMM yy, hh:mm a",
        new Date()
      );
      const itemMonth = format(itemDate, "M"); // Extracting month as number
      const itemYear = format(itemDate, "yyyy"); // Extracting full year

      return (
        itemMonth === search.month &&
        itemYear === search.year &&
        item.courseName === search.selectedCourse
      );
    });

    const sortedData = filtered.sort((a, b) => {
      // Convert names to lowercase for case-insensitive comparison
      const nameA = a.fullName.toLowerCase();
      const nameB = b.fullName.toLowerCase();
  
      if (nameA < nameB) return -1; // If nameA comes before nameB
      if (nameA > nameB) return 1;  // If nameA comes after nameB
      return 0;                      // If names are equal
  });

  const x = sortedData.every(ele=>(ele.courseCode === "FED"))

  console.log(x,"sort")

    setFilteredData(x ? sortByCertificateNumber(sortedData) : sortByCourseAndCertificate(sortedData));
  }, [search, approveList]);
  //   , [enrollment, search.year, search.selectedCourse, search.month]);

  return (
    <ReportContext.Provider
      value={{ search, filteredData, years, handleInput, handleFilter }}
    >
      {children}
    </ReportContext.Provider>
  );
}

export function useReportData() {
  const context = useContext(ReportContext);
  return context;
}
