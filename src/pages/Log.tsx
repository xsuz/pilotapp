import { Button, Stack,TextField ,Typography} from '@mui/material';
import React from "react";
import { Logger } from "../component/Logger/Logger";
import { Packet } from '../component/Logger/Packet';


interface LogProps {
}

export default function Log(props: LogProps) {
    const logger = new Logger();

    function updateHandler(){
        logger.get(id, (args) => {
            setPackets(args);
            return;
        })
    }

    const [packets, setPackets] = React.useState([new Packet()]);
    const [id, setID] = React.useState("0");
    return (
        <div id="Log">
            
            <Stack direction={"row"} sx={{alignItems:'center'}}>
            <Typography variant='h6'>ID : </Typography> <TextField variant='outlined' value={id} onChange={(e) => {setID(e.target.value);}}></TextField>
            </Stack>
            <Button variant='outlined' onClick={()=>{
                updateHandler();
            }}>update</Button>
            {
                
                (() => {
                    return <ul>{JSON.stringify(packets)}</ul>
                })()
            }
        </div>
    )
}