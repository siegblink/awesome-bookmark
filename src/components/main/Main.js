import { useState, useEffect, useReducer } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Snackbar from '@material-ui/core/Snackbar'
import Header from '../header/Header'
import Sidebar from '../sidebar/Sidebar'
import SidebarList from '../sidebar/SidebarList'
import RightSideDrawer from '../sidebar/RightSideDrawer'
import AddBookmarkButton from '../header/AddBookmarkButton'
import BookmarkForm from '../form/BookmarkForm'
import Alert from '../form/Alert'
import PersonalBookmarks from '../bookmarks/PersonalBookmarks'
import GithubBookmarks from '../bookmarks/GithubBookmarks'
import ImportantBookmarks from '../bookmarks/ImportantBookmarks'
import LibraryBookmarks from '../bookmarks/LibraryBookmarks'
import ToolBookmarks from '../bookmarks/ToolBookmarks'
import OtherBookmarks from '../bookmarks/OtherBookmarks'
import dummyData from '../../db'

/** The 'useStyles' variable houses all the CSS styles that will be used by the main component. */
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
  }
})

/**
 * This is a 'Reducer' function that will do all of the state transformation and manipulation.
 * @param state {object} - This is the accumulated data object used by all the connected components.
 * @param action {object} - This is the object that represents the kind of transformation will be done to the state.
 */
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

/** Declare 'Initial bookmark' data. */
const initialBookmarkData = { name: '', link: '', category: '' }

/** This is the main component that renders all the major components. */
export default function Main() {
  // Get the styles data from 'useStyles'.
  const classes = useStyles()

  // Declare local state.
  const [open, setOpen] = useState(false)
  const [openEditDrawer, setOpenEditDrawer] = useState(false)
  const [editedBookmark, setEditedBookmark] = useState(initialBookmarkData)
  const [currentBookmarkName, setCurrentBookmarkName] = useState('')
  const [currentBookmarkLink, setCurrentBookmarkLink] = useState('')
  const [currentBookmarkCategory, setCurrentBookmarkCategory] = useState('')
  const [state, dispatch] = useReducer(bookmarkReducer, dummyData)
  const [openSnackbar, setOpenSnackbar] = useState(false)

  /** Declare side effect that sets the 'Current bookmark category' state. */
  useEffect(function () {
    const firstBookmarkEntry = dummyData[0]
    setCurrentBookmarkCategory(firstBookmarkEntry.category)
  }, [])

  /** Event handler for opening the 'Drawer' (Left sidebar) component. */
  function openDrawer() {
    setOpen(true)
  }

  /** Event handler for closing the 'Drawer' (Left sidebar) component. */
  function closeDrawer() {
    setOpen(false)
  }

  /** Event handler for opening the 'Right-side drawer' component. */
  function openRightSideDrawer(bookmarkName, bookmarkLink) {
    setCurrentBookmarkName(bookmarkName)
    setCurrentBookmarkLink(bookmarkLink)
    setOpenEditDrawer(true)
  }

  /** Event handler for closing the 'Right-side drawer' component. */
  function closeRightSideDrawer() {
    setOpenEditDrawer(false)
  }

  /** Event handler for saving an edited bookmark. */
  function saveEditedBookmark(event) {
    const { name, value } = event.target
    setEditedBookmark(function (previouBookmarkData) {
      return {
        ...previouBookmarkData,
        [name]: value,
      }
    })
  }

  /** Event handler for submitting bookmark data. */
  function submitEditedBookmark(event) {
    event.preventDefault()
    console.log(editedBookmark)
    closeRightSideDrawer()
  }

  /** Event handler for closing 'Snackbar' component. */
  function closeSnackbar(event, reason) {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  return (
    <div className={classes.root}>
      {/* CSS reset component */}
      <CssBaseline />

      {/* Header */}
      <Header open={open} handleDrawerOpen={openDrawer}>
        <Hidden lgUp>
          <AddBookmarkButton />
        </Hidden>
      </Header>

      {/* Left sidebar */}
      <Sidebar open={open} handleDrawerClose={closeDrawer}>
        <SidebarList isSidebarOpen={open} />
      </Sidebar>

      {/* Right sidebar (Hidden by default) */}
      <RightSideDrawer
        open={openEditDrawer}
        closeDrawer={closeRightSideDrawer}
        editedBookmark={editedBookmark}
        setEditedBookmark={saveEditedBookmark}
        currentBookmarkName={currentBookmarkName}
        currentBookmarkLink={currentBookmarkLink}
        currentBookmarkCategory={currentBookmarkCategory}
        submitEditedBookmark={submitEditedBookmark}
      />

      {/* Bookmark list and bookmark form */}
      <main className={classes.content}>
        <div className={classes.contentAdjustment}></div>
        <Grid container spacing={3}>
          {/* Bookmark list */}
          <Grid item xs={12} lg={6}>
            <Switch>
              <Route exact path='/'>
                <Redirect to='/personal' />
              </Route>
              <Route path='/personal'>
                <PersonalBookmarks
                  data={state}
                  dispatch={dispatch}
                  openRightSideDrawer={openRightSideDrawer}
                />
              </Route>
              <Route path='/github'>
                <GithubBookmarks
                  data={state}
                  dispatch={dispatch}
                  openRightSideDrawer={openRightSideDrawer}
                />
              </Route>
              <Route path='/important'>
                <ImportantBookmarks
                  data={state}
                  dispatch={dispatch}
                  openRightSideDrawer={openRightSideDrawer}
                />
              </Route>
              <Route path='/libraries'>
                <LibraryBookmarks
                  data={state}
                  dispatch={dispatch}
                  openRightSideDrawer={openRightSideDrawer}
                />
              </Route>
              <Route path='/tools'>
                <ToolBookmarks
                  data={state}
                  dispatch={dispatch}
                  openRightSideDrawer={openRightSideDrawer}
                />
              </Route>
              <Route path='/others'>
                <OtherBookmarks
                  data={state}
                  dispatch={dispatch}
                  openRightSideDrawer={openRightSideDrawer}
                />
              </Route>
            </Switch>
          </Grid>

          {/* Bookmark form */}
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

      {/* Snackbar notification (Hidden by default) */}
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
