/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import styled from "styled-components";

// Container for the table
const TableContainer = styled.div`
  display: grid;
  gap: 1px;
  border: 1px solid var(--color-grey-200);
  overflow-x: auto; /* Add horizontal scrolling for small screens */
  
  @media (max-width: 768px) {
    /* grid-template-columns: 1fr auto; Single column layout on small screens */
  }
`;

// Header section of the table
const TableHeader = styled.div`
  display: grid;
  grid-template-columns: ${(prop) => prop.column};
  background-color: var(--color-grey-200);
  color: var(--color-grey-600);
  padding: 10px;
  gap: 0.5em;
  text-align: center;

  @media (max-width: 768px) {
    font-size: .8rem; /* Smaller font size on mobile */
  }
`;

// Row in the table
const StyledRow = styled.div`
  display: grid;
  grid-template-columns: ${(prop) => prop.column};
  gap: 1em;
  align-items: center;
  padding: 10px;
  
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
  @media (max-width: 768px) {
    padding: 5px; /* Reduce padding for mobile */
    font-size: 1em!important;
   

  }
  
`;

const TableBody = styled.div`
height: 55dvh;
    overflow-y: scroll;
    scrollbar-width: none;
`;

const TableHeaderItem = styled.div`
  text-transform: uppercase;
  font-size: 1.3rem;
  font-weight: 800;

  @media (max-width: 768px) {
    /* font-size: .9rem; Smaller font size on mobile */
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;

  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;

  @media (max-width: 768px) {
    font-size: 1.2rem; /* Smaller font size on mobile */
    margin: 1.5rem; /* Adjust margin for mobile */
  }
`;

const TableContext = createContext();

export default function Table({ children, column }) {
  return (
    <TableContext.Provider value={{ column }}>
      <TableContainer column={column}>{children}</TableContainer>
    </TableContext.Provider>
  );
}

function Header({ data }) {
  const { column } = useContext(TableContext);

  return (
    <TableHeader column={column}>
      {data?.map((ele) => (
        <TableHeaderItem key={ele}>{ele}</TableHeaderItem>
      ))}
    </TableHeader>
  );
}

function Row({ children }) {
  const { column } = useContext(TableContext);
  return (
    <StyledRow role="row" column={column}>
      {children}
    </StyledRow>
  );
}

function Body({ data, render }) {
  if (!data?.length) return <Empty>No data to show at the moment</Empty>;

  return <TableBody>{data?.map(render)}</TableBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
