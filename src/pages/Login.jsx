import styled from "styled-components";
import LoginUi from "../features/authentication/LoginUi";

const StyledLogin = styled.div`
  background: url("https://qtubihsbqxewhrenphaz.supabase.co/storage/v1/object/public/asset/pexels-pixabay-327337.jpg")
    no-repeat;
    background-size: cover;
  max-width: 100%;
  height: 100vh;
  position: relative;


`;

export default function Login() {
  return (
    <StyledLogin>
      <LoginUi />
    </StyledLogin>
  );
}
