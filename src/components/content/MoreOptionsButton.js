import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Tooltip from '@material-ui/core/Tooltip'

const ITEM_HEIGHT = 48

export default function MoreOptionsButton(props) {
  const [anchorEl, setAnchorEl] = useState(null)
  const { currentBookmarkName, currentBookmarkLink } = props
  const { openEditDrawer, dispatch } = props
  const open = Boolean(anchorEl)

  function handleClick(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  function handleOpenEditDrawer() {
    openEditDrawer(currentBookmarkName, currentBookmarkLink)
    setAnchorEl(null)
  }

  function removeBookmark(currentBookmarkName) {
    return () => {
      dispatch({
        type: 'DELETE_BOOKMARK',
        payload: { name: currentBookmarkName },
      })
      handleClose()
    }
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
        <MenuItem onClick={removeBookmark(currentBookmarkName)}>
          Delete
        </MenuItem>
      </Menu>
    </div>
  )
}
