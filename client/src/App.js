import "./App.css";
import { AppShell, Header, MantineProvider } from "@mantine/core";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Registration } from "./pages/Registration";
import { HeaderContent } from "./components/header";
import { Login } from "./pages/Login";
import TableUsers from "./pages/Table";
import { useEffect, useState } from "react";
import { checkAuth, logout } from "./store/store";
import { Home } from "./pages/Home";
import { observer } from "mobx-react-lite";

function App() {
  const [auth, setAuth] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkAuth()
        .then((response) => {
          if (response.status === 500) {
            navigate(`/`);
          }
        })
        .catch(() => {
          navigate(`/`);
          setAuth(false);
          logout();
        });
    } else {
      navigate(`/`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (auth !== undefined) {
      localStorage.setItem("auth", JSON.stringify(auth));
    }
  }, [auth]);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth !== undefined) {
      setAuth(JSON.parse(auth));
    }
  }, []);
  return (
    <MantineProvider>
      <AppShell
        header={
          <Header>{<HeaderContent auth={auth} setAuth={setAuth} />}</Header>
        }
        styles={(theme) => ({
          main: { backgroundColor: "#f7f7f8" },
        })}
      >
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/registration" element={<Registration />}></Route>
          <Route path="/login" element={<Login setAuth={setAuth} />}></Route>
          <Route path="login/user">
            <Route
              path=":email"
              element={<TableUsers setAuth={setAuth} />}
            ></Route>
          </Route>
        </Routes>
      </AppShell>
    </MantineProvider>
  );
}

export default observer(App);
