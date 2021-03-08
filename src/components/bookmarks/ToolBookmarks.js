import { useEffect, useContext } from 'react'
import { BookmarkContext } from '../../context/'
import EmptyBookmark from './EmptyBookmark'
import Bookmark from '../content/Bookmark'

/** This is a component for displaying all 'Important' related bookmarks. */
export default function ToolBookmarks(props) {
  // Get the 'Bookmark' context data.
  const context = useContext(BookmarkContext)
  const { bookmarks, dispatch, openRightSideDrawer, updatePathname } = context

  // Execute side effect when browser mounts this component.
  useEffect(() => {
    updatePathname('tools')
  }, [updatePathname])

  return !bookmarks['tools'].length ? (
    <EmptyBookmark />
  ) : (
    bookmarks['tools'].map((bookmark) => {
      return (
        <Bookmark
          key={bookmark.name}
          bookmark={bookmark}
          openEditDrawer={openRightSideDrawer}
          dispatch={dispatch}
        />
      )
    })
  )
}
