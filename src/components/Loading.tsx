import { Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import styled from 'styled-components'
import '../index.css'
import vincentSpin from '../assets/loading/vincentSpin.gif'
import racJAM from '../assets/loading/racJAM.webp'
import crumpWobble from '../assets/loading/crumpWobble.gif'
import roflgatorSmile from '../assets/loading/roflgatorSmile.png'

const Dots = styled.span`
  &::after {
    display: inline-block;
    animation: ellipsis 4s infinite;
    content: '.';
    width: 1em;
    text-align: left;
  }
  @keyframes ellipsis {
    25% {
      content: '.';
    }
    50% {
      content: '..';
    }
    75% {
      content: '...';
    }
    100% {
      content: '';
    }
  }
`

const Messages = [
  {
    img: racJAM,
    text: 'Jamming',
  },
  {
    img: vincentSpin,
    text: 'Spinning',
  },
  {
    img: crumpWobble,
    text: 'Wobbling',
  },
  {
    img: roflgatorSmile,
    text: 'Smiling',
  },
]

type LoadingProps = {
  variant: 'center' | 'left'
}

export const Loading = ({ variant }: LoadingProps) => {
  const random = Messages[Math.floor(Math.random() * Messages.length)]
  return variant === 'center' ? (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Stack direction="column" spacing={1}>
        <img src={random.img} alt="vincentSpin" />
        <Typography
          variant="h5"
          className="loading-dots"
          sx={{ paddingLeft: 1 }}
        >
          <Dots>{random.text}</Dots>
        </Typography>
      </Stack>
    </Box>
  ) : (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        verticalAlign: 'center',
        alignItems: 'center',
        padding: 1,
      }}
    >
      <img src={random.img} alt="vincentSpin" />
      <Typography variant="h5" className="loading-dots" sx={{ paddingLeft: 1 }}>
        <Dots>{random.text}</Dots>
      </Typography>
    </Box>
  )
}
