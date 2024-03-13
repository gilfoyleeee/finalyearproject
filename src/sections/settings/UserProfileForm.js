import React, { useCallback } from "react";
import {
  Alert,
  Stack,
  Button,
} from "@mui/material";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { RHFTextField } from "../../components/hook-form";

import { useDispatch, useSelector } from "react-redux";

const UserProfileForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.app);
  const ProfileSchema = Yup.object().shape({
    userName: Yup.string().required("Name cannot be empty !"),
    userBio: Yup.string().required("Bio cannot be empty !"),
    avatarURL: Yup.string().required("Avatar cannot be empty !").nullable(true),
  });

  const defaultValues = {
    userName: "user?.firstName",
    userBio: "",
  };

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: {errors,isSubmitting, isSubmitSuccessful },
  } = methods;

  const values = watch();

  const handleDrop = useCallback((acceptedFiles) => {
    const ppFile = acceptedFiles[0];
    const newppFile = Object.assign(ppFile, {
      preview: URL.createObjectURL(ppFile),
    });
    if (ppFile) {
      setValue("avatarURL", newppFile, { shouldValidate: true });
    }
  }, setValue);

  const onSubmit = async (data) => {
    try {
      console.log("Data", data);
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
          <Stack spacing={3}>
            {!!errors.afterSubmit && (
              <Alert severity="error"> {errors.afterSubmit.message}</Alert>
            )}
            <RHFTextField name="name" label="Name" helperText={""} />
            <RHFTextField
              multiline
              rows={3}
              maxRows={5}
              name="bio"
              label="Your Bio"
            />
          </Stack>
          <Stack direction={"row"} justifyContent="end">
            <Button
              color="primary"
              size="medium"
              type="submit"
              variant="outlined"
              sx={{
                bgcolor: "primary.main",
                color: (theme) =>
                  theme.palette.mode === "light" ? "common.white" : "common.white",
                "&:hover": {
                  bgcolor: "common.white",
                  color: (theme) =>
                    theme.palette.mode === "light"
                      ? "primary.main"
                      : "primary.main",
                },
              }}
            >
              Save
            </Button>
          </Stack>
        </Stack>
      </FormProvider>
    </>
  );
};

export default UserProfileForm;
