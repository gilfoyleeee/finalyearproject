import { Divider, IconButton, Stack } from '@mui/material';
import { GithubLogo, GoogleLogo, TwitterLogo } from 'phosphor-react';
import React from 'react';

const AuthSocial = () => {
    return (
        <div>
            <Divider sx={{ my: 2.5, typography: "overline", color: "text.disabled", "&::before, ::afer": { borderTopStyle: "dashed" } }}>
                OR
            </Divider>
            <Stack direction={"row"} justifyContent="center" spacing={2}>
                <IconButton>
                    <GoogleLogo size={24} color="#DF3E30" />
                </IconButton>
                <IconButton>
                    <GithubLogo size={24} color="#24292e" />
                </IconButton>
                <IconButton>
                    <TwitterLogo size={24} color="#1C9CEA" />
                </IconButton>
            </Stack>
        </div>
    )
}

export default AuthSocial;
