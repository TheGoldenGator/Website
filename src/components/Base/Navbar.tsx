import { Box, Tabs, Tab, Grid } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/tgg_logo.png'

interface LinkTabProps {
  label?: string
  href?: string
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault()
      }}
      {...props}
    />
  )
}

const tabs: string[] = ['Streams', 'Members', 'Settings', 'About']

type NavbarProps = {
  value: number
  setValue: React.Dispatch<React.SetStateAction<number>>
  settingsDialogOpen: boolean
  setSettingsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar = ({
  value,
  setValue,
  settingsDialogOpen,
  setSettingsDialogOpen,
}: NavbarProps) => {
  let navigate = useNavigate()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (tabs[newValue].toLowerCase() === 'streams') {
      localStorage.setItem('tab', '0')
      setValue(0)
      navigate('/')
    } else {
      localStorage.setItem('tab', newValue.toString())
      setValue(newValue)
      navigate(tabs[newValue].toLowerCase())
    }
  }

  return (
    <Box sx={{ width: '100%', paddingBottom: 1 }}>
      <Grid container alignItems="center">
        <Grid>
          <img src={logo} alt="logo" style={{ width: '150px' }} />
        </Grid>
        <Grid sx={{ marginLeft: 'auto' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="nav tabs example"
          >
            {tabs.map((v, i) => (
              <LinkTab label={v} key={i} />
            ))}
          </Tabs>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Navbar
