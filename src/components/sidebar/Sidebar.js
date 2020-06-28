import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

const drawerWidth = 240

const useStyles = makeStyles(function (theme) {
  return {
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // Necessary for content to be below AppBar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
  }
})

export default function Sidebar(props) {
  const { open, handleDrawerClose } = props
  const classes = useStyles()
  const theme = useTheme()

  return (
    <Drawer
      variant='persistent'
      anchor='left'
      open={open}
      classes={{ paper: classes.drawPaper }}
      className={classes.drawer}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      {props.children}
    </Drawer>
  )
}
