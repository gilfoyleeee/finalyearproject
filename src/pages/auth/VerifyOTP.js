import { Stack, Typography } from "@mui/material";
import React from "react";
import VerifyOTPForm from "../../sections/auth/VerifyOTPForm";

// const VerifyOTP = () => {
//   return (
//     <>
//       <Stack spacing={2} sx={{ mb: 1, position: "relative" }}>
//         <Typography variant="h4">Verify Your OTP</Typography>
//         <Stack direction={"row"} spacing={0.5}>
//           <Typography variant="body2">Sent to email (test@gmail.com)</Typography>
//         </Stack>
//       </Stack>
//       {/* verifyotpform */}
//       <VerifyOTPForm />
//     </>
//   );
// };
export default function LoginPage() {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Please Verify OTP</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">
            Sent to email (shreyanshshah242@gmail.com)
          </Typography>
        </Stack>
      </Stack>
      {/* Form */}
      <VerifyOTPForm />
    </>
  );
}


