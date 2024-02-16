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

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email cannot be empty !")
      .email("Invalid email address"),
    password: Yup.string().required("Password cannot be empty !"),
  });

  const defaultValues = {
    email: "test@gmail.com",
    password: "test",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
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

          <RHFTextField name="email" label="Email address" />
          <RHFTextField
            name="password"
            label="Password"
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
        </Stack>
        <Stack alignItems={"flex-end"} sx={{ my: 2 }}>
          <Link
            component={RouterLink}
            to="/auth/resetpw"
            variant="body2"
            color="inherit"
            underline="always"
          >
            Forgot password?
          </Link>
        </Stack>
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
          Login
        </Button>
      </FormProvider>
    </>
  );
}
