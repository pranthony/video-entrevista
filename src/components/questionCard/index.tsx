import { Box, Card, CardBody, CardFooter, Heading, IconButton, position, Text } from '@chakra-ui/react'
import { QuestionType } from '../../config/types'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PlayIcon from '../../atoms/PlayIcon'

const QuestionCard = ({ description, title, id }: QuestionType) => {
  const [img, setImg] = useState<string | null>()

  useEffect(() => {
    const videoImg = localStorage.getItem(String(id))
    setImg(videoImg)
  }, [])

  return (
    <Card minH='sm' w='300px' overflow={'hidden'}>
      <CardBody 
        bgColor='black' 
        display={'flex'} 
        justifyContent={'flex-end'} 
        alignItems='center'
        flexDirection={'column'} 
        gap={2} p='0'
      >
        {
          img && <video src={img} style={{position: 'absolute', maxWidth:'200%'}} width='550px'></video>
        }
        <Box width={'100%'}>
          <Link to={`/video/${id}`} >
            <IconButton 
              aria-label='reccord-video' 
              icon={<PlayIcon/>}
              bg={'#C4C4C4'}
              borderRadius='full'
              m={4}
            /> 
          </Link>
        </Box>
        
      </CardBody>
      <CardFooter display='block' textAlign='left' bg={'#C4C4C4'}>
        <Heading as='h4' size='x1'>{title}</Heading>
        <Text>{description}</Text>
      </CardFooter>
    </Card>
  )
}

export default QuestionCard