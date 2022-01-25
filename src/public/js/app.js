const massageList = document.querySelector("ul");
const massageform =  document.querySelector("#msg");
const nickform =  document.querySelector("#nick");
//tell frontend to please call backend 
const frnt_socket = new WebSocket(`ws://${window.location.host}`)

function makeMessage(type,payload){
    const msg ={type,payload}
    return JSON.stringify(msg);
}

//url http > is not workung 
frnt_socket.addEventListener("open",()=>{
    console.log("Connected to Server")
})

frnt_socket.addEventListener("message",(message)=>{
    const li = document.createElement("li");
    li.innerText =message.data
    massageList.append(li);
    //console.log("NEW MASSAGE:",message.data," from front_socket")
})

frnt_socket.addEventListener("close", ()=>{ 
    console.log("disConnected with Server")
})

//setTimeout(()=>{
//    frnt_socket.send("Hello from the Browser")
//},10000);

massageform.addEventListener("submit",(event)=>{
    event.preventDefault();
    const input = massageform.querySelector("input");
    frnt_socket.send(makeMessage("new_message",input.value))
    //frnt_socket.send(input.value)
    console.log(input.value)
    input.value="";
})
// -> function handleSubmit(event){}
function handleNickSubmit(event){
    event.preventDefault()
    const input = nickform.querySelector("input");
    frnt_socket.send(makeMessage("nickname",input.value))
    input.value="";
}

nickform.addEventListener("submit",handleNickSubmit);