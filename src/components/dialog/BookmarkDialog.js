import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import CustomSelect from '../form/CustomSelect'

const useStyles = makeStyles(function () {
  return {
    dialogContent: {
      paddingTop: '1rem',
      paddingBottom: '1rem',
    },
    dialogContentText: {
      marginBottom: 0,
    },
    dialogActions: {
      padding: '1rem 1.6rem',
    },
    bookmarkName: {
      marginTop: '1rem',
    },
    bookmarkUrl: {
      marginTop: '1rem',
    },
    cancelButton: {
      marginRight: '0.5rem',
    },
  }
})

export default function BookmarkDialog(props) {
  const classes = useStyles()
  const [bookmarkName, setBookmarkName] = useState('')
  const [link, setLink] = useState('')
  const [category, setCategory] = useState('')

  function changeBookmarkName(event) {
    setBookmarkName(event.target.value)
  }

  function changeLink(event) {
    setLink(event.target.value)
  }

  function changeCategory(event) {
    setCategory(event.target.value)
  }

  return (
    <Dialog
      fullWidth
      open={props.isDialogOpen}
      onClose={props.closeDialog}
      aria-labelledby='add-bookmark-form'
    >
      <DialogTitle id='add-bookmark-form'>Add new bookmark</DialogTitle>
      <DialogContent dividers className={classes.dialogContent}>
        <DialogContentText className={classes.dialogContentText}>
          Enter the bookmark name, url, and category.
        </DialogContentText>
        <form className={classes.form}>
          <TextField
            fullWidth
            id='bookmarkName'
            type='text'
            label='Bookmark name'
            variant='filled'
            value={bookmarkName}
            onChange={changeBookmarkName}
            className={classes.bookmarkName}
          />
          <TextField
            fullWidth
            id='bookmarkUrl'
            type='text'
            label='Bookmark URL'
            variant='filled'
            value={link}
            onChange={changeLink}
            className={classes.bookmarkUrl}
          />
          <CustomSelect marginTop category={category} setCategory={changeCategory} />
        </form>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          onClick={props.closeDialog}
          color='primary'
          className={classes.cancelButton}
        >
          Cancel
        </Button>
        <Button onClick={props.closeDialog} color='primary' variant='contained'>
          Add bookmark
        </Button>
      </DialogActions>
    </Dialog>
  )
}
