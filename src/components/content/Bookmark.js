// import { useContext } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import MoreOptionsButton from './MoreOptionsButton'
import Tooltip from '@material-ui/core/Tooltip'
// import { BookmarkContext } from '../../context/'

const useStyles = makeStyles(() => {
  return {
    root: {
      maxWidth: 647.5,
      minWidth: 275,
      marginBottom: 24,
      display: 'flex',
    },
    gridPosition: {
      gridColumn: '2/3',
    },
    details: {
      flex: 1,
    },
    cardActions: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    button: {
      marginLeft: 6,
      marginBottom: 2,
    },
    cover: {
      minWidth: 151,
    },
    bookmarkLink: {
      display: 'inline-block',
      maxWidth: '29.03125rem',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    // adjustedLinkMaxWidth: {
    //   maxWidth: '23.125rem',
    // },
  }
})

export default function Bookmark(props) {
  const { bookmark, bookmarkGroup, openEditDrawer, dispatch } = props
  const classes = useStyles()

  // Get the 'Bookmark' context data.
  // const { isSidebarOpen } = useContext(BookmarkContext)

  // Get the 'Theme' data from 'useTheme'.
  const theme = useTheme()

  // Get the 'Media query' data from 'useMediaQuery'.
  const isExtraSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const isSmall = useMediaQuery(theme.breakpoints.up('sm'))

  // Declare variable to check if the viewport is from a 'laptop' screen.
  // const isLapTopView = useMediaQuery('(max-width:1440px)')

  /**
   * Remove bookmark data.
   * @params {object} bookmark - The bookmark data.
   * @params {function} callback - The function that will be executed after removing the bookmark data.
   * @returns void
   */
  function removeBookmark(bookmark, callback) {
    return () => {
      // Execute a 'Delete bookmark' action.
      dispatch({
        type: 'DELETE_BOOKMARK',
        payload: { name: bookmark.name, group: bookmarkGroup },
      })

      // Execute the callback.
      callback()
    }
  }

  return (
    <Card
      className={clsx(classes.root, {
        [classes.gridPosition]: isSmall && !isExtraSmall,
      })}
    >
      <CardMedia
        className={classes.cover}
        image='dummy-img.png'
        title='Image of nature'
      />
      <div className={classes.details}>
        <CardContent>
          <Typography variant='h5'>{bookmark.name}</Typography>
          <Typography
            color='textSecondary'
            className={clsx(classes.bookmarkLink)}
          >
            {bookmark.link}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Tooltip title='Open link in a new tab' placement='right' arrow>
            <Button
              variant='outlined'
              target='_blank'
              href={bookmark.link}
              className={classes.button}
            >
              Open
            </Button>
          </Tooltip>
          <MoreOptionsButton
            openEditDrawer={openEditDrawer}
            bookmarkData={bookmark}
            removeBookmark={removeBookmark}
          />
        </CardActions>
      </div>
    </Card>
  )
}
