import React, { useEffect, useState } from 'react'

const options: MediaRecorderOptions = {
  mimeType: 'video/webm;codecs=h264,opus'

}

export function useMediaRecorder(mediaStream: MediaStream | undefined) {
  const [mediaRecorder, setRecorder] = useState<MediaRecorder>()
  const [recordedBlob, setRecordedBlob] = useState<Blob>()

  function starRecording() {
    mediaRecorder?.start()
  }
  function stopRecording() {
    mediaRecorder?.stop()
    mediaRecorder?.addEventListener('dataavailable', (event) => {
      if (!event.data.size)
        return
      setRecordedBlob(event.data)
    })
  }
  function pauseRecording() {
    mediaRecorder?.pause()
  }
  function resumeRecording() {
    mediaRecorder?.resume()
  }



  useEffect(() => {
    if (!mediaStream)
      return
    const recorder = new MediaRecorder(mediaStream, options)
    setRecorder(recorder)
  }, [mediaStream])


  return {
    mediaRecorder,
    starRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    recordedBlob
  }
}
