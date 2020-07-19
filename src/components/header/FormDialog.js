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
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles(function () {
  return {
    formControl: {
      width: '100%',
      marginTop: 8,
    },
  }
})

export default function FormDialog() {
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

export function CustomSelect() {
  const classes = useStyles()
  const [bookmark, setBookmark] = useState('')
  const [open, setOpen] = useState(false)

  const handleChange = (event) => {
    setBookmark(event.target.value)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <FormControl variant='filled' className={classes.formControl}>
      <InputLabel id='select-bookmark-input'>Select category</InputLabel>
      <Select
        labelId='select-bookmark-category'
        id='select-bookmark-category'
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={bookmark}
        onChange={handleChange}
      >
        <MenuItem value={'Personal'}>Personal</MenuItem>
        <MenuItem value={'Github'}>Github</MenuItem>
        <MenuItem value={'Important'}>Important</MenuItem>
        <MenuItem value={'Libraries'}>Libraries</MenuItem>
        <MenuItem value={'Tools'}>Tools</MenuItem>
        <MenuItem value={'Others'}>Others</MenuItem>
      </Select>
    </FormControl>
  )
}
