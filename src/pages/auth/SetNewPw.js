import React from "react";
import { Stack, Link, Typography } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import { Link as RouterLink } from "react-router-dom";
import SetNewPwForm from "../../sections/auth/SetNewPwForm";

const SetNewPw = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 1, position: "relative" }}>
        <Typography variant="h3" paragraph>
          Reset Password
        </Typography>
        {/* <Typography sx={{ color: "text.secondary", mb: 5 }}>
          Set a new password
        </Typography> */}
      </Stack>

      {/* New pw form */}

      <SetNewPwForm />

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
        }} underline="always"
      >
        <CaretLeft />
        Return to Log in
      </Link>
    </>
  );
};

export default SetNewPw;
