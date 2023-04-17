import React from "react";
import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
import UserInterface from "./Pages/UI/UserInterface";
import Login from "./Pages/Auth/Login";
import ModulePage from "./Pages/Module/ModulePage";
import NotExists from "./Pages/UI/NotExists";
import RegisterPage from "./Pages/Register/RegisterPage";
import ConciegePage from "./Pages/Concierge/ConciergePage";
import { App } from 'antd';


function Logout() {
  localStorage.removeItem('user');
  return (<Navigate to="/login" />)
}

function PrivateRoute({ children }) {
  return localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).auth ? <UserInterface>{children}</UserInterface> : <Navigate to="/logout" />
}

function Routes() {
  return useRoutes([
    { path: '/login', element: <Login /> },
    { path: '/logout', element: <Logout /> },
    { path: '/', element: <PrivateRoute><ModulePage /></PrivateRoute> },
    { path: '/*', element: <PrivateRoute><NotExists /></PrivateRoute> },
    { path: '/register/*', element: <PrivateRoute><RegisterPage /></PrivateRoute> },
    { path: '/concierge', element: <PrivateRoute><ConciegePage /></PrivateRoute> },

  ])
}

export default function AppRoutes() {

  return (
    <App>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </App>
  );
};