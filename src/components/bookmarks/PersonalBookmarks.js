import EmptyBookmark from './EmptyBookmark'
import Bookmark from '../content/Bookmark'

/** This is a component for displaying all 'Important' related bookmarks. */
export default function PersonalBookmarks(props) {
  const { data, dispatch, openRightSideDrawer } = props

  return !data.length ? (
    <EmptyBookmark />
  ) : (
    data.map((bookmark) => {
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
