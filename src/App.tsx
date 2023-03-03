import { useEffect, useState } from 'react'
import './App.css'
import { Container, Heading, HStack, Stack } from '@chakra-ui/react'
import QuestionCard from './components/questionCard'
import { QuestionType } from './config/types'
import { VITE_API_URL } from './config'
import VideoQuestion from './components/videoQuestion'

function App() {
  const [ questions, setQuestions ] = useState<QuestionType[]>([])
  useEffect(()=>{
    fetch(`${VITE_API_URL}questions`)
      .then( response =>{
        const data = response.json()
        return data
      }).then( data => {
        setQuestions(data)
      })
  }, [])
  

  return (
    <Stack as={'section'}  minH={'100vh'}>
      <Heading as={'h1'}>Video Cuestionario</Heading>
      
      <HStack minH={'90vh'} flexWrap='wrap' gap={4}>
        { 
          questions && questions?.map((question)=>{
            return <QuestionCard {...question} key={`card-${question.id}`}/>
          })
        }
        {
          questions && <VideoQuestion />
        }
      </HStack>
    </Stack>
  )
}

export default App
