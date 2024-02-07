import { Box, IconButton, Stack, Typography, InputBase, Button, Divider, Avatar, Badge } from '@mui/material'
import { ArchiveBox, CircleDashed, MagnifyingGlass } from 'phosphor-react';
import { styled, alpha } from "@mui/material/styles"
import React from 'react';
import { faker } from '@faker-js/faker';
import { ChatList } from '../../data';
import { SimpleBarStyle } from '../../components/Scrollbar';
import { useTheme } from '@emotion/react';
import StyledBadge from '../../components/StyledBadge';


const ChatElement = ({ id, name, msg, img, time, unread, online }) => {
    const theme = useTheme();
    return (
        <Box sx={{
            width: "100%",
            borderRadius: 1,
            backgroundColor: theme.palette.mode === "light" ? "#fff" : theme.palette.background.default,
        }}
            p={2}>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                <Stack direction={"row"} spacing={2}>
                    {online ? <StyledBadge overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot">
                        <Avatar src={faker.image.avatar()} />
                    </StyledBadge> :
                        <Avatar src={faker.image.avatar()} />}

                    <Stack spacing={0.3}>
                        <Typography variant="subtitle2">
                            {name}
                        </Typography>
                        <Typography variant="caption">
                            {msg}                        </Typography>
                    </Stack>
                </Stack>
                <Stack spacing={2} alignItems={"center"}>
                    <Typography sx={{ fontWeight: 600 }} variant="caption">
                        {time}
                    </Typography>
                    <Badge color="primary" badgeContent={unread}>

                    </Badge>
                </Stack>
            </Stack>
        </Box>
    )
}

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 20,
    backgroundColor: alpha(theme.palette.background.default, 1),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const Chats = () => {
    const theme = useTheme();
    return (
        <Box sx={{ position: "relative", width: 320, backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.paper, boxShadow: "0px 0px 2px rgba(0,0,0,0.25)" }}>

            <Stack p={3} spacing={2} sx={{height: "100vh"}}>
                <Stack direction="row" alignItems={"center"} justifyContent="space-between">
                    <Typography variant='h5'>
                        Chats
                    </Typography>
                    <IconButton>
                        <CircleDashed />
                    </IconButton>
                </Stack>
                <Stack sx={{ width: "100%" }}>
                    <Search>
                        <SearchIconWrapper>
                            <MagnifyingGlass color='#709CE6' />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder='Search...' />
                    </Search>
                </Stack>
                <Stack spacing={1}>
                    <Stack direction={"row"} alignItems={"center"} spacing={1.5}>
                        <ArchiveBox size={24} />
                        <Button>
                            Archieve
                        </Button>
                    </Stack>
                    <Divider />
                </Stack>
                <Stack spacing={2}
                direction={"column"} sx={{flexGrow:1, overflow: "scroll", height: "100%"}}>
                <SimpleBarStyle timeout={500} clickOnTrack={false}>
                    <Stack spacing={2.4}>
                        <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                            Pinned
                        </Typography>
                        {ChatList.filter((el) => el.pinned).map((el) => {
                            return <ChatElement key={el.id} {...el} />;
                        })}
                    </Stack>
                    <Stack spacing={2.4}>
                        <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                            All Chats
                        </Typography>
                        {ChatList.filter((el) => el.pinned).map((el) => {
                            return <ChatElement key={el.id} {...el} />;
                        })}
                    </Stack>
                    </SimpleBarStyle>
                </Stack>
            </Stack>
        </Box>
    )
}

export default Chats;
