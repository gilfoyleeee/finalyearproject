import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Link,
  Alert,
  IconButton,
  InputAdornment,
  Stack,
  Button,
} from "@mui/material";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { RHFTextField } from "../../components/hook-form";
import { Eye, EyeSlash } from "phosphor-react";

export default function SetNewPwForm() {
  const [showPassword, setShowPassword] = useState(false);

  const SetNewPwSchema = Yup.object().shape({
    newPw: Yup.string()
      .min(8, "Minimum length for passoword is 8 !")
      .required("New Password cannot be empty !"),
    confirmPw: Yup.string()
      .required("Confirm password cannot be empty !")
      .oneOf([Yup.ref("newPw"), null], "Password must match"),
  });

  const defaultValues = {
    newPw: "",
    confirmPw: "",
  };

  const methods = useForm({
    resolver: yupResolver(SetNewPwSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    try {
      //submit data to backend
    } catch (error) {
      console.log(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.afterSubmit && (
            <Alert severity="error"> {errors.afterSubmit.message}</Alert>
          )}

          <RHFTextField
            name="newPw"
            label="New Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? <Eye /> : <EyeSlash />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <RHFTextField
            name="confirmPw"
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? <Eye /> : <EyeSlash />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

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
                  theme.palette.mode === "light" ? "common.white" : "grey.800",
              },
            }}
          >
            Submit
          </Button>
        </Stack>
      </FormProvider>
    </>
  );
}
