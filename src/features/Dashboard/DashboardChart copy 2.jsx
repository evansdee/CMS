/* eslint-disable react/prop-types */
import {} from "react";

import styled from "styled-components";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

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

function DashoardChart({ data }) {

    const courseCount = data.reduce((acc, { courseCode }) => {
        acc[courseCode] = (acc[courseCode] || 0) + 1;
        return acc;
      }, {});
    
      // Prepare chart data
      const chartData = Object.keys(courseCount).map(courseCode => ({
        courseCode,
        count: courseCount[courseCode]
      }));
    
      // Map colors to course codes
      const colorMap = chartData.reduce((acc, entry, index) => {
        acc[entry.courseCode] = colors[index % colors.length];
        return acc;
      }, {});

      const chartConfig = {
        labels: chartData.map(entry => entry.courseCode),
        datasets: [
          {
            label: 'Occurrences',
            data: chartData.map(entry => entry.count),
            backgroundColor: chartData.map(entry => colorMap[entry.courseCode]),
          }
        ],
       
      };
      const options = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Course Occurrences',
            // font: {
            //   size: 18, // Font size of the title
            // },
            // color: 'red', // Color of the title
            // padding: {
            //   top: 10,
            //   bottom: 20,
            // },
          },
          legend: {
            display: true,
            position: 'bottom',
          },
        },
      };
 
  return (
    <StyledSalesChart>
        <div style={{ width: '100%', height: '100%' }}>

   <Bar data={chartConfig} options={options} />
        </div>
    </StyledSalesChart>
  );
}

export default DashoardChart;
