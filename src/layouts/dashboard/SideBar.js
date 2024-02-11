import { useTheme } from '@mui/material/styles'
import { Avatar, Box, Divider, IconButton, Stack, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { Gear } from 'phosphor-react';
import { Nav_Buttons, Profile_Menu } from '../../data';
import useSettings from '../../hooks/useSettings';
import { faker } from '@faker-js/faker';
import Logo from "../../assets/Images/logo.ico"
import AntSwitch from '../../components/AntSwitch';

const SideBar = () => {
  const theme = useTheme();
  const [selected, setSelected] = useState(0);
  const { onToggleMode } = useSettings();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      p={2}
      sx={{ backgroundColor: theme.palette.background.paper, boxShadow: "0px 0px 2px rgba(0,0,0,0.25)", height: "100vh", width: 100 }}>
      <Stack direction="column" alignItems={"center"} justifyContent="space-between" sx={{ height: "100%" }} spacing={3}>
        <Stack alignItems={"center"} spacing={4}>
          <Box sx={{
            // backgroundColor: theme.palette.primary.main,
            height: 72,
            width: 72,
            borderRadius: 1.5,
          }}>
            <img src={Logo} alt={"Chat App Logo"} />
          </Box>
          <Divider sx={{ width: "48px" , borderWidth: "2px", backgroundColor: "rgba(0, 0, 0, 0.3)"}} />
          <Stack sx={{ width: "max-column" }} direction="column" alignItems="center" spacing={3}>
            {Nav_Buttons.map((el) => (
              el.index === selected ?
                <Box key={el.index} sx={{ backgroundColor: theme.palette.primary.main, borderRadius: 1.5, }}>
                  <IconButton sx={{ width: "max-content", color: "#fff" }} key={el.index}>
                    {el.icon}
                  </IconButton>
                </Box>
                : <IconButton
                key={el.index}
                  onClick={() => {
                    setSelected(el.index)
                  }}
                  sx={{ width: "max-content", color: theme.palette.mode === "light" ? "#000" : theme.palette.text.primary }} >
                  {el.icon}
                </IconButton>
            ))}
            <Divider sx={{ width: "48px" , borderWidth: "2px", backgroundColor: "rgba(0, 0, 0, 0.3)"}} />
            {selected === 3 ?
              <Box sx={{ backgroundColor: theme.palette.primary.main, borderRadius: 1.5, }}>
                <IconButton sx={{ width: "max-content", color: "#fff" }}>
                  <Gear />
                </IconButton>
              </Box>

              : <IconButton onClick={() => {
                setSelected(3)
              }}
                sx={{ width: "max-content", color: theme.palette.mode === "light" ? "#000" : theme.palette.text.primary }} >
                <Gear />
              </IconButton>
            }
          </Stack>
        </Stack>
        <Stack spacing={4}>
          <AntSwitch onChange={() => {
            onToggleMode();
          }} defaultChecked />
          <Avatar id="basic-button" aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick} src={faker.image.avatar()} />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            anchorOrigin={{
              vertical:"bottom",
              horizontal: "right"
            }}
            transformOrigin={{
              vertical:"bottom",
              horizontal: "left"
            }}
          >
            <Stack spacing={1} px={1}>
              {Profile_Menu.map((el, index) => (
                <MenuItem key={index} onClick={handleClick}>
                  <Stack sx={{ width: 100 }} direction={"row"} alignItems={"center"} justifyContent={"space-between"}>

                    <span>{el.title}</span></Stack>{el.icon}</MenuItem>
              ))}
            </Stack>
          </Menu>
        </Stack>
      </Stack>
    </Box>
  )
}

export default SideBar;