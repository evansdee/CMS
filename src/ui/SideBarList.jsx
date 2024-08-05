import ButtonLink from "./ButtonLink";

import styled from "styled-components";
import Flex from "./Flex";
import { useRoleCheck } from "../context/RoleSideBarContent";

const StyeldUl = styled.ul`
  li {
    text-transform: capitalize;
    font-weight: bolder;
    margin: 0.5em 0;
  }
`;

export default function SideBarList() {
  const { data } = useRoleCheck();

  return (
    <StyeldUl>
      {data.map((ele) => (
        <li key={ele.label}>
          <ButtonLink to={`${ele.label}`}>
            <Flex align="center" gap=".3em">
              {/* <ButtonIcon> */}
              <ele.icon />
              {/* </ButtonIcon> */}
              {ele.label}
            </Flex>
          </ButtonLink>
        </li>
      ))}
    </StyeldUl>
  );
}
