/* eslint-disable react/prop-types */
import Input from "../../../ui/Input";
import styled from "styled-components";

const SearchOperation = styled.div`
  /* flex: 1; */
  width: 30%;
  @media(max-width:768px){
    width: 100%;
  }
`;
export default function StudentSearch({ search, setSearch }) {
  return (
    <SearchOperation>
      <Input
        type="text"
        placeholder="Search by Name, Course Code or Phone No"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </SearchOperation>
  );
}
