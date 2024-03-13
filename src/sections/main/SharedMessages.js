import { useTheme } from '@mui/material/styles';
import { Box, Stack, Typography, IconButton, Tabs, Tab, Grid } from '@mui/material';
import React from "react";
import { useDispatch } from 'react-redux';
import { UpdateSidebarType } from '../../redux/slices/app';
import { CaretLeft } from 'phosphor-react';
import { faker } from '@faker-js/faker';
import { SHARED_DOCS } from '../../data';
import { DocMsg, LinkMsg } from './Conversation';


const SharedMessages = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (

        //header
        <Box sx={{ width: 320, height: "100vh" }}>
            <Stack sx={{ height: "100%" }}>
                <Box sx={{
                    boxShadow: "0px 0px 2px rgba(0, 0,0, 0.25)",
                    width: "100%",
                    backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background,
                }}>
                    <Stack sx={{ height: "100%", p: 2 }} direction="row" alignItems={"center"} spacing={3}>
                        <IconButton onClick={() => {
                            dispatch(UpdateSidebarType("CONTACT"));
                        }}> <CaretLeft /> </IconButton>
                        <Typography variant="subtitle2"> Shared Messages</Typography>
                    </Stack>
                </Box>

                {/* MUI Centered tabs */}
                <Tabs sx={{ px: 2, pt: 2 }}
                    value={value}
                    onChange={handleChange}
                    centered
                >
                    <Tab label="Media" />
                    <Tab label="Docs" />
                    <Tab label="Links" />
                </Tabs>

                {/* Body */}
                <Stack
                    sx={{
                        height: "100%",
                        position: "relative",
                        flexGrow: 1,
                        overflowY: "scroll"
                    }}
                    p={3}
                    spacing={value === 1?1:3}
                >
                    {(() => {
                        switch (value) {
                            case 0:
                                //Images
                                return (
                                    <Grid container spacing={2}>
                                        {[0, 1, 2, 3, 4, 5, 6].map((el) => {
                                            return (
                                                <Grid item xs={4} key={el}>
                                                    <img
                                                        src={faker.image.avatar()}
                                                        alt={faker.name.fullName()}
                                                    />
                                                </Grid>
                                            );
                                        })}
                                    </Grid>
                                );
                            case 1:
                                // Docs
                                return SHARED_DOCS.map((el) => <DocMsg el={el}/>);
                            case 2:
                                // Links
                                return SHARED_DOCS.map((el) => <LinkMsg el={el}/>);
                            default:
                                return null;
                        }
                    })()}
                </Stack>

            </Stack>
        </Box>
    )
}

export default SharedMessages