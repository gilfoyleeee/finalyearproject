import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Button,
  Stack,
} from "@mui/material";
import { MagnifyingGlass } from "phosphor-react";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import { CallElement, NewCallElement } from "../../components/CallLogElement";
import { Users_list } from "../../data";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CallDialog = ({ open, handleClose }) => {
  return (
    <>
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
        <DialogTitle sx={{ mb: 3 }}>Start Call</DialogTitle>
        <DialogContent>
          <Stack spacing={1}>
            <Stack sx={{ width: "100%" }}>
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass color="#709CE6" />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search..."
                  inputProps={{ "aria-label": "Search" }}
                />
              </Search>
            </Stack>
            {/* this call dialog contains user list */}
            {Users_list.map((el) => (
              <NewCallElement {...el} />
            ))}
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CallDialog;
