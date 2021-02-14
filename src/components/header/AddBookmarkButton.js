import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import Tooltip from '@material-ui/core/Tooltip'
import BookmarkDialog from '../dialog/BookmarkDialog'

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

export default function AddBookmarkButton() {
  const classes = useStyles()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  function openDialog() {
    setIsDialogOpen(true)
  }

  function closeDialog() {
    setIsDialogOpen(false)
  }

  return (
    <div>
      <Tooltip arrow title='Add new bookmark'>
        <IconButton
          aria-label='add a new bookmark'
          aria-controls='menu-appbar'
          aria-haspopup='true'
          color='inherit'
          onClick={openDialog}
          className={classes.iconButton}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
      <BookmarkDialog isDialogOpen={isDialogOpen} closeDialog={closeDialog} />
    </div>
  )
}
