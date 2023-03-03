import {  Button, Card, CardBody, CardFooter, Heading, Image, Text } from '@chakra-ui/react'
import { QuestionType } from '../../config/types'
import play from '../../assets/play.svg'
import { useRef } from 'react'

const QuestionCard = ({ description, title, id }: QuestionType) => {
  const btn = useRef<HTMLButtonElement>(null)
  
  return (
    <Card  h='md' w='300px'>
      <CardBody bgColor='black' display={'flex'} alignItems={'flex-end'}>
        <Button data-action='recordBtn' id={`${id}`} bgPosition='center' bgRepeat='no-repeat' borderRadius='full' ref={btn} bg={'#C4C4C4'} p='0' >
          <Image src={play}/>
        </Button>
      </CardBody>
      <CardFooter display='block' textAlign='left' bg={'#C4C4C4'}>
        <Heading as='h4' size='x1'>{title}</Heading>
        <Text>{description}</Text>
      </CardFooter>
    </Card>
  )
}

export default QuestionCard