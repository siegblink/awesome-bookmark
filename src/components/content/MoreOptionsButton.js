import { useState, useContext } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteBookmarkDialog from '../dialog/DeleteBookmarkDialog'
import { BookmarkContext } from '../../context/'

const ITEM_HEIGHT = 48

export default function MoreOptionsButton(props) {
  const bookmarkContext = useContext(BookmarkContext)
  const [anchorEl, setAnchorEl] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const { bookmarkData, openEditDrawer, removeBookmark } = props
  const open = Boolean(anchorEl)

  function handleClick(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  function handleOpenEditDrawer() {
    openEditDrawer(bookmarkData)
    setAnchorEl(null)
  }

  function confirmDeleteBookmark() {
    setOpenDialog(true)
    setAnchorEl(null)
  }

  function closeDialog() {
    setOpenDialog(false)
  }

  function displayDeleteBookmarkSnackbar() {
    bookmarkContext.dispatch({ type: 'OPEN_DELETE_BOOKMARK_SNACKBAR' })
  }

  return (
    <div>
      <Tooltip title='See more options' placement='left' arrow>
        <IconButton
          aria-label='more'
          aria-controls='short-menu'
          aria-haspopup='true'
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
        keepMounted
      >
        <MenuItem onClick={handleOpenEditDrawer}>Edit</MenuItem>
        <MenuItem onClick={confirmDeleteBookmark}>Delete</MenuItem>
      </Menu>

      {/* Delete bookmark dialog */}
      <DeleteBookmarkDialog
        isDialogOpen={openDialog}
        closeDialog={closeDialog}
        deleteBookmark={removeBookmark(
          bookmarkData,
          displayDeleteBookmarkSnackbar
        )}
      />
    </div>
  )
}
