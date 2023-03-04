
function useVideoBlob(blob: Blob | undefined) {

  function downloadVideo(videoName: string) {
    if (!blob)
      return
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `${videoName}.webm`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  }

  function playVideo(video: React.RefObject<HTMLVideoElement>) {
    if (!blob || !video.current)
      return

    console.log(blob)

    video.current.srcObject = null;
    video.current.src = window.URL.createObjectURL(blob);
    video.current.controls = true;
    video.current.play();
  }

  return {
    downloadVideo,
    playVideo
  }
}

export default useVideoBlob