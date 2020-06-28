import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Bookmark from '../content/Bookmark'
import Header from '../header/Header'
import Sidebar from '../sidebar/Sidebar'
import SidebarList from '../sidebar/SidebarList'

const drawerWidth = 240

const useStyles = makeStyles(function (theme) {
  return {
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      marginTop: 64,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }
})

const data = [
  { name: 'github-octodex', url: 'https://octodex.github.com' },
  {
    name: 'mastering-markdown-github-guide',
    url: 'https://guides.github.com/features/mastering-markdown/',
  },
  {
    name: 'github-high-scores',
    url: 'https://leereilly.net/github-high-scores/',
  },
]

export default function Main(props) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  function handleDrawerOpen() {
    setOpen(true)
  }

  function handleDrawerClose() {
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />
      <Sidebar open={open} handleDrawerClose={handleDrawerClose}>
        <SidebarList />
      </Sidebar>

      <main className={clsx(classes.content, { [classes.contentShift]: open })}>
        {data.map(function (bookmark) {
          const { name } = bookmark
          return <Bookmark key={name} bookmark={bookmark} />
        })}
      </main>
    </div>
  )
}
