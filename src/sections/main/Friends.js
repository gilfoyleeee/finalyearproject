import { Dialog, DialogContent, Stack, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchFriends,
  FetchFrnRequests,
  FetchUsers,
} from "../../redux/slices/app";
import { FriendElement, FriendRequestElement, UserElement } from "../../components/UserElement";

const UsersList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchUsers());
  }, []);
  const { users } = useSelector((state) => state.app);

  return (
    <>
      {users.map((el, index) => {
        return <UserElement key={el._id} {...el}/>
      })}
    </>
  );
};
const FriendsList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchFriends());
  }, []);
  const { friends } = useSelector((state) => state.app);
  
  return (
    <>
      {friends.map((el, index) => {
        return <FriendElement key={el._id} {...el} />;
      })}
    </>
  );
};
const FriendRequestsList = () => {
  const dispatch = useDispatch();
  const { friendRequests } = useSelector((state) => state.app);
  useEffect(() => {
    dispatch(FetchFrnRequests());
  }, []);

  return (
    <>
      {friendRequests.map((el, index) => {
        return <FriendRequestElement key={el._id} {...el.sender} id={el._id} />;
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
            <Stack spacing={2.4}>
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
