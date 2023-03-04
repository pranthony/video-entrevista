import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Button, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { VITE_API_URL } from '../../config'
import { QuestionType } from '../../config/types'
import Video from '../../components/video'
import { Link, useParams } from 'react-router-dom'
import { useFetch } from '../../hook/useFetch'

const VideoQuestion = () => {
  const { questionId } = useParams()
  const { data } = useFetch<QuestionType>(`${VITE_API_URL}questions/${questionId}`)
    
  return (
    <Stack display={'grid'} placeContent='center'>
      <Stack maxW={900}>
        <Link to='/'>
          <Button leftIcon={<ArrowBackIcon />} >Volver</Button>
        </Link>
        <Video />
        <VStack>
            <Heading>{data?.title}</Heading>
            <Text>{data?.description}</Text>
        </VStack>
      </Stack>
      <HStack justifyContent={'space-between'}>
        <Link to={`/video/${Number(questionId)-1}`}>
          <Button >Atras</Button>
        </Link>
        <Link to={`/video/${Number(questionId)+1}`}>
          <Button >Siguiente</Button>
        </Link>
      </HStack>
    </Stack>
  )
}

export default VideoQuestion