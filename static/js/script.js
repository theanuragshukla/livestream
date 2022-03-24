const socket = io.connect();


var track = null;
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output");
 
var constraints = { video: { facingMode: "user" }, audio: false };
function cameraStart() {
	navigator.mediaDevices
		.getUserMedia(constraints)
		.then(function(stream) {
			track = stream.getTracks()[0];
			cameraView.srcObject = stream;
			let mediaRecorder = new MediaRecorder(stream);
			mediaRecorder.start(250);
			mediaRecorder.ondataavailable = function(e) {
				socket.emit("stream",e.data);
			}
		})
		.catch(function(error) {
			alert("please make sure to allow camera permissions from your browser's settings");
			console.error("Oops. Something is broken.", error);
		});
}

window.onload=()=>{
	cameraStart();
}

