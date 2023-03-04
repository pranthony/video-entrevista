import { DownloadIcon } from '@chakra-ui/icons'
import { Button, Text, Icon, Stack, HStack } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useMediaRecorder } from '../../hook/useMediaRecorder'
import { useMediaStream } from '../../hook/useMediaStream'
import useVideoBlob from '../../hook/useVideoBlob'


let timer: NodeJS.Timer

const Video = () => {
  const { mediaStream, setVideoStream } = useMediaStream()
  const { starRecording, stopRecording, pauseRecording, resumeRecording, recordedBlob } = useMediaRecorder(mediaStream)
  const { downloadVideo, playVideo } = useVideoBlob(recordedBlob)
  const video = useRef<HTMLVideoElement>(null)

  const [record, setRecord] = useState({
    isRecording: false,
    text: 'Start'
  })
  const [recording, setRecording] = useState({
    isPause: false,
    text: 'Pause'
  })
  const [count, setCount] = useState(120)
  const _handlerRecord = () => {
    if (!record.isRecording) {


      starRecording()
      setRecord({
        isRecording: true,
        text: 'stop'
      })
      return
    }
    stopRecording()
    setRecord({
      isRecording: false,
      text: 'start'
    })
    setCount(120)
  }

  const _handlerRecording = () => {
    if (!recording.isPause) {
      pauseRecording()
      setRecording({
        isPause: true,
        text: 'Resume'
      })
      return
    }
    resumeRecording()
    setRecording({
      isPause: false,
      text: 'Pause'
    })
  }

  useEffect(() => {
    if (!record.isRecording || recording.isPause)
      return
    timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [record, recording])

  useEffect(() => {
    if (count)
      return
    stopRecording()
    setRecord({
      isRecording: false,
      text: 'start'
    })

    return () => clearInterval(timer)
  }, [count])

  useEffect(() => {
    if (!recordedBlob)
      return

    playVideo(video)
  }, [recordedBlob])

  return (
    <Stack margin='auto'>
      <video ref={video} playsInline autoPlay muted ></video>
      <HStack justifyContent={'space-between'}>
        <HStack>
          <Icon viewBox='0 0 200 200' color='red.500'>
            <path
              fill='currentColor'
              d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
            />
          </Icon>
          <Text>{count}</Text>
        </HStack>
        <HStack>
          <Button onClick={_handlerRecord}>{record.text}</Button>
          <Button onClick={_handlerRecording}>{recording.text}</Button>
        </HStack>
        <Button onClick={() => setVideoStream(video)}>Open Camera</Button>
        <Button onClick={() => downloadVideo(`${new Date()}`)} leftIcon={<DownloadIcon />} />
      </HStack>
    </Stack>
  )
}

export default Video