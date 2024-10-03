import React from "react";
import { Outlet } from "react-router-dom";


const App = () => {
  return (
    <div>
      {/* Your header or other layout components */}
      <h1>Welcome to the App</h1>
      {/* Main content where child routes will be rendered */}
      <Outlet />
    </div>
  );
};

export default App;
