import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CollectionsBookmarkRoundedIcon from '@material-ui/icons/CollectionsBookmarkRounded'

/** The 'useStyles' variable houses all the CSS styles that will be used by the main component. */
const useStyles = makeStyles(function (theme) {
  return {
    emptyBookmarkContainer: {
      alignSelf: 'center',
      display: 'grid',
      placeContent: 'center',
      placeItems: 'center',
    },
    bookmarkIcon: {
      fontSize: '17rem',
      color: theme.palette.text.secondary,
    },
  }
})

/** This is a component that will be displayed when there are no available bookmarks. */
export default function EmptyBookmark(props) {
  const classes = useStyles()

  return (
    <div className={classes.emptyBookmarkContainer}>
      <CollectionsBookmarkRoundedIcon
        fontSize='large'
        className={classes.bookmarkIcon}
      />
      <Typography variant='h5'>Add bookmarks now</Typography>
      <Typography color='textSecondary'>
        There are no available bookmarks to display.
      </Typography>
    </div>
  )
}
