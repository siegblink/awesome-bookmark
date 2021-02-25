import { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import CopyrightIcon from '@material-ui/icons/Copyright'

const useStyles = makeStyles(function (theme) {
  return {
    listItem: {
      paddingLeft: 16,
      [theme.breakpoints.up('sm')]: {
        paddingLeft: 24,
      },
    },
    listItemIcon: {
      color: 'rgba(0, 0, 0, 0.54)',
      marginRight: '0.3rem',
      fontSize: '0.95rem',
    },
    listItemText: {
      fontSize: '0.9rem',
    },
  }
})

export default function Footer() {
  const classes = useStyles()

  return (
    <Fragment>
      {/* List item */}
      <ListItem className={classes.listItem}>
        {/* Icon */}
        <CopyrightIcon fontSize='small' className={classes.listItemIcon} />

        {/* Text */}
        <ListItemText
          primary={`${new Date().getFullYear()} Awesome Bookmark`}
          classes={{ primary: classes.listItemText }}
        />
      </ListItem>
    </Fragment>
  )
}
