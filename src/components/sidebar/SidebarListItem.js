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
    listItemText: {
      color: theme.palette.text.primary,
    },
    link: {
      textDecoration: 'none',
    },
  }
})

export default function SidebarListItem(props) {
  const classes = useStyles()
  const { text, icon } = props.sidebarItem

  return (
    <Link to={`/${text.toLowerCase()}`} className={classes.link}>
      <ListItem button className={classes.listItem}>
        <ListItemIcon>
          <Tooltip
            arrow
            title={text}
            placement={props.isSidebarOpen ? 'top' : 'right'}
          >
            {icon}
          </Tooltip>
        </ListItemIcon>
        <ListItemText primary={text} className={classes.listItemText} />
      </ListItem>
    </Link>
  )
}
