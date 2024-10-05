import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/register");
  };
  return (
    <div>
      HomeScreen
      <Button
        variant="danger"
        className="text-align-center"
        onClick={logoutHandler}
      >
        Logout
      </Button>
    </div>
  );
};

export default HomeScreen;
