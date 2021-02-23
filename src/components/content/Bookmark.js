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
  }
})

export default function Bookmark(props) {
  const { bookmark, openEditDrawer, dispatch } = props
  const classes = useStyles()

  // Get the 'Theme' data from 'useTheme'.
  const theme = useTheme()

  // Get the 'Media query' data from 'useMediaQuery'.
  const isSmall = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <Card className={clsx(classes.root, { [classes.gridPosition]: isSmall })}>
      <CardMedia
        className={classes.cover}
        image='dummy-img.png'
        title='Image of nature'
      />
      <div className={classes.details}>
        <CardContent>
          <Typography variant='h5'>{bookmark.name}</Typography>
          <Typography color='textSecondary' className={classes.bookmarkLink}>
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
            currentBookmarkName={bookmark.name}
            currentBookmarkLink={bookmark.link}
            dispatch={dispatch}
          />
        </CardActions>
      </div>
    </Card>
  )
}
