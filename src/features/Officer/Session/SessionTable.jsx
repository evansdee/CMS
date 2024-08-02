import styled from "styled-components";
import { useSession } from "./useSession";
import Spinner from "../../../ui/Spinner";
import Table from "../../../ui/Table";

const StyledSessionTable = styled.div`
  width: 100%;
  padding: 0 2em 2em;
  height: 70dvh;
  overflow-y: scroll;
  scrollbar-width: none;
  margin-top: 1em;
`;

export default function SessionTable() {
  const { data, isLoading } = useSession();

  if (isLoading) return <Spinner />;

  return (
    <StyledSessionTable>
      <Table>
        <Table.Header
          data={["course", "start date", "end date", "active", "action"]}
        />
        <Table.Body data={data} />
      </Table>
    </StyledSessionTable>
  );
}
