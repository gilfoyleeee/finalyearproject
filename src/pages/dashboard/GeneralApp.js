import React from "react";
import Chats from "./Chats";
import { Box, Stack, Typography } from "@mui/material";
// import Conversation from "../../components/conversation";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import ChatComponent from "./Conversation";
import NoChat from "../../assets/Illustration/NoChat";
import Contact from "../../sections/main/Contact";
import StarredMessages from "../../sections/main/StarredMessages";
import SharedMessages from "../../sections/main/SharedMessages";

const GeneralApp = () => {
  const [searchParams] = useSearchParams();
  const theme = useTheme();
  const { sideBar, chat_type, room_id } = useSelector((state) => state.app);

  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      <Chats />
      <Box
        sx={{
          height: "100%",
          width: sideBar.open ? "calc(100vw - 740px)" : "calc(100vw - 420px)",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F0F4FA"
              : theme.palette.background.paper,
          borderBottom:
            searchParams.get("type") === "individual-chat" &&
            searchParams.get("id")
              ? "0px"
              : "6px solid #0162C4",
        }}
      >
        {room_id !== null && chat_type === "direct" ? (
          <ChatComponent />
        ) : (
          <Stack
            spacing={2}
            sx={{ height: "100%", width: "100%" }}
            alignItems="center"
            justifyContent="center"
          >
            <NoChat />
            <Typography variant="subtitle2">
              Wanna chat? Select a conversation or create new one.
            </Typography>
          </Stack>
        )}
      </Box>
      {/* Contact */}
      {sideBar.open &&
        (() => {
          switch (sideBar.type) {
            case "CONTACT":
              return <Contact />;

            case "STARRED":
              return <StarredMessages />;
            case "SHARED":
              return <SharedMessages />;

            default:
              break;
          }
        })()}
    </Stack>
  );
};

export default GeneralApp;
