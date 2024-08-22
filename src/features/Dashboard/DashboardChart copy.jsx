/* eslint-disable react/prop-types */
import {} from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";

const StyledSalesChart = styled.div`
  grid-column: 1 / -1;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 3.2rem;

  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function DashoardChart({ data }) {
//   const courseCount = data?.reduce((acc, course) => {
//     acc[course.courseCode] = (acc[course.courseCode] || 0) + 1;
//     return acc;
//   }, {});

const courseCount = data?.reduce((acc, course) => {
    if (acc[course.courseCode]) {
      acc[course.courseCode].count += 1;
    } else {
      acc[course.courseCode] = { courseCode: course.courseCode, count: 1 };
    }
    return acc;
  }, {});

  const chartData = Object.values(courseCount);

//   const chartData = Object.keys(courseCount).map((courseCode) => ({
//     courseCode,
//     count: courseCount[courseCode],
//   }));

  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#a4de6c",
    "#d0ed57",
    "#8dd1e1",
    "#83a6ed",
    "#8a89a6",
    "#a05d56",
  ];

  const colorMap = chartData.reduce((acc, entry, index) => {
    acc[entry.courseCode] = colors[index % colors.length]; // Cycle through colors if there are more courses than colors
    return acc;
  }, {});

  console.log(chartData);
  return (
    <StyledSalesChart>
     <ResponsiveContainer width="100%" height='100%'>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="courseCode" />
        <YAxis />
        <Tooltip />
        <Legend />
        {chartData.map(entry => (
          <Bar
            key={entry.courseCode}
            dataKey="count"
            fill={colorMap[entry.courseCode] || '#8884d8'}
            name={entry.courseCode}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default DashoardChart;
