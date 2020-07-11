import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import Tooltip from '@material-ui/core/Tooltip'

export default function FormDialog() {
  const [open, setOpen] = React.useState(false)

  function handleClickOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  return (
    <div>
      <Tooltip title='Add new bookmark'>
        <IconButton
          aria-label='add a new bookmark'
          aria-controls='menu-appbar'
          aria-haspopup='true'
          color='inherit'
          onClick={handleClickOpen}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Add a new bookmark</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the bookmark name, url, and category.
          </DialogContentText>
          <TextField
            margin='dense'
            id='bookmarkName'
            label='Bookmark name'
            type='text'
            variant='outlined'
            fullWidth
          />
          <TextField
            margin='dense'
            id='bookmarkUrl'
            label='Bookmark URL'
            type='text'
            variant='outlined'
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleClose} color='primary'>
            Add bookmark
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
