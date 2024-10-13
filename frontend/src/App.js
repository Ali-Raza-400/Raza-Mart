import React, { useEffect } from "react";
import { Container, ToastContainer } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { logout } from "./slices/authSlice";
import Header from "./components/Header";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const expirationTime = localStorage.getItem("expirationTime");
    console.log("expirationTime:::", expirationTime);
    if (expirationTime) {
      const currentTime = new Date().getTime();

      if (currentTime > expirationTime) {
        dispatch(logout());
      }
    }
  }, [dispatch]);
  return (
    <div>
      <ToastContainer />
      <Header />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
    </div>
  );
};

export default App;
