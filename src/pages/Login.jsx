import { Link } from "react-router-dom";
import styled from "styled-components";
import LoginUi from "../features/authentication/LoginUi";

const StyledLogin = styled.div`
  background: url("https://qtubihsbqxewhrenphaz.supabase.co/storage/v1/object/public/asset/pexels-pixabay-327337.jpg")
    no-repeat;
    background-size: cover;
  max-width: 100%;
  height: 100vh;
  position: relative;


  &::after{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-black);
    opacity: .6;
    z-index: 1;
  }
`;

export default function Login() {
  return (
    <StyledLogin>
      <LoginUi />
    </StyledLogin>
  );
}
