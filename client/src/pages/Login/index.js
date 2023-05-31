import { Flex, Input, PasswordInput, Button, Title } from "@mantine/core";
import { IconAt } from "@tabler/icons-react";
import "./style.css";
import { useState } from "react";
import { login } from "../../store/store";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const { setAuth } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const loginClick = () => {
    login(email, password)
      .then(() => {
        navigate(`user/${email}`);
        setAuth(true);
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  return (
    <Flex align={"center"} justify={"center"}>
      <Flex direction={"column"} gap={10} justify={"center"} w={400} h={500}>
        <Title order={2}>Login</Title>
        <Input
          icon={<IconAt width={17} height={17} />}
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <PasswordInput
          placeholder="Password"
          withAsterisk
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          onClick={() => {
            loginClick();
          }}
        >
          Sign in
        </Button>
        <Title order={6}>{error}</Title>
      </Flex>
    </Flex>
  );
};

export { Login };
