const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const thread = require('child_process');
app.use(express.static(__dirname + '/static'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
})
const server =
app.listen(port, () => {
    console.log(`listening on port ${port}`)});

const io = require('socket.io')(server);

io.on('connection', function(socket) {
	console.log(socket.id + " connected")
	
const ffmpeg = thread.spawn('ffmpeg', [
		"-f",
		"lavfi",
		"-i",
		"anullsrc",
		"-i",
		"-",
		"-c:v",
		"libx264",
		"-preset",
		"veryfast",
		"-tune",
		"zerolatency",
		"-c:a",
		"aac",
		"-f",
		"flv", 
		`rtmp://rtmp.livepeer.com/live/818e-h3ig-czdp-am9u`
  ])

  ffmpeg.on('close', (code, signal) => {
    console.log('FFmpeg child process closed, code ' + code + ', signal ' + signal);
  });
  
  ffmpeg.stdin.on('error', (e) => {
    console.log('FFmpeg STDIN Error', e);
  });
  
  ffmpeg.stderr.on('data', (data) => {
    console.log('FFmpeg STDERR:', data.toString());
  });
	socket.on("stream", (data => {
		ffmpeg.stdin.write(data)
//		console.log(data);
	}))
	socket.on("disconnect",(socket => {
		console.log(socket.id + " disconnected")
	}))
});

