import { useEffect, useState } from 'react'
import './App.css'
import { Heading, HStack, Stack } from '@chakra-ui/react'
import QuestionCard from './components/questionCard'
import { QuestionType } from './config/types'
import { VITE_API_URL } from './config'
import VideoQuestion from './components/videoQuestion'

function App() {
  const [ questions, setQuestions ] = useState<QuestionType[]>([])
  const [ load, setLoad ] = useState(false)
  useEffect(()=>{
    fetch(`${VITE_API_URL}questions`)
      .then( response =>{
        const data = response.json()
        return data
      }).then( data => {
        setQuestions(data)
      })
  }, [])

  useEffect(()=>{
    if(questions)
      setTimeout(()=>{
        console.log('espera')
        setLoad(true)
      }, 1000)
  }, [questions])

  return (
    <Stack as={'section'}  minH={'100vh'} >
      <Heading as={'h1'}>Video Cuestionario</Heading>
      <HStack minH={'90vh'} flexWrap='wrap' gap={4} justifyContent='center'>
        { 
          questions && questions?.map((question)=>{
            return <QuestionCard {...question} key={`card-${question.id}`}/>
          })
          
        }
      </HStack>
      { load && <VideoQuestion />}
      
    </Stack>
  )
}

export default App
