
const recordedBlobs: any[] = [];

export function handleSuccess(stream: MediaStream) {
  const gumVideo: HTMLVideoElement | null = document.querySelector('video#gum');

  if (!gumVideo)
    return false
  gumVideo.srcObject = stream
  return true
}

function handleDataAvailable(event: any) {
  if (event.data && event.data.size > 0) {
    playVideo(event.data)
    recordedBlobs.push(event.data);
  }
}
export function startRecording(mediaRecorder: MediaRecorder) {
  mediaRecorder.start();
}
export function stopRecording(mediaRecorder: MediaRecorder) {
  mediaRecorder.stop();
  mediaRecorder.ondataavailable = handleDataAvailable;
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

export function playVideo(superBuffer : Blob){
  const gumVideo: HTMLVideoElement | null = document.querySelector('video#gum');
  if(!gumVideo)
    return
    
  gumVideo.srcObject = null;
  gumVideo.src = window.URL.createObjectURL(superBuffer);
  gumVideo.controls = true;
  gumVideo.play();
}
