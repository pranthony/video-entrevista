
function useVideoBlob() {

  function downloadVideo(url: string ) {
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `${new Date()}.webm`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  }

  return {
    downloadVideo
  }
}

export default useVideoBlob