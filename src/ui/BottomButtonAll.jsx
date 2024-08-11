import styled from "styled-components";
import Button from "./Button";


const Container = styled.div`
  float: left;
  margin: 0.5em 1em;
`;



export default function BottomButtonAll({children,onClick}) {
  return (
    <Container>
      
        <Button size="small" onClick={onClick}>
        {children}
        </Button>
    </Container>
  )
}
