import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Img from '../../assets/bee.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom: 24,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 300,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  latestBookmark: {
    display: 'flex',
    flexDirection: 'column',
  },
}))

export default function Summary() {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant='caption' color='textSecondary'>
            Current page
          </Typography>
          <Typography variant='h5'>Personal</Typography>
        </CardContent>
        <div className={classes.controls}>
          <div className={classes.latestBookmark}>
            <Typography variant='caption' color='textSecondary'>
              Latest bookmark
            </Typography>
            <Typography variant='h5'>github-high-scores</Typography>
          </div>
        </div>
      </div>
      <CardMedia className={classes.cover} image={Img} title='Honey bee' />
    </Card>
  )
}
