let audioChunks = [];
let recorder;
let audioBlob;

navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = event => audioChunks.push(event.data);
    recorder.onstop = async () => {
        audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
        document.getElementById('audioPlayback').src = URL.createObjectURL(audioBlob);
        document.getElementById('downloadButton').disabled = false;
    };
});

document.getElementById('recordButton').addEventListener('click', () => {
    audioChunks = [];
    recorder.start();
    document.getElementById('recordButton').disabled = true;
    document.getElementById('stopButton').disabled = false;
});

document.getElementById('stopButton').addEventListener('click', () => {
    recorder.stop();
    document.getElementById('recordButton').disabled = false;
    document.getElementById('stopButton').disabled = true;
});

document.getElementById('downloadButton').addEventListener('click', () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(audioBlob);
    a.download = 'recording.mp3';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});
