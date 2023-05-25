import { Packet } from "./Packet";
const dbName = 'MeisterPilotApp';

const startID=0x00;
const endID=0xFF;

export class Logger {
    async add(data: Packet) {
        const request = indexedDB.open(dbName, 1);
        request.onsuccess = () => {
            let db = request.result;
            let trans = db.transaction(data.id.toString(), "readwrite");
            let store = trans.objectStore(data.id.toString());
            let putReq = store.put(data);
            putReq.onsuccess = () => {
                console.log("データ追加成功")
            }
            putReq.onerror = () => {
                console.log("データ追加失敗")
            }
        }
        request.onupgradeneeded = (event) => {
            const db = request.result;
            for(let id =startID;id<=endID;id++){
                db.createObjectStore(id.toString(),{keyPath:"timestamp"});
            }
            console.log("DBを作成")
        }
        request.onerror = (e) => {
            console.log(e);
        }
    }
    get(id:string,func:(arg:Packet[])=>void) {
        let result=Array<Packet>();
        const request = indexedDB.open(dbName, 1);
        request.onsuccess = () => {
            const db = request.result;
            let trans = db.transaction(id, "readonly");
            const objItem = trans.objectStore(id);
            objItem.getAll().onsuccess = ((e) => {
                func((e.target as IDBRequest).result as Packet[]);
            })
        }
        request.onerror = (e) => {
            console.log(e);
        }
        request.onupgradeneeded = (event) => {
            const db = request.result;
            for(let id =startID;id<=endID;id++){
                db.createObjectStore(id.toString(),{keyPath:"timestamp"});
            }
            console.log("DBを作成")
        }
    }
}