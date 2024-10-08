import styled from "styled-components";
import InputField from "../../ui/InputField";
import { useState } from "react";
import Button from "../../ui/Button";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import toast from "react-hot-toast";
import LoginPanel from "./LoginPanel";
import ErrorFallback from "../../ui/ErrorFallback";

const StyledLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;
  position: relative;
  z-index: 3;
  form {
    /* width: 60vw; */
    padding: 2em;
    background-color: var(--color-gray-100);
    border-radius: 20px;
  }
`;


export default function LoginUi() {
  const [email, setEmail] = useState("certificateofficer@joemarineng.com");
  const [password, setPassword] = useState("12345678");

  const {login,isLoading,isError} = useLogin()

  // if(error) return <ErrorFallback error={error.message}/>

  function handleSubmut(e){
    e.preventDefault()
    if(!email) return
    login({email,password})

    if(isError){
      setEmail('')
      setPassword('')
    }
  }

  return (
    <StyledLogin>
      <form onSubmit={handleSubmut}>
        <InputField
          placeholder={"Enter Email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        <InputField
          placeholder={"Enter Password"}
          type="password"
          value={password}
          disabled={isLoading}

          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variation="primary" size='medium' disabled={isLoading}>
           {isLoading ? <SpinnerMini/>: 'Log in'}
        </Button>
      </form>
      <LoginPanel email={setEmail} pass={setPassword}/>
    </StyledLogin>
  );
}
