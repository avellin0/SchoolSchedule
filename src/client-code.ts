import { AdapterServer} from "./server/Adapter-Server";
import { ServerProtocol } from "./interfaces/Adapter-Server-Protocol";


function RunServerAdapter(server: ServerProtocol): void{
    if(server){
        console.log("Server is running");
    }else {
        console.log(" server is falled")
    }
}

RunServerAdapter(new AdapterServer())