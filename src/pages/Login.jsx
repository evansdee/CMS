import styled from "styled-components";
import LoginUi from "../features/authentication/LoginUi";
import Heading from "../ui/Heading";
import { useState } from "react";

import LoginPanel from "../features/authentication/LoginPanel";
import Logo from "../ui/CompanyLogo";

const LoginLayout = styled.main`
  position: relative;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);

  &.log {
    position: relative;
    z-index: 2;
    display: grid;
    gap: 2rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 100%;
    padding: 1rem;
    gap: 1.6rem;
  }
`;


function Login() {
  const [email, setEmail] = useState("certificateofficer@joemarineng.com");
  const [password, setPassword] = useState("12345678");
  return (
    <>
      <LoginLayout>
        {/* <div className="log"> */}
          {/* <Logo /> */}
          <Logo />

          <LoginUi
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
          />
        {/* </div> */}
      </LoginLayout>
      <LoginPanel email={setEmail} pass={setPassword} />
    </>
  );
}

export default Login;
