import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import SearchIcon from '@material-ui/icons/Search'

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

  return (
    <div>
      <Tooltip arrow title='Add new bookmark'>
        <IconButton
          aria-label='add a new bookmark'
          aria-controls='menu-appbar'
          aria-haspopup='true'
          color='inherit'
          className={classes.iconButton}
        >
          <SearchIcon />
        </IconButton>
      </Tooltip>
    </div>
  )
}
