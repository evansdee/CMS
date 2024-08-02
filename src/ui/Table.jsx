/* eslint-disable react/prop-types */
import { createContext } from "react";
import styled from "styled-components";
import SessionRow from "../features/Officer/Session/SessionRow";

const TableContainer = styled.div`
  display: grid;
  gap: 1px;
  border: 1px solid var(--color-grey-200);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr repeat(4, 0.25fr);
  /* grid-template-columns:1fr repeat(4, auto); */
  background-color: var(--color-grey-20n0);
  color: var(--color-grey-600);
  padding: 10px;
  gap: 0.5em;
  border: 2px solid var(--color-grey-100);
  text-align: center;
`;
const TableBody = styled.div`

`;

const TableHeaderItem = styled.div`
  /* padding: 0 1.2rem; */
  text-transform: uppercase;
  /* border: 5px solid red; */
  /* display: flex;
  justify-content: center;
  align-items: center; */
  font-size: 1.3rem;
  font-weight: 800;
  /* row-gap: 5em; */
`;
const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const TableContext = createContext();

export default function Table({ children }) {
  return (
    <TableContext.Provider value={{}}>
      <TableContainer>{children}</TableContainer>
    </TableContext.Provider>
  );
}

function Header({ data }) {
  return (
    <TableHeader>
      {data?.map((ele) => (
        <TableHeaderItem key={ele}>{ele}</TableHeaderItem>
      ))}
    </TableHeader>
  );
}

function Body({ data }) {
  if (!data?.length) return <Empty>No data to show at the moment</Empty>;

  return (
    <TableBody>
      {data?.map((row) => (
        <SessionRow key={row.id} row={row} />
      ))}
    </TableBody>
  );
}

Table.Header = Header;
Table.Body = Body;
