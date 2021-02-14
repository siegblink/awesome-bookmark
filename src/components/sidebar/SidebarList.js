import { BrowserRouter as Router } from 'react-router-dom'
import { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import GitHubIcon from '@material-ui/icons/GitHub'
import LabelImportantIcon from '@material-ui/icons/LabelImportant'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import BuildIcon from '@material-ui/icons/Build'
import BeenhereIcon from '@material-ui/icons/Beenhere'
import AddIcon from '@material-ui/icons/Add'
import Divider from '@material-ui/core/Divider'
import Tooltip from '@material-ui/core/Tooltip'
import SidebarListItem from './SidebarListItem'

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

export default function SidebarList(props) {
  const classes = useStyles()

  const sidebarItems = [
    { text: 'Personal', icon: <AccountCircleIcon /> },
    { text: 'Github', icon: <GitHubIcon /> },
    { text: 'Important', icon: <LabelImportantIcon /> },
    { text: 'Libraries', icon: <MenuBookIcon /> },
    { text: 'Tools', icon: <BuildIcon /> },
    { text: 'Others', icon: <BeenhereIcon /> },
  ]

  return (
    <Fragment>
      <Router>
        <List>
          {sidebarItems.map(function (sidebarItem, index) {
            return (
              <SidebarListItem
                key={index}
                sidebarItem={sidebarItem}
                isSidebarOpen={props.isSidebarOpen}
              />
            )
          })}
        </List>
      </Router>
      <Divider />
      <List>
        <ListItem button className={classes.listItem}>
          <ListItemIcon>
            <Tooltip
              arrow
              title='Add new category'
              placement={props.isSidebarOpen ? 'top' : 'right'}
            >
              <AddIcon />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary={'Add category'} />
        </ListItem>
      </List>
    </Fragment>
  )
}
