import { Flex, Input, PasswordInput, Button, Title } from "@mantine/core";
import { IconAt } from "@tabler/icons-react";
import "./style.css";
import { useState } from "react";
import { registrate } from "../../store/store";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const registrationClick = () => {
    registrate(name, email, password)
      .then(() => {})
      .catch((e) => {
        setError(e.message);
      });
  };

  return (
    <Flex align={"center"} justify={"center"}>
      <Flex direction={"column"} gap={10} justify={"center"} w={400} h={500}>
        <Title order={2}>Registration</Title>
        <Input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />{" "}
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
        <Button onClick={registrationClick}>Sign up</Button>
        <Title order={6}>{error}</Title>
      </Flex>
    </Flex>
  );
};

export { Registration };
