import { RefObject, useEffect, useState } from "react"

const constrains: MediaStreamConstraints = {
  audio: {
    echoCancellation: { exact: true },
  },
  video: {
    width: 1280, height: 720
  }
}

async function getMediaStream() {
  try {
    const mediaSream = await navigator.mediaDevices.getUserMedia(constrains)
    return mediaSream
  } catch (e) {
    throw (new Error('Perimsos denegados'))
  }
}

export function useMediaStream() {
  const [mediaStream, setMedia] = useState<MediaStream>()

  function setMediaStream() {
    getMediaStream()
      .then(stream => {
        setMedia(stream)
      })
  }
  function setVideoStream(video: RefObject<HTMLVideoElement>) {
    if (!mediaStream || !video.current)
      return
    video.current.srcObject = mediaStream
  }

  useEffect(() => {
    setMediaStream()
  }, [])

  return {
    mediaStream,
    setMediaStream,
    setVideoStream
  }
}

