import { Box, IconButton, Stack, Typography } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import UserProfileForm from "../../../sections/settings/UserProfileForm";
// import { FetchUserProfile } from "../../../redux/slices/app";

const UserProfile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(FetchUserProfile());
  }, []);
  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        <Box
          sx={{
            height: "100vh",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
            width: 320,
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
          }}
        >
          <Stack p={4} spacing={5}>
            {/* Header part */}
            <Stack direction={"row"} alignContent={"center"} spacing={3}>
              <IconButton>
                <CaretLeft size={24} color="blue" />
              </IconButton>
              <Typography variant="h5">Profile</Typography>
            </Stack>

            {/* Profile part */}
            <UserProfileForm />
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default UserProfile;
