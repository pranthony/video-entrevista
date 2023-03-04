import { Heading, HStack, Stack } from '@chakra-ui/react'
import QuestionCard from '../../components/questionCard'
import { VITE_API_URL } from '../../config'
import { QuestionType } from '../../config/types'
import { useFetch } from '../../hook/useFetch'

const QuestionList = () => {
  const { data } = useFetch<QuestionType[]>(`${VITE_API_URL}questions`)

  return (
    <Stack as={'section'} minH={'100vh'} >
      <Heading as={'h1'}>Video Cuestionario</Heading>
      <HStack
        minH={'90vh'}
        flexWrap='wrap'
        gap={4}
        justifyContent='center'
      >
        {
          data && data?.map((question) => <QuestionCard
            {...question}
            key={`card-${question.id}`}
          />)
        }
      </HStack>
    </Stack>
  )
}

export default QuestionList