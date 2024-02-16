import { useTheme } from "@emotion/react";
import { Box, IconButton, Typography, Stack, Avatar, Divider, Button, Dialog, DialogTitle, DialogContent, DialogContentText, Slide, DialogActions } from "@mui/material";
import { X, Phone, VideoCamera, CaretRight, Star, Bell, Prohibit, Trash } from "phosphor-react";
import { faker } from "@faker-js/faker";
import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { ToggleSidebar, UpdateSidebarType } from "../redux/slices/app";
import AntSwitch from "./AntSwitch";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BlockDialogBox = ({open, handleClose}) => {
  return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}
      >
        <DialogTitle id="alert-dialog-title">
        Block User?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           You can't send or receive any kind of messages from this user after blocking.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
            Block
          </Button>
        </DialogActions>
      </Dialog>
      
  )
}

const DeleteChatDialog = ({open, handleClose}) => {
  return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}
      >
        <DialogTitle id="alert-dialog-title">
        Delete Chat History?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Are you sure you want to delete the chat history?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      
  )
}

const Contact = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [openBlock, setOpenBlock] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleCloseBlock = () => {
    setOpenBlock(false);
  }
  const handleCloseDelete = () => {
    setOpenDelete(false);
  }

  return (
    //Header
    <Box sx={{ width: 320, height: "100vh" }}>
      <Stack sx={{ height: "100%" }}>
        <Box sx={{
          boxShadow: "0px 0px 2px rgba(0, 0,0, 0.25)",
          width: "100%",
          backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background,
        }}>
          <Stack sx={{ height: "100%", p: 2 }} direction="row" alignItems={"center"} justifyContent="space-between" spacing={3}>
            <Typography variant="subtitle2"> Contact Info</Typography>
            <IconButton onClick={() => {
              dispatch(ToggleSidebar());
            }}> <X /> </IconButton>
          </Stack>

        </Box>
        {/*body */}
        <Stack sx={{ height: "100%", position: "relative", flexGrow: 1, overflowY: "scroll" }} p={3} spacing={3}>
          <Stack alignItems={"center"} direction="row" spacing={2}>
            <Avatar src={faker.image.avatar()} alt={faker.name.firstName()} sx={{ height: 64, width: 64 }} />
            <Stack spacing={0.5}> <Typography variant="article" fontWeight={600}>{faker.name.fullName()}</Typography>
              <Typography variant="body2" fontWeight={500}>{'9819044921'}</Typography>
            </Stack>
          </Stack>
          <Stack direction="row"
            alignItems={"center"}
            justifyContent={"space-evenly"}>
            <Stack spacing={1} alignItems={"center"}>
              <IconButton>
                <Phone />
              </IconButton>
              <Typography variant="overline">
                Voice
              </Typography>

            </Stack>


            <Stack direction="row"
              alignItems={"center"}
              justifyContent={"space-evenly"}>
              <Stack spacing={1} alignItems={"center"}>
                <IconButton>
                  <VideoCamera />
                </IconButton>
                <Typography variant="overline">
                  Video
                </Typography>

              </Stack>
            </Stack>
          </Stack>
          <Divider />
          <Stack spacing={0.5}>
            <Typography variant="article">About</Typography>
            <Typography variant="body2">Hello ! Wassup? </Typography>
          </Stack>
          <Divider />
          <Stack direction="row" alignItems={"center"} justifyContent="space-between">
            <Typography variant="subtitle"> Media, Links & Docs</Typography>
            <Button onClick={() => {
              dispatch(UpdateSidebarType("SHARED"))
            }}
              endIcon={<CaretRight />}> 401</Button>
          </Stack>
          <Stack direction={"row"} spacing={2} alignItems={"center"}> {[1, 2, 3].map((el) => (
            <Box>
              <img src={faker.image.food()} alt={faker.name.fullName()} />
            </Box>
          ))}</Stack>
          <Divider />
          <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <Star size={21} />
              <Typography variant="subtitle2"> Starred Message</Typography></Stack>
            <IconButton onClick={() => {
              dispatch(UpdateSidebarType("STARRED"));
            }}>
              <CaretRight />
            </IconButton>
          </Stack>
          <Divider />
          <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <Bell size={21} />
              <Typography variant="subtitle2"> Mute Notifications</Typography></Stack>
            <AntSwitch />
          </Stack>
          <Divider />
          <Typography v> 1 group in common</Typography>
          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} />
            <Stack spacing={0.5}>
              <Typography variant="subtitle2">Coding Monk</Typography>
              <Typography variant="caption">Owl, Horse, Tiger, You</Typography>
            </Stack>
          </Stack>
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Button onClick={() => {
              setOpenBlock(true);
            }}
            startIcon={<Prohibit />} fullWidth variant="outlined">Block</Button>
            <Button onClick={() => {
              setOpenDelete(true);
            }}
            startIcon={<Trash />} fullWidth variant="outlined">Delete</Button>
          </Stack>
        </Stack>
      </Stack>
      {openBlock && (<BlockDialogBox open={openBlock} handleClose={handleCloseBlock} />)}
      {openDelete && (<DeleteChatDialog open={openDelete} handleClose={handleCloseDelete} /> )}
    </Box>
  )
}

export default Contact