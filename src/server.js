import http from "http"
import WebSocket from "ws";
import express, { application } from "express";

const app = express();

app.set("view engine","pug");
app.set("views", __dirname+"/public/js/views")
app.use("/public", express.static(__dirname+"/public"))
app.get("/", (req,res)=> res.render("home"));
app.get("*",(reqn,res)=> res.redirect("/"));

const handleListen = () => console.log('Listening on ws/ http:localhost:3000');
//app.listen(3000,handleListen);

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

//function handleConnection(back_socket){
//    console.log(back_socket)
//}

const sockets =[];

wss.on("connection",(socket)=>{
    sockets.push(socket);
    socket["nickname"]= "Anon"; //default nickname
    console.log("Connected with Browser")
    //socket.send("Hello");
    socket.on("close",()=>{console.log("Disconnected with Browser")})
    //user msg to user again 
    socket.on("message", (msg)=>{
       // const messageString = message.toString('utf8');
      //  const parsed = JSON.parse(messageString);
        const message = JSON.parse(msg)
        console.log("New Message from Backend :",message)
        switch(message.type){
            case "new_message":
                sockets.forEach((aSocket)=> aSocket.send(`${socket.nickname}: ${message.payload}`));
                break;
            case "nickname" : 
                socket["nickname"]= message.payload;
                break;
        }
        
        
    })
})
server.listen(3000,handleListen);



