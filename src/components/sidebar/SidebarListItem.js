import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Tooltip from '@material-ui/core/Tooltip'

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
      <Tooltip arrow title={text} placement='right'>
        <Link to={text.toLowerCase()}>
          <ListItemIcon>{icon}</ListItemIcon>
        </Link>
      </Tooltip>
      <ListItemText primary={text} />
    </ListItem>
  )
}
