import { ArrowBackIcon } from '@chakra-ui/icons'
import { Button, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { BASE_URL, VITE_API_URL } from '../../config'
import { QuestionType } from '../../config/types'
import Video from '../../components/video'
import { Link, useParams } from 'react-router-dom'
import { useFetch } from '../../hook/useFetch'

const VideoQuestion = () => {
  const { questionId } = useParams()
  const btnSlide = useRef<HTMLButtonElement>(null)
  const { fetchData, setFetchData } = useFetch<QuestionType>(`${VITE_API_URL}questions/${questionId}`)

  useEffect(()=>{
    if(!questionId){
      return
    }
    setFetchData()
  }, [questionId])

  return (
    <Stack display={'grid'} placeContent='center' minH={'100vh'}>
      <Stack maxW={900}>
        <Link to='/'>
          <Button leftIcon={<ArrowBackIcon />} >Volver</Button>
        </Link>
          <Video videoId={questionId}/>
        <VStack>
          <Heading>{fetchData?.title}</Heading>
          <Text>{fetchData?.description}</Text>
        </VStack>
      </Stack>
      <HStack justifyContent={'space-between'}>
        <Link to={`/video/${Number(questionId) - 1}`}>
          <Button ref={btnSlide}>Atras</Button>
        </Link>
        <Link to={`/video/${Number(questionId) + 1}`}>
          <Button ref={btnSlide}>Siguiente</Button>
        </Link>
      </HStack>
    </Stack>
  )
}

export default VideoQuestion