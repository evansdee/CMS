import styled from "styled-components";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";


const Container = styled.div`
  padding: 1.5em;
`

export default function Setting() {
  return (
    <Container>

    <Row>
    <Heading as="h3">Update password</Heading>
    <UpdatePasswordForm/>
  </Row>
    </Container>
  )
}
