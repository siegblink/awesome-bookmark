import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

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
    bookmarkGroup: {
      marginTop: '1rem',
    },
    cancelButton: {
      marginRight: '0.5rem',
    },
  }
})

export default function BookmarkGroupDialog(props) {
  const classes = useStyles()
  const [bookmarkGroup, setBookmarkGroup] = useState('')

  function changeBookmarkGroup(event) {
    setBookmarkGroup(event.target.value)
  }

  return (
    <Dialog
      fullWidth
      open={props.isDialogOpen}
      onClose={props.closeDialog}
      aria-labelledby='add-bookmark-group-form'
    >
      <DialogTitle id='add-bookmark-group-form'>
        Add new bookmark group
      </DialogTitle>
      <DialogContent dividers className={classes.dialogContent}>
        <DialogContentText className={classes.dialogContentText}>
          Enter the name of the bookmark group.
        </DialogContentText>
        <form className={classes.form}>
          <TextField
            fullWidth
            id='bookmark-group'
            type='text'
            label='Bookmark group'
            variant='filled'
            value={bookmarkGroup}
            onChange={changeBookmarkGroup}
            className={classes.bookmarkGroup}
          />
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
          Add group
        </Button>
      </DialogActions>
    </Dialog>
  )
}
