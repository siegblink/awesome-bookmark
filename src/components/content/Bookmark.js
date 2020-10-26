import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import MoreOptionsButton from './MoreOptionsButton'
import Tooltip from '@material-ui/core/Tooltip'

const media = [
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2600&q=80',
  'https://images.unsplash.com/photo-1588392382834-a891154bca4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2255&q=80',
  'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
  'https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2200&q=80',
  'https://images.unsplash.com/photo-1471513671800-b09c87e1497c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
]

const useStyles = makeStyles(function (theme) {
  return {
    root: {
      minWidth: 275,
      marginBottom: 24,
      display: 'flex',
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
    link: {
      color: '#000000de',
      '&:hover': {
        textDecoration: 'none',
      },
    },
    cover: {
      width: 151,
    },
  }
})

export default function Bookmark(props) {
  const { bookmark, openEditDrawer, dispatch } = props
  const classes = useStyles()

  const imageUrl = media[Math.floor(Math.random() * 5)]

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={imageUrl}
        title='Image of nature'
      />
      <div className={classes.details}>
        <CardContent>
          <Typography variant='h5'>{bookmark.name}</Typography>
          <Typography color='textSecondary'>{bookmark.link}</Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Tooltip title='Open link in a new tab' placement='right' arrow>
            <Button variant='outlined' className={classes.button}>
              <Link
                target='_blank'
                href={bookmark.link}
                className={classes.link}
              >
                Open
              </Link>
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
