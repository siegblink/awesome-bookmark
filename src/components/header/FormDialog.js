import * as React from 'react'
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
import CustomSelect from '../form/CustomSelect'

const { useState } = React

const useStyles = makeStyles(function (theme) {
  return {
    formControl: {
      width: '100%',
    },
    iconButton: {
      marginLeft: theme.spacing(1),
    },
    form: {
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }
})

export default function FormDialog() {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [link, setLink] = useState('')
  const [category, setCategory] = useState('')
  const [open, setOpen] = React.useState(false)

  function handleClickOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  function handleNameChange(event) {
    setName(event.target.value)
  }

  function handleLinkChange(event) {
    setLink(event.target.value)
  }

  function handleCategoryChange(event) {
    setCategory(event.target.value)
  }

  return (
    <div>
      <Tooltip arrow title='Add new bookmark'>
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
          <form className={classes.form}>
            <TextField
              value={name}
              onChange={handleNameChange}
              margin='dense'
              id='bookmarkName'
              label='Bookmark name'
              type='text'
              variant='filled'
              fullWidth
            />
            <TextField
              value={link}
              onChange={handleLinkChange}
              margin='dense'
              id='bookmarkUrl'
              label='Bookmark URL'
              type='text'
              variant='filled'
              fullWidth
            />
            <CustomSelect
              category={category}
              handleCategoryChange={handleCategoryChange}
            />
          </form>
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
