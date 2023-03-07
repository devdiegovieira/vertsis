import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { BrowserRouter, Navigate, useRoutes } from "react-router-dom";
import UserInterface from "./Pages/UI/UserInterface";
import DashboardPage from "./Pages/Dashboard/DashboardPage";
import Login from "./Pages/Auth/Login";
import ModulePage from "./Pages/Module/ModulePage";
import NotExists from "./Pages/UI/NotExists";

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
    { path: '/', element:  <PrivateRoute><ModulePage /></PrivateRoute> },
    { path: '/*', element: <PrivateRoute><NotExists /></PrivateRoute> },
    // { path: '/admin', element: <PrivateRoute><DashboardPage /></PrivateRoute> },
    // { path: '/resetpassword', element: <ResetPassword /> },
    // { path: '/confirmpassword', element: <ConfirmPassword /> },
    // { path: '/admin/people/*', element: <PrivateRoute><PeoplePage /></PrivateRoute> },
    // { path: '/admin/settings/*', element: <PrivateRoute><SettingsPage /></PrivateRoute> },
    // { path: '/admin/dashboard', element: <PrivateRoute><Dashboard /></PrivateRoute> },
    // { path: '/admin/unity/*', element: <PrivateRoute><UnityPage /></PrivateRoute> },
    // { path: '/admin/access/*', element: <PrivateRoute><AccessPage /></PrivateRoute> },
    // { path: '/admin/*', element: <PrivateRoute><InConstruction /></PrivateRoute> },

  ])
}

export default function AppRoutes() {

  return (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />

    </>
  );
};