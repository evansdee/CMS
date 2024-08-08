import ButtonLink from "./ButtonLink";
import styled from "styled-components";
import Flex from "./Flex";
import { useRoleCheck } from "../context/RoleSideBarContent";
import { useView } from "../hook/useView";

const StyledUl = styled.ul`
  li {
    text-transform: capitalize;
    font-weight: bolder;
    margin: 0.5em 0;
  }

  @media (max-width: 768px) {
    li {
      font-size: 0.9rem; // Adjust font size for mobile
      margin: 0.4em 0;
    }
  }
`;

export default function SideBarList({ close }) {
  const { data } = useRoleCheck();
const {isView} = useView()

function handleIssue(){
  if(!isView) return close(false)
}
  return (
    <StyledUl>
      {data.map((ele) => (
        <li key={ele.label} onClick={handleIssue}>
          <ButtonLink to={`${ele.label}`}>
            <Flex align="center" gap=".3em" justify="space-between">
              <ele.icon />
              <span>{ele.label}</span>
            </Flex>
          </ButtonLink>
        </li>
      ))}
    </StyledUl>
  );
}
