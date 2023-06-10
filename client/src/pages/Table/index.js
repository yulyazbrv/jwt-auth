import { Flex, Title, Table, LoadingOverlay, Button } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { useUsers } from "../../core/users/useUsers";
import { useState } from "react";
import {
  block,
  checkAuth,
  logout,
  removeUser,
  unblock,
} from "../../store/store";

const TableUsers = (props) => {
  const navigate = useNavigate();
  const { setAuth } = props;
  const { email } = useParams();
  const { data: users, isFetching: isLoading } = useUsers();
  const [selectedEmail, setSelectedEmail] = useState([]);
  const handleCheckboxChange = (email) => {
    if (selectedEmail.includes(email)) {
      setSelectedEmail(
        selectedEmail.filter((selectedEmail) => selectedEmail !== email)
      );
    } else {
      setSelectedEmail([...selectedEmail, email]);
    }
  };

  const selectAll = () => {
    const allIds = users.map((user) => user.email);
    setSelectedEmail(allIds);
  };

  const clearSelection = () => {
    setSelectedEmail([]);
  };

  const blockClick = () => {
    checkAuth()
      .then((response) => {
        if (response.status !== 500) {
          block(selectedEmail).then((token) => {console.log(token)});
          setSelectedEmail([])
        }
      })
      .catch(() => {
        navigate(`/`);
        setAuth(false);
        logout();
      });
  };
  const unblockClick = () => {
    checkAuth()
      .then((response) => {
        if (response.status !== 500) {
          unblock(selectedEmail);
          setSelectedEmail([])
        }
      })
      .catch(() => {
        navigate(`/`);
        setAuth(false);
        logout();
      });
  };
  const removeClick = () => {
    checkAuth()
      .then((response) => {
        if (response.status !== 500) {
          removeUser(selectedEmail);
          setSelectedEmail([])
        }
      })
      .catch(() => {
        navigate(`/`);
        setAuth(false);
        logout();
      });
  };

  const rows = users
    ? users.map((user) => (
        <tr key={user._id}>
          <td>
            <input
              type="checkbox"
              checked={selectedEmail.includes(user.email)}
              onChange={() => handleCheckboxChange(user.email)}
            ></input>
          </td>
          <td>{user._id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.registeredDate}</td>
          <td>{user.lastLogin}</td>
          <td>{user.status}</td>
        </tr>
      ))
    : [];

  return (
    <Flex mt={80} direction={"column"} gap={30}>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <Flex justify={"space-between"}>
        <Flex>
          <Title order={3}>Hello, {email}</Title>
        </Flex>
        <Flex gap={5}>
          <Button onClick={selectAll}>Select All</Button>
          <Button onClick={clearSelection}>Remove select</Button>
          <Button
            onClick={() => {
              blockClick();
            }}
          >
            Block
          </Button>
          <Button
            onClick={() => {
              unblockClick();
            }}
          >
            Unblock
          </Button>
          <Button onClick={() => removeClick()}>Delete</Button>
        </Flex>
      </Flex>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>id</th>
            <th>name</th>
            <th>email</th>
            <th>sign up date</th>
            <th>last login</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Flex>
  );
};

export default TableUsers;
