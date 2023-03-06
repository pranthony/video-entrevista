import { Heading, HStack, Stack } from '@chakra-ui/react'
import QuestionCard from '../../components/questionCard'
import { VITE_API_URL } from '../../config'
import { QuestionType } from '../../config/types'
import { useFetch } from '../../hook/useFetch'

const QuestionList = () => {
  const { fetchData } = useFetch<QuestionType[]>(`${VITE_API_URL}questions`)

  return (
    <Stack
      as={'section'}
      display={'grid'}
      placeContent={'center'}
      minH={'100vh'} gap={4} p={4} m={4}
    >
      <Heading as={'h1'} textAlign={'center'} >Video Cuestionario</Heading>
      <HStack
        minH={'80vh'}
        flexWrap='wrap'
        gap={4}
        justifyContent='center'
      >
        {
          fetchData && fetchData?.map((question) => <QuestionCard
            {...question}
            key={`card-${question.id}`}
          />)
        }
      </HStack>
    </Stack>
  )
}

export default QuestionList