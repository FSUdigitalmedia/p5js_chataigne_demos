// osc_sentimental - an OSC conversation example
// see github.com/rahji/sentimental

// 1) p5js sends a string via websockets 
// 2) Chataigne receives the WS message and translates it to an OSC /text message
// 3) Sentimental receives the OSC message and responds with an OSC /sentiment message
// 4) Chataigne receives the OSC message and translates it to a WS message
// 5) p5js receives the WS message and prints it on the console

let textField;
let button;

var host = '127.0.0.1:8080'; // address of the websockets server
var socket; // the websocket connection

function setup() {
    // add an input field and a submit button to the page using the p5.js DOM functions
    noCanvas();
    textField = createInput("I like apples very much");
    button = createButton('Analyze');
    button.mousePressed(sendText);
    
    // connect to the websockets server (Chataigne)
    socket = new WebSocket('ws://' + host);
    socket.onopen = openHandler;
    socket.onmessage = messageHandler;
}

// sendText is called when someone presses submit
function sendText() {
    let text = textField.value();

    // send the text to the websocket server
    // (if the socket is open and ready)
    if (socket.readyState == 1) {
        socket.send(text);
        console.log("Sent: " + text);
    } else {
        console.log("Socket not ready.");
    }
}

// openHandler is called when the connection to the ws server (Chataigne) is succesful
function openHandler() {
    console.log("Connected to socket server at " + host);
}

// messageHandler is called whenever a message comes from the ws server (Chataigne)
function messageHandler(event) {
    var msg = event.data; // read data from the onmessage event
    if (msg != 0) {
        console.log("Received sentiment value: " + msg);
    } else {
        console.log("That statement came back as neutral  ╰(*°▽°*)╯");
    }
}