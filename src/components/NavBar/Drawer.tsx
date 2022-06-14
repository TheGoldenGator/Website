import React, { useState } from 'react'
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
const pages = ['Home', 'About']
const DrawerComp = () => {
  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          {pages.map((page, index) => (
            <ListItemButton key={index} href={(page === 'Home') ? '/' : '/about'}>
              <ListItemIcon>
                <ListItemText>{page}</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <IconButton
        sx={{ color: 'white', marginLeft: 'auto' }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon color="primary" />
      </IconButton>
    </React.Fragment>
  )
}

export default DrawerComp
