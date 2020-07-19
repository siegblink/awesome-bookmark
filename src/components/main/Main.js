import React, { useState } from 'react'
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

const useStyles = makeStyles(function (theme) {
  return {
    root: {
      display: 'flex',
      flex: 1,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    contentAdjustment: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    paper: {
      padding: theme.spacing(3),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(1),
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
      <main className={classes.content}>
        <div className={classes.contentAdjustment}></div>
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
        <Typography
          variant='subtitle1'
          color='textSecondary'
          style={{ marginBottom: 16 }}
        >
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
        <Button color='primary' style={{ marginRight: '16px' }}>
          Cancel
        </Button>
        <Button variant='contained' color='primary'>
          Add bookmark
        </Button>
      </div>
    </Paper>
  )
}
