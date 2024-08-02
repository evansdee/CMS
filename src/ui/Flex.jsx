/* eslint-disable react/prop-types */

import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  justify-content: ${(prop) => prop.justify || "flex-start"};
  align-items: ${(prop) => prop.align || "flex-start"};
  flex-direction: ${(prop) => prop.direction || "row"};
  gap: ${(prop) => prop.gap || ""};
`;


export default Flex
// export default function Flex({ children,...prop }) {
//   return <StyledFlex {...prop}>{children}</StyledFlex>;
// }
