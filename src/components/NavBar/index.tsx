import React from 'react'
import {
  AppBar,
  Tab,
  Tabs,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import DrawerComp from './Drawer'
import { Link } from 'react-router-dom'
import TGGLogo from '../../images/tgg_logo.png'
import '../../styles/index.css'

const Header = () => {
  const theme = useTheme()
  const isMatch = useMediaQuery(theme.breakpoints.down('md'))
  const [tabValue, setTabValue] = React.useState(
    localStorage.getItem('route') !== null
      ? localStorage.getItem('route')
      : '/',
  )

  return (
    <React.Fragment>
      <AppBar sx={{ marginBottom: 3 }}>
        <Toolbar>
          <div className="logo">
            <Link to={{ pathname: '/' }}>
              <img className="logo" src={TGGLogo} alt="logo" />
            </Link>
          </div>
          {isMatch ? (
            <>
              <DrawerComp />
            </>
          ) : (
            <>
              <Tabs
                sx={{ marginLeft: 'auto' }}
                indicatorColor="primary"
                textColor="inherit"
                value={tabValue}
                onChange={(e, value) => {
                  localStorage.setItem('route', value)
                  setTabValue(value)
                }}
              >
                <Tab label="Home" value="/" to="/" component={Link} />
                <Tab
                  label="About"
                  value="/about"
                  to="/about"
                  component={Link}
                />
                <Tab
                  label="Tools"
                  value="/tools"
                  to="/tools"
                  component={Link}
                />
              </Tabs>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

export default Header
