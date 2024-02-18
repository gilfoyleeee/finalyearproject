import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Button,
  Stack
} from "@mui/material";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { RHFTextField } from "../../components/hook-form";
import RHFAutocomplete from "../../components/hook-form/RHFAutocomplete";

const members = ["Name 1", "Name 2", "Name 3"];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateGCForm = ({ handleClose }) => {
  const NewGCSchema = Yup.object().shape({
    gcName: Yup.string().required("Group Name cannot be empty"),
    members: Yup.array().min(2, "Should have atleast 2 members !"),
  });
  const defaultValues = {
    gcName: "",
    members: [],
  };

  const methods = useForm({
    resolver: yupResolver(NewGCSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful, isValid },
  } = methods;

  const onSubmit = async (data) => {
    try {
      //API Call
      console.log("DATA", data);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="gcName" label="Group Name" />
        <RHFAutocomplete
          name="members"
          label="Members"
          multiple
          freeSolo
          options={members.map((option) => option)}
          ChipProps={{ size: "medium" }}
        />
        <Stack
          spacing={2}
          direction={"row"}
          alignItems={"center"}
          justifyContent="end"
        >
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Create
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

const CreateGroupChat = ({ open, handleClose }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{ p: 4 }}
    >
      {/* title */}
      <DialogTitle sx={{mb: 3}}>Create New Group</DialogTitle>
      {/* content */}
      <DialogContent>
        {/* form for dialog content */}
        <CreateGCForm handleClose={handleClose}/>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupChat;
