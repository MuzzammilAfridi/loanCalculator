import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import {Link} from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div>
        <Box sx={{display:'flex',flexDirection:'column', alignItems:'center', justifyContent:'center', width:'100vw', height:'90vh', px:2, textAlign:'center'}}>
        <Typography sx={{fontSize:30, fontWeight:500}}> Something went wrong in the application.</Typography>
        <Button sx={{mt:2}} component={Link} to="/" variant="outlined" color="primary">Go Home</Button>
        </Box>
      
    </div>
  )
}

export default ErrorPage
