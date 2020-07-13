import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Hidden from '@material-ui/core/Hidden'
import Bookmark from '../content/Bookmark'
import Header from '../header/Header'
import Sidebar from '../sidebar/Sidebar'
import SidebarList from '../sidebar/SidebarList'
import { CustomSelect } from '../header/FormDialog'

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
    gridContainer: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(3),
      paddingTop: theme.spacing(2),
      paddingBottom: 0,
    },
    textFieldGroup: {
      padding: '8px 0',
    },
    buttonGroup: {
      padding: '8px 0',
      display: 'flex',
      justifyContent: 'flex-end',
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

export default function Main() {
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
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            {data.map(function (bookmark) {
              const { name } = bookmark
              return <Bookmark key={name} bookmark={bookmark} />
            })}
          </Grid>
          <Hidden mdDown>
            <Grid item xs={12} lg={6}>
              <BookmarkForm />
            </Grid>
          </Hidden>
        </Grid>
      </main>
    </div>
  )
}

function BookmarkForm() {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <Typography variant='h6' gutterBottom>
        Add new bookmark
      </Typography>
      <div className={classes.textFieldGroup}>
        <Typography variant='subtitle1' color='textSecondary' gutterBottom>
          Enter the bookmark name, url, and category.
        </Typography>
        <TextField
          margin='dense'
          id='bookmarkName'
          label='Bookmark name'
          type='text'
          variant='filled'
          fullWidth
        />
        <TextField
          margin='dense'
          id='bookmarkUrl'
          label='Bookmark URL'
          type='text'
          variant='filled'
          fullWidth
        />
        <CustomSelect />
      </div>
      <div className={classes.buttonGroup}>
        <Button color='primary'>Cancel</Button>
        <Button color='primary'>Add bookmark</Button>
      </div>
    </Paper>
  )
}
