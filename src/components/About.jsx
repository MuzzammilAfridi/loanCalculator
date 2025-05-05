import { Box, Typography } from '@mui/material'
import React from 'react'

const About = () => {
  return (
    <div>
      <Box sx={{height:'90vh', width:'100vw', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <Typography sx={{textAlign:'center', fontSize:30, fontWeight:500}}>
        This is About page
      </Typography>
      </Box>
    </div>
  )
}

export default About
