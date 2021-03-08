import { useEffect, useContext } from 'react'
import { BookmarkContext } from '../../context/'
import EmptyBookmark from './EmptyBookmark'
import Bookmark from '../content/Bookmark'

/** This is a component for displaying all 'Important' related bookmarks. */
export default function ImportantBookmarks(props) {
  // Get the 'Bookmark' context data.
  const context = useContext(BookmarkContext)
  const { bookmarks, dispatch, openRightSideDrawer, updatePathname } = context

  // Execute side effect when browser mounts this component.
  useEffect(() => {
    updatePathname('important')
  }, [updatePathname])

  return !bookmarks['important'].length ? (
    <EmptyBookmark />
  ) : (
    bookmarks['important'].map((bookmark) => {
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
