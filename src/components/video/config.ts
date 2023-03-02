
const recordedBlobs: any[] = [];

export function handleSuccess(stream: MediaStream) {
  const gumVideo: HTMLVideoElement | null = document.querySelector('video#gum');
  if (!gumVideo)
    return false
  gumVideo.srcObject = stream
  return true
}

function handleDataAvailable(event: any) {
  console.log('handleDataAvailable', event);
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}
export function startRecording(mediaRecorder: MediaRecorder) {
  mediaRecorder.onstop = (event) => {
    console.log('Recorder stopped: ', event);
  };
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start(120000);
  console.log('MediaRecorder started', mediaRecorder);
}
export function stopRecording(mediaRecorder: MediaRecorder) {
  mediaRecorder.stop();
  console.log(recordedBlobs)
}

export function downloadVideo() {
  const blob = new Blob(recordedBlobs, { type: 'video/webm' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'test.webm';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
}