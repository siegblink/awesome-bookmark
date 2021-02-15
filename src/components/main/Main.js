import { useState, useEffect, useReducer } from 'react'
import { Route, Switch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Snackbar from '@material-ui/core/Snackbar'
import CollectionsBookmarkRoundedIcon from '@material-ui/icons/CollectionsBookmarkRounded'
import Bookmark from '../content/Bookmark'
import Header from '../header/Header'
import Sidebar from '../sidebar/Sidebar'
import SidebarList from '../sidebar/SidebarList'
import RightSideDrawer from '../sidebar/RightSideDrawer'
import AddBookmarkButton from '../header/AddBookmarkButton'
import BookmarkForm from '../form/BookmarkForm'
import Alert from '../form/Alert'
import dummyData from '../../db'

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
      // Necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    emptyBookmarkContainer: {
      alignSelf: 'center',
      display: 'grid',
      placeContent: 'center',
      placeItems: 'center',
    },
    bookmarkIcon: {
      fontSize: '17rem',
      color: theme.palette.text.secondary,
    },
  }
})

function bookmarkReducer(state, action) {
  switch (action.type) {
    case 'SET_BOOKMARKS':
      return [...state, action.payload]
    case 'DELETE_BOOKMARK':
      return state.filter((bookmark) => bookmark.name !== action.payload.name)
    default:
      throw new Error('Invalid action')
  }
}

const initialBookmarkData = { name: '', link: '', category: '' }

export default function Main() {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [openEditDrawer, setOpenEditDrawer] = useState(false)
  const [editedBookmark, setEditedBookmark] = useState(initialBookmarkData)
  const [currentBookmarkName, setCurrentBookmarkName] = useState('')
  const [currentBookmarkLink, setCurrentBookmarkLink] = useState('')
  const [currentBookmarkCategory, setCurrentBookmarkCategory] = useState('')
  const [state, dispatch] = useReducer(bookmarkReducer, dummyData)
  const [openSnackbar, setOpenSnackbar] = useState(false)

  useEffect(function () {
    const firstBookmarkEntry = dummyData[0]
    setCurrentBookmarkCategory(firstBookmarkEntry.category)
  }, [])

  function handleDrawerOpen() {
    setOpen(true)
  }

  function handleDrawerClose() {
    setOpen(false)
  }

  function handleOpenEditDrawer(bookmarkName, bookmarkLink) {
    setCurrentBookmarkName(bookmarkName)
    setCurrentBookmarkLink(bookmarkLink)
    setOpenEditDrawer(true)
  }

  function handleCloseEditDrawer() {
    setOpenEditDrawer(false)
  }

  function handleEditedBookmark(event) {
    const { name, value } = event.target
    setEditedBookmark(function (previouBookmarkData) {
      return {
        ...previouBookmarkData,
        [name]: value,
      }
    })
  }

  function handleSubmitEditedBookmark(event) {
    event.preventDefault()
    console.log(editedBookmark)
    handleCloseEditDrawer()
  }

  function closeSnackbar(event, reason) {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header open={open} handleDrawerOpen={handleDrawerOpen}>
        <Hidden lgUp>
          <AddBookmarkButton />
        </Hidden>
      </Header>
      <Sidebar open={open} handleDrawerClose={handleDrawerClose}>
        <SidebarList isSidebarOpen={open} />
      </Sidebar>
      <RightSideDrawer
        open={openEditDrawer}
        closeDrawer={handleCloseEditDrawer}
        editedBookmark={editedBookmark}
        setEditedBookmark={handleEditedBookmark}
        currentBookmarkName={currentBookmarkName}
        currentBookmarkLink={currentBookmarkLink}
        currentBookmarkCategory={currentBookmarkCategory}
        submitEditedBookmark={handleSubmitEditedBookmark}
      />
      <main className={classes.content}>
        <div className={classes.contentAdjustment}></div>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            {!state.length ? (
              <div className={classes.emptyBookmarkContainer}>
                <CollectionsBookmarkRoundedIcon
                  fontSize='large'
                  className={classes.bookmarkIcon}
                />
                <Typography variant='h5'>Add bookmarks now</Typography>
                <Typography color='textSecondary'>
                  There are no available bookmarks to display.
                </Typography>
              </div>
            ) : (
              <Switch>
                <Route exact path='/personal'>
                  {state.map(function (bookmark) {
                    const { name } = bookmark
                    return (
                      <Bookmark
                        key={name}
                        bookmark={bookmark}
                        openEditDrawer={handleOpenEditDrawer}
                        dispatch={dispatch}
                      />
                    )
                  })}
                </Route>
                <Route path='/github'>
                  <div>Github</div>
                </Route>
                <Route path='/important'>
                  <div>Important</div>
                </Route>
                <Route path='/libraries'>
                  <div>Libraries</div>
                </Route>
                <Route path='/tools'>
                  <div>Tools</div>
                </Route>
                <Route path='/others'>
                  <div>Others</div>
                </Route>
              </Switch>
            )}
          </Grid>
          <Hidden mdDown>
            <Grid item xs={12} lg={6}>
              <BookmarkForm
                bookmarksCollection={state}
                setBookmarks={dispatch}
                setOpenSnackbar={setOpenSnackbar}
              />
            </Grid>
          </Hidden>
        </Grid>
      </main>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={closeSnackbar}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Alert onClose={closeSnackbar} severity='success'>
          Successfully added new bookmark.
        </Alert>
      </Snackbar>
    </div>
  )
}
