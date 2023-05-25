import { Stack, TextField,Typography } from '@mui/material';
import React from "react";

interface SettingProps {
    url:string
    setURL:React.Dispatch<React.SetStateAction<string>>
}

export default function Settings(props:SettingProps) {
    return (
        <div id="Log">
            <Stack direction={"row"} sx={{alignItems:'center'}}>
            <Typography variant='h6'>URL： </Typography> <TextField variant='outlined' value={props.url} onChange={(e) => {props.setURL(e.target.value);}}></TextField>
            </Stack>
        </div>
    )
}