import React, { useState, useReducer } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Hidden from '@material-ui/core/Hidden'
import FormControl from '@material-ui/core/FormControl'
import FilledInput from '@material-ui/core/FilledInput'
import InputLabel from '@material-ui/core/InputLabel'
import Bookmark from '../content/Bookmark'
import Header from '../header/Header'
import Sidebar from '../sidebar/Sidebar'
import SidebarList from '../sidebar/SidebarList'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
// import Summary from '../content/Summary'

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
      padding: '24px 0 8px',
      display: 'grid',
      gap: '20px',
    },
    textField: {
      margin: theme.spacing(1),
    },
    buttonGroup: {
      padding: '16px 0',
      display: 'flex',
      justifyContent: 'flex-end',
    },
    cancelButton: {
      marginRight: '16px',
    },
    customSelect: {
      width: '100%',
    },
  }
})

const data = [
  {
    name: 'github-octodex',
    link: 'https://octodex.github.com',
    category: 'Github',
  },
  {
    name: 'mastering-markdown-github-guide',
    link: 'https://guides.github.com/features/mastering-markdown/',
    category: 'Github',
  },
  {
    name: 'github-high-scores',
    link: 'https://leereilly.net/github-high-scores/',
    category: 'Github',
  },
]

function bookmarkReducer(state, action) {
  switch (action.type) {
    case 'SET_BOOKMARKS':
      return [...state, action.payload]
    default:
      throw new Error('Invalid action')
  }
}

export default function Main() {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [state, dispatch] = useReducer(bookmarkReducer, data)

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
            {state.map(function (bookmark) {
              const { name } = bookmark
              return <Bookmark key={name} bookmark={bookmark} />
            })}
          </Grid>
          <Hidden mdDown>
            <Grid item xs={12} lg={6}>
              {/* Summary component needs more work */}
              {/* <Summary /> */}
              <BookmarkForm
                bookmarksCollection={state}
                setBookmarks={dispatch}
              />
            </Grid>
          </Hidden>
        </Grid>
      </main>
    </div>
  )
}

export function BookmarkForm(props) {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [link, setLink] = useState('')
  const [category, setCategory] = useState('')
  const { setBookmarks } = props

  function handleNameChange(event) {
    setName(event.target.value)
  }

  function handleLinkChange(event) {
    setLink(event.target.value)
  }

  function handleCategoryChange(event) {
    setCategory(event.target.value)
  }

  function submitBookmark(event) {
    event.preventDefault()
    setBookmarks({ type: 'SET_BOOKMARKS', payload: { name, link, category } })
    setName('')
    setLink('')
    setCategory('')
  }

  function clearBookmark(event) {
    event.preventDefault()
    setName('')
    setLink('')
    setCategory('')
  }

  return (
    <Paper className={classes.paper}>
      <Typography variant='h5'>Add new bookmark</Typography>
      <Typography color='textSecondary'>
        Enter the bookmark name, url, and category.
      </Typography>
      <div className={classes.textFieldGroup}>
        <FormControl fullWidth variant='filled' className={classes.margin}>
          <InputLabel htmlFor='bookmark-name'>Name</InputLabel>
          <FilledInput
            id='bookmark-name'
            value={name}
            onChange={handleNameChange}
          />
        </FormControl>
        <FormControl fullWidth variant='filled' className={classes.margin}>
          <InputLabel htmlFor='bookmark-link'>Link</InputLabel>
          <FilledInput
            id='bookmark-link'
            value={link}
            onChange={handleLinkChange}
          />
        </FormControl>
        <CustomSelect
          category={category}
          handleCategoryChange={handleCategoryChange}
        />
      </div>
      <div className={classes.buttonGroup}>
        <Button
          color='primary'
          className={classes.cancelButton}
          onClick={clearBookmark}
        >
          Clear
        </Button>
        <Button variant='contained' color='primary' onClick={submitBookmark}>
          Add bookmark
        </Button>
      </div>
    </Paper>
  )
}

export function CustomSelect(props) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const { category, handleCategoryChange } = props

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <FormControl variant='filled' className={classes.customSelect}>
      <InputLabel id='select-bookmark-input'>Category</InputLabel>
      <Select
        labelId='bookmark-category'
        id='bookmark-category'
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={category}
        onChange={handleCategoryChange}
      >
        <MenuItem value={'Personal'}>Personal</MenuItem>
        <MenuItem value={'Github'}>Github</MenuItem>
        <MenuItem value={'Important'}>Important</MenuItem>
        <MenuItem value={'Libraries'}>Libraries</MenuItem>
        <MenuItem value={'Tools'}>Tools</MenuItem>
        <MenuItem value={'Others'}>Others</MenuItem>
      </Select>
    </FormControl>
  )
}
