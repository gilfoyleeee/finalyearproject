import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Stack,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import { ArchiveBox, ChatText, MagnifyingGlass, User } from "phosphor-react";
import { ChatList } from "../../data";
import { SimpleBarStyle } from "../../components/Scrollbar";
import { useTheme } from "@mui/material/styles";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import ChatElement from "../../components/ChatElement";
import Friends from "../../sections/main/Friends";
import { socket } from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import useResponsive from "../../hooks/useResponsive";
import {
  FetchCurrentMessages,
  FetchDirectConversations,
  SetCurrentConversation,
} from "../../redux/slices/conversation";
import BottomNav from "../../layouts/dashboard/BottomNav";


const user_id = window.localStorage.getItem("user_id");

const Chats = () => {
  const theme = useTheme();
  const isDesktop = useResponsive("up", "md");
  const dispatch = useDispatch();
  const { conversations } = useSelector(
    (state) => state.conversation.direct_chat
  );
  // const { room_id } = useSelector((state) => state.app);

  useEffect(() => {
    // const current = conversations.find((el) => el?.id === room_id);
    socket.emit(
      "get_direct_conversations",
      {
        user_id,
      },
      (data) => {
        //data=> list of conversations
        console.log(data);
        dispatch(FetchDirectConversations({ conversations: data }));
      }
    );
  }, []);
  const [openDialog, setOpenDialog] = useState(false);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  return (
    <>
      <Box
        sx={{
          position: "relative",
          height: "100%",
          width: isDesktop ? 320 : "100vw",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F8FAFF"
              : theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
        }}
      >
        {!isDesktop && (
          // Bottom Nav
          <BottomNav/>
        )}
        <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
          <Stack
            direction="row"
            alignItems={"center"}
            justifyContent="space-between"
          >
            <Typography variant="h5">Chats</Typography>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <IconButton
                onClick={() => {
                  handleOpenDialog();
                }}
              >
                <User />
              </IconButton>
              <IconButton>
                <ChatText />
              </IconButton>
            </Stack>
          </Stack>
          <Stack sx={{ width: "100%" }}>
            <Search>
              <SearchIconWrapper>
                <MagnifyingGlass color="#709CE6" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search..."
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Stack>
          <Stack spacing={1}>
            <Stack direction={"row"} alignItems={"center"} spacing={1.5}>
              <ArchiveBox size={24} />
              <Button>Archieve</Button>
            </Stack>
            <Divider />
          </Stack>
          <Stack
            spacing={2}
            direction={"column"}
            sx={{ flexGrow: 1, overflow: "scroll", height: "100%" }}
          >
            <SimpleBarStyle timeout={500} clickOnTrack={false}>
              <Stack spacing={2.4}>
                {/* <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                  Pinned
                </Typography>
                {ChatList.filter((el) => el.pinned).map((el) => {
                  return <ChatElement key={el.id} {...el} />;
                })} */}
                <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                  All Chats
                </Typography>
                {conversations
                  .filter((el) => !el.pinned)
                  .map((el) => {
                    return <ChatElement key={el.id} {...el} />;
                  })}
              </Stack>
            </SimpleBarStyle>
          </Stack>
        </Stack>
      </Box>
      {openDialog && (
        <Friends open={openDialog} handleClose={handleCloseDialog} />
      )}
    </>
  );
};

export default Chats;
