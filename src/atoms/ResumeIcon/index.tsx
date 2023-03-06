import { IconProps, Icon } from '@chakra-ui/react'
import React from 'react'

function ResumeIcon(iconProps: IconProps) {
  return (
    <Icon {...iconProps} viewBox="0 0 100 100" boxSize={10}>
      <path xmlns="http://www.w3.org/2000/svg" d="M74.026 88H25.974C18.256 88 12 81.744 12 74.026V25.974C12 18.256 18.256 12 25.974 12h48.052C81.744 12 88 18.256 88 25.974v48.052C88 81.744 81.744 88 74.026 88z" strokeMiterlimit="10" fill="#fff" strokeWidth="8" stroke="#333"/>
      <path xmlns="http://www.w3.org/2000/svg" d="M73.265 51.254l-35.594 20.55A1.447 1.447 0 0 1 35.5 70.55v-41.1a1.448 1.448 0 0 1 2.171-1.254l35.594 20.55c.965.558.965 1.95 0 2.508z" fill="#333"/>
    </Icon>
  )
}

export default ResumeIcon