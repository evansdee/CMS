import NetworkStatus from "../components/Network";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateRoleForm from "./UpdateRoleForm";


export default function Setting() {
  return (
    <Row>
    <Heading as="h3">Update password</Heading>
    <UpdatePasswordForm/>
    <UpdateRoleForm/>
    <NetworkStatus/>
  </Row>
  )
}
