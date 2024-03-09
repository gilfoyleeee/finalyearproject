import React from "react";
import * as Yup from "yup";
import { Stack, IconButton, InputAdornment, Button } from "@mui/material";
import RHFCodes from "../../components/hook-form/RHFCodes";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { useDispatch, useSelector } from "react-redux";
import { VerifyEmailForRegister } from "../../redux/slices/auth";

const VerifyOTPForm = () => {
  const dispatch = useDispatch();
  //get email from store
  const { email } = useSelector((state) => state.auth);

  const VerifyOTPSchema = Yup.object().shape({
    otpcode1: Yup.string().required("OTP code cannot be empty !"),
    otpcode2: Yup.string().required("OTP code cannot be empty !"),
    otpcode3: Yup.string().required("OTP code cannot be empty !"),
    otpcode4: Yup.string().required("OTP code cannot be empty !"),
    otpcode5: Yup.string().required("OTP code cannot be empty !"),
    otpcode6: Yup.string().required("OTP code cannot be empty !"),
  });
  const defaultValues = {
    otpcode1: "",
    otpcode2: "",
    otpcode3: "",
    otpcode4: "",
    otpcode5: "",
    otpcode6: "",
  };
  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(VerifyOTPSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = methods;
  const onSubmit = async (data) => {
    try {
      //   Send API Request
      dispatch(
        VerifyEmailForRegister({
          email,
          otp: `${data.otpcode1}${data.otpcode2}${data.otpcode3}${data.otpcode4}${data.otpcode5}${data.otpcode6}`,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <RHFCodes
            keyName="otpcode"
            inputs={[
              "otpcode1",
              "otpcode2",
              "otpcode3",
              "otpcode4",
              "otpcode5",
              "otpcode6",
            ]}
          />
          <Stack spacing={2}>
            <Button
              fullWidth
              color="inherit"
              size="large"
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "primary.main",
                color: (theme) =>
                  theme.palette.mode === "light" ? "common.white" : "grey.800",
                "&:hover": {
                  bgcolor: "text.primary",
                  color: (theme) =>
                    theme.palette.mode === "light"
                      ? "common.white"
                      : "grey.800",
                },
              }}
            >
              Verify OTP
            </Button>
            <Button
              fullWidth
              color="inherit"
              size="large"
              variant="contained"
              onClick={() => reset(defaultValues)} // Reset the form when clicked
            >
              Clear
            </Button>
          </Stack>
        </Stack>
      </FormProvider>
    </>
  );
};

export default VerifyOTPForm;
