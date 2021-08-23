import { useEffect, useContext } from 'react'
import { BookmarkContext } from '../../context/'
import EmptyBookmark from './EmptyBookmark'
import Bookmark from '../content/Bookmark'

/** This is a component for displaying all 'Important' related bookmarks. */
export default function BookmarkList(props) {
  const { bookmarkGroup } = props

  // Get the 'Bookmark' context data.
  const context = useContext(BookmarkContext)
  const { bookmarks, dispatch, openRightSideDrawer, updatePathname } = context

  // Execute side effect when browser mounts this component.
  useEffect(() => {
    updatePathname(bookmarkGroup)
  }, [updatePathname, bookmarkGroup])

  return !bookmarks[bookmarkGroup].length ? (
    <EmptyBookmark />
  ) : (
    bookmarks[bookmarkGroup].map((bookmark, index) => {
      return (
        <Bookmark
          key={index}
          bookmark={bookmark}
          openEditDrawer={openRightSideDrawer}
          dispatch={dispatch}
        />
      )
    })
  )
}
