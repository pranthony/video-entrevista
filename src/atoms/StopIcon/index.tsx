import { IconProps, Icon } from '@chakra-ui/react'
import React from 'react'

function StopIcon(iconProps: IconProps) {
  return (
    <Icon {...iconProps} viewBox="0 0 100 100" boxSize={10}>
      <circle xmlns="http://www.w3.org/2000/svg" cx="50" cy="50" r="37" strokeMiterlimit="10" fill="#fff" strokeWidth="8" stroke="#333"/>
      <path xmlns="http://www.w3.org/2000/svg" d="M65.891 69H34.109A3.11 3.11 0 0 1 31 65.891V34.109A3.11 3.11 0 0 1 34.109 31h31.782A3.11 3.11 0 0 1 69 34.109v31.782A3.11 3.11 0 0 1 65.891 69z" fill="#333"/>
    </Icon>
  )
}

export default StopIcon