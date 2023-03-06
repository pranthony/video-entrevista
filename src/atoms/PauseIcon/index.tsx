import { IconProps, Icon } from '@chakra-ui/react'
import React from 'react'

function PauseIcon(iconProps: IconProps) {
  return (
    <Icon {...iconProps} viewBox="0 0 100 100" boxSize={10}>
      <path d="M74.026 88H25.974C18.256 88 12 81.744 12 74.026V25.974C12 18.256 18.256 12 25.974 12h48.052C81.744 12 88 18.256 88 25.974v48.052C88 81.744 81.744 88 74.026 88z" strokeMiterlimit="10" fill="#fff" strokeWidth="8" stroke="#333"/>
      <path d="M45.39 70H34.841c-.666 0-1.205-.54-1.205-1.205v-37.59c0-.666.54-1.205 1.205-1.205H45.39c.666 0 1.205.54 1.205 1.205v37.59c0 .665-.54 1.205-1.205 1.205z" fill="#333"/>
      <path d="M65.159 70H54.61c-.666 0-1.205-.54-1.205-1.205v-37.59c0-.666.54-1.205 1.205-1.205h10.549c.666 0 1.205.54 1.205 1.205v37.59c0 .665-.54 1.205-1.205 1.205z" fill="#333"/>

    </Icon>
  )
}

export default PauseIcon
