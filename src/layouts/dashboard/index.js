import { Stack } from "@mui/material";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const isAuthenticated = true;

const DashboardLayout = () => {
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }
  return (
    <Stack direction={"row"}>
      <SideBar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
