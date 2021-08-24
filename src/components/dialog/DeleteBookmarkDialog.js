import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

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
    cancelButton: {
      marginRight: '0.5rem',
    },
  }
})

export default function DeleteBookmarkDialog(props) {
  const classes = useStyles()

  return (
    <Dialog
      fullWidth
      open={props.isDialogOpen}
      onClose={props.closeDialog}
      aria-labelledby='delete-bookmark-confirmation'
    >
      {/* Dialog title */}
      <DialogTitle id='delete-bookmark-confirmation'>
        Delete bookmark
      </DialogTitle>

      {/* Dialog content */}
      <DialogContent dividers className={classes.dialogContent}>
        <DialogContentText className={classes.dialogContentText}>
          Are you sure you want to delete this bookmark?
        </DialogContentText>
      </DialogContent>

      {/* Dialog actions */}
      <DialogActions className={classes.dialogActions}>
        <Button
          onClick={props.closeDialog}
          color='primary'
          className={classes.cancelButton}
        >
          Cancel
        </Button>
        <Button
          onClick={props.deleteBookmark}
          color='primary'
          variant='contained'
        >
          Delete bookmark
        </Button>
      </DialogActions>
    </Dialog>
  )
}
