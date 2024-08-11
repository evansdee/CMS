/* eslint-disable react/prop-types */
import Input from "../../../ui/Input";
import styled from "styled-components";

const SearchOperation = styled.div`
  /* flex: 1; */
  width: 30%;
  @media(min-width:768){
    width: 0%;
  }
`;
export default function StudentSearch({ search, setSearch }) {
  return (
    <SearchOperation>
      <Input
        type="text"
        placeholder="Search by Name, Certfiicate No or Phone No"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </SearchOperation>
  );
}
