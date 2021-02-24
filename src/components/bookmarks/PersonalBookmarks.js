import { useContext } from 'react'
import { BookmarkContext } from '../../context/'
import EmptyBookmark from './EmptyBookmark'
import Bookmark from '../content/Bookmark'

/** This is a component for displaying all 'Important' related bookmarks. */
export default function PersonalBookmarks(props) {
  // Get the 'Bookmark' context data.
  const context = useContext(BookmarkContext)
  const { bookmarks, dispatch, openRightSideDrawer } = context

  return !bookmarks?.length ? (
    <EmptyBookmark />
  ) : (
    bookmarks.map((bookmark) => {
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
