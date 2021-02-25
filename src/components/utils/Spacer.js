import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => {
  return {
    root: {
      display: 'flex',
      flex: 1,
    },
  }
})

export default function Spacer() {
  const classes = useStyles()
  return <div className={classes.root}></div>
}
