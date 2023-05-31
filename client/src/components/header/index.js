import { Button, Flex } from "@mantine/core";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useLocation } from "react-router-dom";
import "./style.css";
import { logout } from "../../store/store";
import { useNavigate } from "react-router-dom";

const HeaderContent = (props) => {
  const { auth, setAuth } = props;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <Flex align={"center"} mih={50} justify={"center"}>
      <Flex gap={60}>
        {auth ? (
          <Button
            onClick={() => {
              logout();
              navigate(`/`);
              setAuth(false);
            }}
          >
            LOGOUT
          </Button>
        ) : (
          <>
            <Link
              to="/registration"
              className={classNames(
                "link",
                pathname === "/registration" && "active"
              )}
            >
              SIGN UP
            </Link>
            <Link
              to="/login"
              className={classNames("link", pathname === "/login" && "active")}
            >
              SIGN IN
            </Link>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export { HeaderContent };
