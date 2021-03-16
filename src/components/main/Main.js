import { useState, useEffect, useReducer } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import clsx from 'clsx'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Snackbar from '@material-ui/core/Snackbar'
import Header from '../header/Header'
import Sidebar from '../sidebar/Sidebar'
import SidebarList from '../sidebar/SidebarList'
import LeftSideDrawer from '../sidebar/LeftSideDrawer'
import RightSideDrawer from '../sidebar/RightSideDrawer'
import AddBookmarkButton from '../header/AddBookmarkButton'
import SearchButton from '../header/SearchButton'
import BookmarkForm from '../form/BookmarkForm'
import Alert from '../form/Alert'
import BookmarkList from '../bookmarks/BookmarkList'
import dummyData from '../../db'
import { BookmarkProvider } from '../../context'
import { bookmarkReducer } from '../../reducers'

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
    adjustedContentWidth: {
      width: 'calc(100% - 80px)',
    },
    spacer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // Necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    contentGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1319px 1fr',
      gridTemplateRows: 'auto 1fr',
    },
    spacerGridPosition: {
      gridColumn: '2/3',
      gridRow: '1/2',
    },
    bookmarkContainer: {
      minWidth: '1176px',
      gridColumn: '2/3',
      gridRow: '2/3',
    },
    gridItems: {
      display: 'grid',
      justifyContent: 'center',
    },
  }
})

/** Declare 'Initial bookmark' data. */
const initialBookmarkData = { name: '', link: '', category: '' }

/** This is the main component that renders all the major components. */
export default function Main() {
  // Get the styles data from 'useStyles'.
  const classes = useStyles()

  // Get the 'Theme' data from 'useTheme'.
  const theme = useTheme()

  // Get the 'Media query' data from 'useMediaQuery'.
  const isExtraSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const isMedium = useMediaQuery(theme.breakpoints.down('md'))
  const isExtraLarge = useMediaQuery(theme.breakpoints.up('lg'))

  // Declare variable to check if the viewport is from a 'laptop' screen.
  // const isLapTopView = useMediaQuery('(max-width:1440px)')

  // Declare local state.
  const [open, setOpen] = useState(false)
  const [openEditDrawer, setOpenEditDrawer] = useState(false)
  const [editedBookmark, setEditedBookmark] = useState(initialBookmarkData)
  const [currentBookmarkName, setCurrentBookmarkName] = useState('')
  const [currentBookmarkLink, setCurrentBookmarkLink] = useState('')
  const [currentBookmarkCategory, setCurrentBookmarkCategory] = useState('')
  const [state, dispatch] = useReducer(bookmarkReducer, dummyData)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [errorSnackbar, setErrorSnackbar] = useState(false)
  const [pathname, setPathname] = useState('personal')

  /** Declare side effect that sets the 'Current bookmark category' state. */
  useEffect(function () {
    const firstBookmarkEntry = dummyData['personal']
    setCurrentBookmarkCategory(firstBookmarkEntry.category)
  }, [])

  /**
   * Event handler for setting the 'pathname' local state.
   * @param {string} pathname - The 'pathname' based on the window 'location' object.
   */
  function updatePathname(pathname) {
    setPathname(pathname)
  }

  /** Event handler for opening the 'Drawer' (Left sidebar) component. */
  function openDrawer() {
    setOpen(true)
  }

  /** Event handler for closing the 'Drawer' (Left sidebar) component. */
  function closeDrawer() {
    setOpen(false)
  }

  /**
   * Event handler for opening the 'Right-side drawer' component.
   * @param {object} bookmark - The existing bookmark data.
   */
  function openRightSideDrawer({ name, link, category }) {
    setCurrentBookmarkName(name)
    setCurrentBookmarkLink(link)
    setCurrentBookmarkCategory(category)
    setOpenEditDrawer(true)
  }

  /** Event handler for closing the 'Right-side drawer' component. */
  function closeRightSideDrawer() {
    setOpenEditDrawer(false)
  }

  /**
   * Event handler for saving an edited bookmark.
   * @param {object} event - The event object provided by the browser API.
   */
  function saveEditedBookmark(event) {
    const { name, value } = event.target
    setEditedBookmark(function (previouBookmarkData) {
      return {
        ...previouBookmarkData,
        [name]: value,
      }
    })
  }

  /**
   * Event handler for submitting bookmark data.
   * @param {object} previousBookmarkData - The previous bookmark data.
   */
  function submitEditedBookmark(previousBookmarkData) {
    return (event) => {
      // Prevent the browser from the doing a full page refresh.
      event.preventDefault()

      // Destructure 'name' and 'link' object properties from 'previousBookmarkData'.
      const { name, link } = previousBookmarkData

      // Check if the 'Edited bookmark' local state is not empty.
      if (!editedBookmark.name || !editedBookmark.link) {
        console.error('You passed an empty or blank data.')

        // Reset the values of 'Edited bookmark' local state.
        setEditedBookmark({ name: '', link: '' })
        // Close the 'Drawer' component.
        closeRightSideDrawer()
        // Display the 'Snackbar' component.
        setErrorSnackbar(true)

        // Return early since 'Edited bookmark' local state is empty.
        return
      }

      // Check if the previous bookmark data exist in the 'Bookmark' local state.
      const existingData = state[pathname].find((data) => {
        return data.name === name && data.link === link
      })

      // Only enable the code below during debugging.
      // if (Object.entries(existingData).length) {
      //   console.log('Existing bookmark data', existingData)
      // }

      // Execute the 'Bookmark data' update process.
      dispatch({
        type: 'EDIT_BOOKMARK',
        payload: { oldData: existingData, newData: editedBookmark },
      })

      // Only enable the code below during debuggin.
      // console.log('New bookmark data', editedBookmark)

      // Reset the values of 'Edited bookmark' local state.
      setEditedBookmark({ name: '', link: '' })
      // Close the 'Drawer' component.
      closeRightSideDrawer()
    }
  }

  /** Event handler for closing 'Success snackbar' component. */
  function closeSnackbar(event, reason) {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  /** Event handler for closing 'Error snackbar' component. */
  function closeErrorSnackbar(event, reason) {
    if (reason === 'clickaway') {
      return
    }
    setErrorSnackbar(false)
  }

  return (
    <div className={classes.root}>
      {/* CSS reset component */}
      <CssBaseline />

      {/* Header */}
      <Header pathname={pathname} openDrawer={openDrawer}>
        <Hidden mdUp>
          <SearchButton />
        </Hidden>
        <Hidden lgUp>
          <AddBookmarkButton />
        </Hidden>
      </Header>

      {/* Left sidebar (Will be hidden when the viewport gets smaller) */}
      {!isExtraSmall ? (
        <Sidebar>
          <SidebarList />
        </Sidebar>
      ) : null}

      {/* Left side 'Drawer' (Hidden by default) */}
      <LeftSideDrawer open={open} closeDrawer={closeDrawer}>
        <SidebarList isSidebarOpen={open} />
      </LeftSideDrawer>

      {/* Right side 'Drawer' (Hidden by default) */}
      <RightSideDrawer
        open={openEditDrawer}
        pathname={pathname}
        closeDrawer={closeRightSideDrawer}
        editedBookmark={editedBookmark}
        setEditedBookmark={saveEditedBookmark}
        currentBookmarkName={currentBookmarkName}
        currentBookmarkLink={currentBookmarkLink}
        currentBookmarkCategory={currentBookmarkCategory}
        submitEditedBookmark={submitEditedBookmark}
      />

      {/* Bookmark list and bookmark form */}
      <main
        className={clsx(classes.content, {
          [classes.contentGrid]: isExtraLarge,
          [classes.adjustedContentWidth]: isExtraSmall,
        })}
      >
        <div
          className={clsx(classes.spacer, {
            [classes.spacerGridPosition]: isExtraLarge,
          })}
        ></div>
        <Grid
          container
          spacing={3}
          className={clsx({ [classes.bookmarkContainer]: isExtraLarge })}
        >
          {/* Bookmark list */}
          <Grid
            item
            xs={12}
            lg={6}
            className={clsx({
              [classes.gridItems]: isMedium && state[pathname].length,
            })}
          >
            <BookmarkProvider
              value={{
                isSidebarOpen: open,
                bookmarks: state,
                dispatch: dispatch,
                openRightSideDrawer: openRightSideDrawer,
                updatePathname: updatePathname,
              }}
            >
              <Switch>
                {/* Default route */}
                <Route exact path='/'>
                  <Redirect to='/personal' />
                </Route>

                {/* Render individual routes based on state data's key names */}
                {Object.keys(state).map((groupName, index) => {
                  return (
                    <Route key={index} path={`/${groupName}`}>
                      <BookmarkList bookmarkGroup={groupName} />
                    </Route>
                  )
                })}
              </Switch>
            </BookmarkProvider>
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

      {/* Success snackbar notification (Hidden by default) */}
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

      {/* Error snackbar notification (Hidden by default) */}
      <Snackbar
        open={errorSnackbar}
        autoHideDuration={2000}
        onClose={closeErrorSnackbar}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Alert onClose={closeErrorSnackbar} severity='error'>
          Editing bookmark data failed.
        </Alert>
      </Snackbar>
    </div>
  )
}
