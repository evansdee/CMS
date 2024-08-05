/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import styled from "styled-components";

const TableContainer = styled.div`
  display: grid;
  gap: 1px;
  border: 1px solid var(--color-grey-200);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: ${(prop) => prop.column};
  background-color: var(--color-grey-200);
  color: var(--color-grey-600);
  padding: 10px;
  gap: 0.5em;
  /* border: 2px solid var(--color-grey-100); */
  text-align: center;
`;
const StyledRow = styled.div`
  display: grid;
  grid-template-columns: ${(prop) => prop.column};
  gap: 1em;
  align-items: center;

  padding: 10px;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const TableBody = styled.div``;

const TableHeaderItem = styled.div`
  text-transform: uppercase;

  font-size: 1.3rem;
  font-weight: 800;
`;
const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
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
