import { useEffect, useContext } from 'react'
import { BookmarkContext } from '../../context/'
import EmptyBookmark from './EmptyBookmark'

/** This is a component for displaying all 'Github' related bookmarks. */
export default function GithubBookmarks(props) {
  // Get the 'Bookmark' context data.
  const context = useContext(BookmarkContext)
  const { bookmarks, dispatch, openRightSideDrawer, updatePathname } = context

  // Execute side effect when browser mounts this component.
  useEffect(() => {
    updatePathname('github')
  }, [updatePathname])

  return <EmptyBookmark />
}
