import { IconProps, Icon } from '@chakra-ui/react'
import React from 'react'

function RecordIcon(iconProps: IconProps) {
  return (
    <Icon {...iconProps} viewBox="0 0 100 100" boxSize={10}>
      <path d="M74.026 88H25.974C18.256 88 12 81.744 12 74.026V25.974C12 18.256 18.256 12 25.974 12h48.052C81.744 12 88 18.256 88 25.974v48.052C88 81.744 81.744 88 74.026 88z" strokeMiterlimit="10" fill="#fff" strokeWidth="8" stroke="#333" />
      <circle cx="50" cy="50" r="21" fill="#333" />
    </Icon>
  )
}

export default RecordIcon