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
import PersonalBookmarks from '../bookmarks/PersonalBookmarks'
import GithubBookmarks from '../bookmarks/GithubBookmarks'
import ImportantBookmarks from '../bookmarks/ImportantBookmarks'
import LibraryBookmarks from '../bookmarks/LibraryBookmarks'
import ToolBookmarks from '../bookmarks/ToolBookmarks'
import OtherBookmarks from '../bookmarks/OtherBookmarks'
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
  const [pathname, setPathname] = useState('personal')

  /** Declare side effect that sets the 'Current bookmark category' state. */
  useEffect(function () {
    const firstBookmarkEntry = dummyData['personal']
    setCurrentBookmarkCategory(firstBookmarkEntry.category)
  }, [])

  /** Event handler for setting the 'pathname' local state. */
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
      <Header open={open} pathname={pathname} handleDrawerOpen={openDrawer}>
        <Hidden mdUp>
          <SearchButton />
        </Hidden>
        <Hidden lgUp>
          <AddBookmarkButton />
        </Hidden>
      </Header>

      {/* Left sidebar */}
      {!isExtraSmall ? (
        <Sidebar open={open} handleDrawerClose={closeDrawer}>
          <SidebarList isSidebarOpen={open} />
        </Sidebar>
      ) : (
        <LeftSideDrawer open={open} closeDrawer={closeDrawer}>
          <SidebarList isSidebarOpen={open} />
        </LeftSideDrawer>
      )}

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
                <Route exact path='/'>
                  <Redirect to='/personal' />
                </Route>
                <Route path='/personal'>
                  <PersonalBookmarks />
                </Route>
                <Route path='/github'>
                  <GithubBookmarks />
                </Route>
                <Route path='/important'>
                  <ImportantBookmarks />
                </Route>
                <Route path='/libraries'>
                  <LibraryBookmarks />
                </Route>
                <Route path='/tools'>
                  <ToolBookmarks />
                </Route>
                <Route path='/others'>
                  <OtherBookmarks />
                </Route>
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
