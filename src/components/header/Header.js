import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/ToolBar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'

const drawerWidth = 240

const useStyles = makeStyles(function (theme) {
  return {
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      widht: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
  }
})

export default function Header(props) {
  const { open, handleDrawerOpen } = props
  const classes = useStyles()

  return (
    <AppBar
      position='fixed'
      className={clsx(classes.appBar, { [classes.appBarShift]: open })}
    >
      <ToolBar>
        <IconButton
          aria-label='open drawer'
          color='inherit'
          edge='start'
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' noWrap>
          Awesome Bookmark
        </Typography>
      </ToolBar>
    </AppBar>
  )
}
