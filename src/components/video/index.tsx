import { DownloadIcon } from '@chakra-ui/icons'
import { Button, Container, ModalBody, Text, VStack, Icon, Stack, Box, HStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { downloadVideo, startRecording, stopRecording } from './config'

interface VideoProps {
  stream: MediaStream
}

const Video = ({ stream }: VideoProps) => {
  const [recorder, setRecorder] = useState<MediaRecorder>()
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
      let mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=h264,opus'
      });
      setRecorder(mediaRecorder)
      startRecording(mediaRecorder)
      setRecord({
        isRecording: true,
        text: 'stop'
      })
      return
    }
    if (recorder)
      stopRecording(recorder)
    setRecord({
      isRecording: false,
      text: 'start'
    })
  }

  const _handlerRecording = () => {
    if (!recording.isPause) {
      recorder?.pause()
      setRecording({
        isPause: true,
        text: 'Resume'
      })
      return
    }
    recorder?.resume()
    setRecording({
      isPause: false,
      text: 'Pause'
    })
  }
  let timer: number
  useEffect(() => {
    if (!record.isRecording || recording.isPause)
      return
    timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [record, recording])
  useEffect(() => {
    if (count || !recorder)
      return
    stopRecording(recorder)
    setRecord({
      isRecording: false,
      text: 'start'
    })
    
    return () => clearInterval(timer)
  }, [count])


  return (
    <ModalBody margin='auto'>
      <Stack>
        <video id="gum" playsInline autoPlay muted ></video>
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
          <Button onClick={downloadVideo} leftIcon={<DownloadIcon />} />
        </HStack>
      </Stack>

    </ModalBody>
  )
}

export default Video