import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles(function (theme) {
  return {
    listItem: {
      paddingLeft: 16,
      [theme.breakpoints.up('sm')]: {
        paddingLeft: 24,
      },
    },
  }
})

export default function SidebarListItem(props) {
  const classes = useStyles()
  const { text, icon } = props.sidebarItem

  return (
    <ListItem button className={classes.listItem}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  )
}
