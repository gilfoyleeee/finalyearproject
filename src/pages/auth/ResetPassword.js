import { Stack, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import { CaretLeft } from "phosphor-react";
import ResetPwForm from "../../sections/auth/ResetPwForm";

const ResetPassword = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h3" paragraph>
          Forgot your Password?
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 5 }}>
          Enter your email, await the reset key, and craft a new secret code.
        </Typography>
        {/* Reset Password form */}
        <ResetPwForm />
        <Link
          component={RouterLink}
          to="/auth/login"
          color="inherit"
          variant="subtitle2"
          sx={{
            mt: 3,
            mx: "auto",
            alignItems: "center",
            display: "inline-flex",
          }}
        >
          <CaretLeft />
          Return to Log in
        </Link>
      </Stack>
    </>
  );
};

export default ResetPassword;
