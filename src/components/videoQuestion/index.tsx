import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Button, Heading, Modal, ModalContent, ModalFooter, ModalHeader, Stack, Text, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { VITE_API_URL } from '../../config'
import { QuestionType } from '../../config/types'
import Video from '../video'
import { handleSuccess } from '../video/config'

const VideoQuestion = () => {
  const [stream, setStream] = useState<MediaStream>(new MediaStream())
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [errorMessage, setErrorMessage] = useState('')
  const [ question, setQuestion ] = useState<QuestionType>()
  const [ id, setID ] = useState<number>(0)
  
  const recordBtns = document.querySelectorAll('button[data-action=recordBtn]')
  console.log(recordBtns)
  
  recordBtns.forEach(recordBtn => recordBtn.addEventListener('click', () =>{
    console.log('in')
    setID(Number(recordBtn.id))
    _handlerStream()
  }))

    
  useEffect(()=>{
    if(!id){
      onClose()
      return
    }
    
    fetch(`${VITE_API_URL}questions/${id}`)
      .then( response =>{
        const data = response.json()
        return data
      }).then( data => {
        if(!data.id){
          onClose()
          return
        }

        setQuestion(data)
      })
  }, [id])
  
  

  const _handlerStream = async () => {
    onOpen()
    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: { exact: true }
        },
        video: {
          width: 1280, height: 720
        }
      })
      handleSuccess(newStream)
      setStream(newStream)
    } catch (e) {
      setErrorMessage('Permisos denegados')
    }
  }
  return (
    <Modal onClose={onClose} size='full' isOpen={isOpen}>
      <ModalContent display={'grid'} placeContent='center'>
        <Stack maxW={900}>
          <Box>
            <Button leftIcon={<ArrowBackIcon />} onClick={onClose}>Volver</Button>
          </Box>
          <Video {...{ stream }} />
          <ModalHeader>
              <Heading>{question?.title}</Heading>
              <Text>{question?.description}</Text>
          </ModalHeader>

        </Stack>
        <ModalFooter justifyContent={'space-between'}>
          <Button onClick={()=>setID(prevState => prevState - 1)}>Atras</Button>
          {errorMessage}
          <Button onClick={()=>setID(prevState => prevState + 1)}>Siguiente</Button>
        </ModalFooter>
      </ModalContent>

    </Modal>
  )
}

export default VideoQuestion