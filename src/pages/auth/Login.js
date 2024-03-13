import { Stack, Typography, Link } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import AuthSocial from "../../sections/auth/AuthSocial";
import LoginForm from "../../sections/auth/LoginForm";

const LoginPage = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        {/* header */}
        <Stack alignItems={"center"}>
          <Typography variant="h4">User Login</Typography>
        </Stack>
        <Stack direction={"row"} spacing={0.5}>
          <Typography variant="body2"> New to Chitchat?</Typography>
          <Link to="/auth/register" component={RouterLink} variant="subtitle2">
            Create new account
          </Link>
        </Stack>
        {/* loginform */}
        <LoginForm />
        {/* social link */}
        <AuthSocial />
      </Stack>
    </>
  );
};

export default LoginPage;
