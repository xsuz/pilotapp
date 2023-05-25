import { Button, Typography } from "@mui/material";
import React from "react";
import { Logger } from "../component/Logger/Logger"
import { Packet } from "../component/Logger/Packet";
import { Map } from "../component/Map/Map";


interface HomeProps {
    url: string
}

let flag = false;

const logger = new Logger();

export default function Home(props: HomeProps) {
    const [flagState, setFlagState] = React.useState(false);


    const [GPS, setGPS] = React.useState([0,0]);


    const updateHandler = (url: string) => {
        fetch(url,{mode:'cors'})
            .then((res) => res.text())
            .then((data: string) => {
                try {
                    const packets = JSON.parse(data).data as Packet[]
                    for (let packet of packets) {
                        logger.add(packet);
                        setGPS([Math.random() * 128,Math.random() * 128]);
                    }
                } catch {
                    console.error("cannot add packet")
                }
                if (flag) {
                    setTimeout(updateHandler, 200, url);
                }
            });
    }



    if (props.url == "") {
        return <div id="Home">
            <Typography variant="h6">設定を行ってください</Typography>
        </div>
    }

    if (!flagState) {
        return (
            <div id="Home">
                <p>{props.url}</p>
                <Map latitude={GPS[0]} longitute={GPS[1]}></Map>
                <Button onClick={() => {
                    /* examples */
                    flag = true;
                    updateHandler(props.url);
                    setFlagState(flag);
                }}>{"START"}</Button>
            </div>
        )
    }

    return (
        <div id="Home">
            <p>{props.url}</p>
            <Map latitude={GPS[0]} longitute={GPS[1]}></Map>
            <Button onClick={() => {
                /* examples */
                flag = false;
                setFlagState(flag);
            }}>{"END"}</Button>
        </div>
    )
}