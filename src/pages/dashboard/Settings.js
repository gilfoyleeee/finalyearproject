import { useTheme } from '@mui/material/styles'
import { Avatar, Box, Divider, IconButton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Bell, CaretLeft, Info, Key, Keyboard, Note, PencilCircle, Lock, Image } from 'phosphor-react';
import { faker } from '@faker-js/faker';
import Shortcuts from '../../sections/settings/Shortcuts';

const Settings = () => {
    const theme = useTheme();

    const [openShortcuts, setOpenShortcuts] = useState(false);
    const handleOpenShortcuts = () => {
        setOpenShortcuts(true);
    }
    const handleCloseShortcuts = () => {
        setOpenShortcuts(false);
    }

    const settingslist = [
        {
            key: 0, //to render a list
            icon: <Bell size={20} />, //icon
            title: "Notifications", //title of icon
            onclick: () => { }, //to perform certain actions
        },
        {
            key: 1,
            icon: <Lock size={20} />,
            title: "Privacy",
            onclick: () => { },
        },
        {
            key: 2,
            icon: <Key size={20} />,
            title: "Security",
            onclick: () => { },
        },
        {
            key: 3,
            icon: <PencilCircle size={20} />,
            title: "Theme",
            // onclick: handleOpenTheme,
            onclick: () => { },
        },
        {
            key: 4,
            icon: <Image size={20} />,
            title: "Chat Wallpaper",
            onclick: () => { },
        },
        {
            key: 5,
            icon: <Note size={20} />,
            title: "Request Account info",
            onclick: () => { },
        },
        {
            key: 6,
            icon: <Keyboard size={20} />,
            title: "Keyboard Shortcuts",
            onclick: handleOpenShortcuts,
        },
        {
            key: 7,
            icon: <Info size={20} />,
            title: "Help",
            onclick: () => { },
        },
    ]
    return (
        <>
            <Stack direction={"row"} sx={{ width: "100%" }}>
                {/* Left Panel */}
                <Box sx={{ overflowY: "scroll", height: "100vh", width: 320, backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background }}>

                    <Stack p={4} spacing={5}>
                        {/* Header */}
                        <Stack direction={"row"} alignItems={"center"} spacing={3}>
                            <IconButton>
                                <CaretLeft size={24} color={"#4B4B4B"} />
                            </IconButton>
                            <Typography variant='h5'>
                                Settings
                            </Typography>
                        </Stack>
                        {/* Profile */}
                        <Stack direction={"row"} spacing={3}>
                            <Avatar sx={{ width: 56, height: 56 }} src={faker.image.avatar()} alt={faker.name.fullName()} />
                            <Stack spacing={0.5}>
                                <Typography variant="article">
                                    {faker.name.fullName()}
                                </Typography>
                                <Typography variant="body2">
                                    {faker.random.words()}
                                </Typography>
                            </Stack>
                        </Stack>
                        {/* List of options */}
                        <Stack spacing={4}>
                            {settingslist.map(({ key, icon, title, onclick }) => <>
                                <Stack key={key} spacing={2} sx={{ cursor: "pointer" }} onClick={onclick}>
                                    <Stack direction={"row"} spacing={2} alignItems={"center"}>
                                        {icon}
                                        <Typography variant='body2'>
                                            {title}
                                        </Typography>
                                    </Stack>
                                    {key !== 7 && <Divider />}
                                </Stack>
                            </>)}
                        </Stack>
                    </Stack>
                </Box>

                {/* Right Panel */}
                <Box
                    sx={{
                        height: "100%",
                        width: "calc(100vw - 420px )",
                        backgroundColor:
                            theme.palette.mode === "light"
                                ? "#FFF"
                                : theme.palette.background.paper,
                        borderBottom: "6px solid #0162C4",
                    }}></Box>
            </Stack>
            {openShortcuts && <Shortcuts open={openShortcuts} handleClose={handleCloseShortcuts} />}
        </>
    )
}

export default Settings;