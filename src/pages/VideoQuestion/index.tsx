import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Button, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { VITE_API_URL } from '../../config'
import { QuestionType } from '../../config/types'
import Video from '../../components/video'
import { Link, useParams } from 'react-router-dom'
import { useFetch } from '../../hook/useFetch'

interface TypeVidoStored {
  id: number,
  video: string | null
}

const VideoQuestion = () => {
  const { questionId } = useParams()
  const [nextId, setNextId] = useState<number>()
  const btnSlide = useRef<HTMLButtonElement>(null)
  const { fetchData, setFetchData } = useFetch<QuestionType>(`${VITE_API_URL}questions/${questionId}`)
  const { fetchData: questions } = useFetch<QuestionType[]>(`${VITE_API_URL}questions`)

  const createQuestonsMap = () => {
    const videoQuestions: TypeVidoStored[] = []
    questions?.map(({ id }: QuestionType) => {
      videoQuestions.push({ id, video: localStorage.getItem(`${id}`) })
    })
    const avaible = videoQuestions?.filter(({ video, id }: TypeVidoStored) => !video && id !== Number(questionId))

    if (!avaible.length) {
      setNextId(Number(questionId) + 1)
      return
    }

    setNextId(avaible[0].id)
  }

  useEffect(() => {
    if (!questionId) {
      return
    }
    setFetchData()
    if (!questions) {
      return
    }
    createQuestonsMap()
  }, [questionId, questions])

  return (
    <Stack display={'grid'} placeContent='center' minH={'100vh'}>
      <Stack maxW={900}>
        <Box>
          <Link to='/'>
            <Button leftIcon={<ArrowBackIcon />} >Volver</Button>
          </Link>
        </Box>
        <Video videoId={questionId} />
        <VStack>
          <Heading>{fetchData?.title}</Heading>
          <Text>{fetchData?.description}</Text>
        </VStack>
      </Stack>
      <HStack justifyContent={'space-between'}>
        {
          (questionId && Boolean(Number(questionId) - 1)) &&
          <Link to={`/video/${Number(questionId) - 1}`}>
            <Button ref={btnSlide}>Atras</Button>
          </Link>
        }
        {
          (questions && Number(questionId) === questions?.length) ?
            <Link to='/'>
              <Button>Terminar</Button>
            </Link>
            : <Link to={`/video/${nextId}`}>
              <Button ref={btnSlide}>Siguiente</Button>
            </Link>
        }
      </HStack>

    </Stack>
  )
}

export default VideoQuestion