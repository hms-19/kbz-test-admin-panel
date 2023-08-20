import { Button } from '@mui/material'
import React from 'react'

const StartIconButton = ({text, icon, variant, color}) => {
  return (
    <Button variant={variant} startIcon={icon} color={color}>
      {text}
    </Button>
  )
}

export default StartIconButton