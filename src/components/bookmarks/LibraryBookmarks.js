import { useEffect, useContext } from 'react'
import { BookmarkContext } from '../../context/'
import EmptyBookmark from './EmptyBookmark'

/** This is a component for displaying all 'Important' related bookmarks. */
export default function LibraryBookmarks(props) {
  // Get the 'Bookmark' context data.
  const context = useContext(BookmarkContext)
  const { bookmarks, dispatch, openRightSideDrawer, updatePathname } = context

  // Execute side effect when browser mounts this component.
  useEffect(() => {
    updatePathname('libraries')
  }, [updatePathname])

  return <EmptyBookmark />
}
