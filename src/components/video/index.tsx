import { DownloadIcon, RepeatIcon, StarIcon } from '@chakra-ui/icons'
import { Button, Text, Stack, HStack, Box, Center, IconButton } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import CircleIcon from '../../atoms/CircleIcon'
import PauseIcon from '../../atoms/PauseIcon'
import RecordIcon from '../../atoms/RecordIcon'
import ResumeIcon from '../../atoms/ResumeIcon'
import StopIcon from '../../atoms/StopIcon'
import { useMediaRecorder } from '../../hook/useMediaRecorder'
import { useMediaStream } from '../../hook/useMediaStream'
import useSecondsToMinutesSeconds from '../../hook/useSecondsToMinuteSeconds'
import useVideoBlob from '../../hook/useVideoBlob'


let timer: NodeJS.Timer

interface VideoProps {
  videoId: string | undefined,
}

const Video = ({ videoId }: VideoProps) => {

  const { mediaStream, setVideoStream } = useMediaStream()
  const { starRecording, stopRecording, pauseRecording, resumeRecording, recordedBlob } = useMediaRecorder(mediaStream)
  const { downloadVideo } = useVideoBlob()
  const video = useRef<HTMLVideoElement>(null)

  const [srcVideo, setSrcVideo] = useState<string | null>()

  const [record, setRecord] = useState({
    isRecording: false,
    text: 'record',
    icon: <RecordIcon />
  })
  const [recording, setRecording] = useState({
    isPause: false,
    text: 'Pause',
    icon: <PauseIcon />
  })
  const [count, setCount] = useState(120)
  const { timeString } = useSecondsToMinutesSeconds(count)
  const [redDot, setRedDot] = useState(false)
  const _handlerRecord = () => {
    if (!record.isRecording) {
      starRecording()
      setRecord({
        isRecording: true,
        text: 'stop',
        icon: <StopIcon />
      })
      return
    }
    stopRecording()

    setRecord({
      isRecording: false,
      text: 'record',
      icon: <RecordIcon />
    })
    setCount(120)
  }

  const _handlerRecording = () => {
    if (!recording.isPause) {
      pauseRecording()
      setRecording({
        isPause: true,
        text: 'Resume',
        icon: <ResumeIcon />
      })
      return
    }
    resumeRecording()
    setRecording({
      isPause: false,
      text: 'Pause',
      icon: <PauseIcon />
    })
  }

  useEffect(() => {
    if (!record.isRecording || recording.isPause)
      return
    timer = setInterval(() => {
      setCount(prevCount => prevCount - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [record, recording])

  useEffect(() => {
    setRedDot(prevstate => !prevstate)

    if (count)
      return
    stopRecording()
    setRecord({
      isRecording: false,
      text: 'start',
      icon: <StarIcon />
    })

    return () => clearInterval(timer)
  }, [count])

  useEffect(() => {
    if (!videoId)
      return
    const src = localStorage.getItem(videoId)
    if (!src) {
      setSrcVideo(null)
      return
    }
    setSrcVideo(src)
  }, [videoId])

  useEffect(() => {
    if (!recordedBlob)
      return
    const src = window.URL.createObjectURL(recordedBlob)
    setSrcVideo(src)
    if (!videoId)
      return
    localStorage.setItem(videoId, src)
  }, [recordedBlob])

  const _handlerReset = () => {
    if (!videoId)
      return
    localStorage.removeItem(videoId)
    setSrcVideo(null)
  }

  if (srcVideo) {
    return (
      <>
        <video src={srcVideo} playsInline autoPlay controls></video>
        <Box>
          <Button
            onClick={() => downloadVideo(srcVideo)}
            leftIcon={<DownloadIcon />}
          >
            Descargar
          </Button>
          <Button
            onClick={_handlerReset}
            leftIcon={<RepeatIcon />}
          >
            Regrabar
          </Button>
        </Box>
      </>
    )
  }


  return (
    <Stack margin='auto'>
      <video ref={video} playsInline autoPlay muted></video>
      <HStack justifyContent={'space-between'} >
        <HStack >
          <Center w={4} h={4} border={'solid'} borderColor={'red.500'} rounded={'full'}>
            <CircleIcon boxSize={redDot ? 3 : 4} color={'red.500'} />
          </Center>
          <Text>{timeString}</Text>
        </HStack>
        <HStack>
          <IconButton
            aria-label={record.text}
            onClick={_handlerRecord}
            icon={record.icon}
          />
          <IconButton
            aria-label={recording.text}
            onClick={_handlerRecording}
            icon={recording.icon}
          />
        </HStack>
        <Button onClick={() => setVideoStream(video)}>Abrir Camara</Button>
      </HStack>
    </Stack>
  )
}

export default Video