import { useEffect } from "react";

/* 緯度・経度からマップ座標を計算 https://www.trail-note.net/tech/coordinate/ */
export function getCoord(zoom: number, latitude: number, longitude: number) {
    return {
        x: Math.pow(2, zoom + 7) * (longitude / 180 + 1),
        y: Math.pow(2, zoom + 7) / Math.PI * (-Math.atanh(Math.sin(Math.PI * latitude / 180)) + Math.atanh(Math.sin(Math.PI / 180 * 85.05112878)))
    };
}

interface MapProps {
    latitude: number,
    longitute: number
}

export function Map(props: MapProps) {
    const elem = document.getElementById("map-canvas") as HTMLCanvasElement;
    const ctx = elem?.getContext('2d');
    if (ctx) {
        ctx.strokeStyle = "#000";
        ctx.fillStyle = "#000";
    }
    useEffect(() => {
        if (ctx) {
            ctx.fillStyle = "#000";
            ctx.beginPath();
            ctx.fillRect(0, 0, 130, 130);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = "#FFF";
            ctx.beginPath();
            ctx.fillRect(1, 1, 128, 128);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.arc(props.latitude+1, props.longitute+1, 10, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
        }
    }, [props.latitude, props.longitute]);
    return <canvas id="map-canvas" width={130} height={130}></canvas>
}