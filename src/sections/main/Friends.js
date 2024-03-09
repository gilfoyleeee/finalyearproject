import { Dialog, DialogContent, Stack, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchFriends,
  FetchFrnRequests,
  FetchUsers,
} from "../../redux/slices/app";
import { FriendElement, FriendRequestElement, UserElement } from "../../components/Friends";

const FriendsList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchFriends);
  }, []);
  const { friends } = useSelector((state) => state.app);

  return (
    <>
      {FriendElement.map((el, index) => {
        return <FriendElement key={index} {...el} />;
      })}
    </>
  );
};
const FriendRequestsList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchFrnRequests);
  }, []);
  const { friendRequests } = useSelector((state) => state.app);

  return (
    <>
      {FriendRequestElement.map((el, index) => {
        return <FriendRequestElement key={index} {...el.sender} id={el._id} />;
      })}
    </>
  );
};
const UsersList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchUsers);
  }, []);
  const { users } = useSelector((state) => state.app);

  return (
    <>
      {UserElement.map((el, index) => {
        return <UserElement key={el._id} {...el}/>
      })}
    </>
  );
};

const Friends = ({ open, handleClose }) => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        keepMounted
        onClose={handleClose}
        sx={{ p: 4 }}
      >
        <Stack p={2} sx={{ width: "100%" }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Friends" />
            <Tab label="Friend Requests" />
            <Tab label="Community" />
          </Tabs>
        </Stack>
        {/* dialog content here */}
        <DialogContent>
          <Stack sx={{ height: "100%" }}>
            <Stack spacing={2.5}>
              {(() => {
                switch (value) {
                  case 0: //display all friends
                    return <FriendsList />;
                  case 1: //display all friend reqs
                    return <FriendRequestsList />;
                  case 2: //display all users
                    return <UsersList />;

                  default:
                    break;
                }
              })()}
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Friends;
