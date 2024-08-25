import Button from "../../ui/Button";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import LoginPanel from "./LoginPanel";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";

export default function LoginUi({ email, password, setEmail, setPassword }) {
  const { login, isLoading: isLogging, isError } = useLogin();

  // if(error) return <ErrorFallback error={error.message}/>

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    login({ email, password });

    if (isError) {
      setEmail("");
      setPassword("");
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormRowVertical label="Email address" orientation="vertical">
          <Input
            type="email"
            id="email"
            // This makes this form better for password managers
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormRowVertical>
        <FormRowVertical label="Password" orientation="vertical">
          <Input
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormRowVertical>
        <FormRowVertical orientation="vertical">
          <Button size="large" disabled={isLogging}>
            {isLogging ? <SpinnerMini /> : "Login"}
          </Button>
        </FormRowVertical>
      </Form>
    </>
  );
}
