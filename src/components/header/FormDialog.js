import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
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
import { CustomSelect } from '../main/Main'

const useStyles = makeStyles(function (theme) {
  return {
    formControl: {
      width: '100%',
    },
    iconButton: {
      marginLeft: theme.spacing(1),
    },
  }
})

export default function FormDialog() {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

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
          className={classes.iconButton}
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
            variant='filled'
            fullWidth
          />
          <TextField
            margin='dense'
            id='bookmarkUrl'
            label='Bookmark URL'
            type='text'
            variant='filled'
            fullWidth
          />
          <CustomSelect />
        </DialogContent>
        <DialogActions style={{ padding: '16px 24px 24px' }}>
          <Button
            onClick={handleClose}
            color='primary'
            style={{ marginRight: '16px' }}
          >
            Cancel
          </Button>
          <Button onClick={handleClose} color='primary' variant='contained'>
            Add bookmark
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
