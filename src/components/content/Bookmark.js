import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 24,
  },
  button: {
    marginLeft: 6,
    marginBottom: 6,
  },
  link: {
    color: '#000000de',
    '&:hover': {
      textDecoration: 'none',
    },
  },
})

export default function Bookmark(props) {
  const { bookmark } = props

  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant='h5'>{bookmark.name}</Typography>
        <Typography color='textSecondary'>{bookmark.url}</Typography>
      </CardContent>
      <CardActions>
        <Button variant='outlined' className={classes.button}>
          <Link target='_blank' href={bookmark.url} className={classes.link}>
            Open
          </Link>
        </Button>
      </CardActions>
    </Card>
  )
}
