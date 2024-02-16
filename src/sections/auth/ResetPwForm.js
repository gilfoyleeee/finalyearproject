import React from "react";
import { Alert, Stack, Button } from "@mui/material";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { RHFTextField } from "../../components/hook-form";

export default function ResetPwForm() {
  const ResetPwSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email cannot be empty !")
      .email("Invalid email address"),
  });

  const defaultValues = {
    email: "test@gmail.com",
  };

  const methods = useForm({
    resolver: yupResolver(ResetPwSchema),
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
            Reset
          </Button>
        </Stack>
      </FormProvider>
    </>
  );
}
