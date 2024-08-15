/* eslint-disable react/prop-types */
import { createContext } from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  min-width: 100%;
  border: 1px solid var(--color-grey-200);

  border-collapse: collapse;
  
`;

const Thead = styled.thead`
  background-color: var(--color-grey-200);
`;

const Th = styled.th`
  padding: 1.5rem;
  text-align: center;
  /* font-size: 0.875rem; */
  font-weight: 500;
  color: var(--color-grey-800);
`;

const Tbody = styled.tbody`
  background-color: var(--color-grey-50);
  /* height: 60dvh; */
  overflow-y: scroll;
  scrollbar-width: none;

`;
// const Body = styled.div`

// `

const Empty = styled.tbody`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 1.2rem; /* Smaller font size on mobile */
    margin: 1.5rem; /* Adjust margin for mobile */
  }
`;


const TableContext = createContext();

export default function Table({ children }) {
  return (
    <TableContext.Provider value={{}}>
      <StyledTable>{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ data }) {
  return (
    <Thead>
      <tr>
        {data?.map((ele) => (
          <Th key={ele}>{ele}</Th>
        ))}
      </tr>
    </Thead>
  );
}

function Body({ data, render }) {
  if (!data?.length) return <Empty><tr> No data to show at the moment</tr></Empty>;

  return <Tbody>{data?.map(render)}</Tbody>;
}

function Row({ children }) {
  return <tr>{children}</tr>;
}

Table.Row = Row;
Table.Body = Body;
Table.Header = Header;
