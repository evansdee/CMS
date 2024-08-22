import {} from "react";
import styled from "styled-components";
import Stats from "./Stats";
import { useGetEnrollment } from "../Officer/Enrollment/useEnrollment";
import { useSearchParams } from "react-router-dom";
import {
  filterDataFromLastDays,
} from "../../helper/helper";
import DashboardChart from "./DashboardChart";
import Spinner from "../../ui/Spinner";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem;
  gap: 2.4rem;
  margin-top: 2em;
  overflow-y: auto;
  scrollbar-width: none;
  height: 70dvh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr; /* 2 columns layout for tablets */
    grid-template-rows: auto;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* 1 column layout for mobile */
    grid-template-rows: auto;
  }
`;
export default function DashboardLayout() {
  const { data,isLoading } = useGetEnrollment();

  const seven = filterDataFromLastDays(data, 6);
  const thirty = filterDataFromLastDays(data, 29);
  const sixty = filterDataFromLastDays(data, 59);

  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("last") || "7";

  function handleFilter(arr) {
    const data = arr?.filter(
      (ele) => ele.status === true && ele.isSignature !== null
    );

    return data;
  }
  let filterArray;
  if (filterValue === "7") filterArray = handleFilter(seven);
  if (filterValue === "30") filterArray = handleFilter(thirty);
  if (filterValue === "60") filterArray = handleFilter(sixty);

//   console.log(filterArray)

  if(isLoading) return <Spinner/>

  return (
    <StyledDashboardLayout>
      <Stats data={filterArray} />
      <DashboardChart data={filterArray}/>
    </StyledDashboardLayout>
  );
}
