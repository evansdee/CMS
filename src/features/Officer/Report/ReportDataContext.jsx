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

    setFilteredData(filtered);
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
