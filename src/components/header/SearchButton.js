import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import SearchIcon from '@material-ui/icons/Search'
import SearchDialog from '../dialog/SearchDialog'

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

export default function SearchButton() {
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
          aria-label='search-button'
          aria-controls='menu-appbar'
          aria-haspopup='true'
          color='inherit'
          onClick={openDialog}
          className={classes.iconButton}
        >
          <SearchIcon />
        </IconButton>
      </Tooltip>
      <SearchDialog isDialogOpen={isDialogOpen} closeDialog={closeDialog} />
    </div>
  )
}
