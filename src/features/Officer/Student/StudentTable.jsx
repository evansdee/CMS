
import styled from 'styled-components';

const Table = styled.table`
  min-width: 100%;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  background-color: var(--color-grey-200);
`;

const Th = styled.th`
  padding: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-grey-800);
`;

const Tbody = styled.tbody`
  background-color: var(--color-grey-100);
`;

const Td = styled.td`
  padding: 1.5rem;
  text-align: left;
  font-size: 0.875rem;
  color: var(--text-foreground);
  white-space: nowrap;
`;

const DetailsButton = styled.button`
  color: var(--text-primary);
  &:hover {
    text-decoration: underline;
  }
`;

export default function StudentTable() {
  return (
    <Table>
      <Thead>
        <tr>
          <Th>Last Name</Th>
          <Th>First Name</Th>
          <Th>Other Names</Th>
          <Th>Date of Birth</Th>
          <Th>Email</Th>
          <Th>Phone</Th>
          <Th>Gender</Th>
          <Th>Registration Date</Th>
          <Th>Details</Th>
        </tr>
      </Thead>
      <Tbody>
        <tr>
          <Td>AKPASIPELEITE</Td>
          <Td>JOHN</Td>
          <Td>-</Td>
          <Td>11/12/1957</Td>
          <Td>test@joemarinen.com</Td>
          <Td>08033817525</Td>
          <Td>Male</Td>
          <Td>15/09/2021 02:44:10</Td>
          <Td>
            <DetailsButton>Details</DetailsButton>
          </Td>
        </tr>
        <tr>
          <Td>KOFFII</Td>
          <Td>LELESI</Td>
          <Td>-</Td>
          <Td>28/03/1980</Td>
          <Td>test@joemarinen.com</Td>
          <Td>08064317692</Td>
          <Td>Male</Td>
          <Td>03/03/2022 01:29:12</Td>
          <Td>
            <DetailsButton>Details</DetailsButton>
          </Td>
        </tr>
      </Tbody>
    </Table>
  );
}
