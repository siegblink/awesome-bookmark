import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
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
    cancelButton: {
      marginRight: '0.5rem',
    },
  }
})

export default function SearchDialog(props) {
  const classes = useStyles()
  const [searchPhrase, setSearchPhrase] = useState('')

  function changeSearchPhrase(event) {
    setSearchPhrase(event.target.value)
  }

  return (
    <Dialog
      fullWidth
      open={props.isDialogOpen}
      onClose={props.closeDialog}
      aria-labelledby='add-bookmark-form'
    >
      <DialogTitle id='add-bookmark-form'>Search</DialogTitle>
      <DialogContent dividers className={classes.dialogContent}>
        <form className={classes.form}>
          <TextField
            fullWidth
            id='searchPhrase'
            type='text'
            label='Enter bookmark name, url, etc.'
            variant='filled'
            value={searchPhrase}
            onChange={changeSearchPhrase}
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
          Begin search
        </Button>
      </DialogActions>
    </Dialog>
  )
}
