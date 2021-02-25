import { Fragment, useState } from 'react'
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
import BookmarkGroupDialog from '../dialog/BookmarkGroupDialog'
import Spacer from '../utils/Spacer'
import { Footer } from '../footer'

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
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const sidebarItems = [
    { text: 'Personal', icon: <AccountCircleIcon /> },
    { text: 'Github', icon: <GitHubIcon /> },
    { text: 'Important', icon: <LabelImportantIcon /> },
    { text: 'Libraries', icon: <MenuBookIcon /> },
    { text: 'Tools', icon: <BuildIcon /> },
    { text: 'Others', icon: <BeenhereIcon /> },
  ]

  function openDialog() {
    setIsDialogOpen(true)
  }

  function closeDialog() {
    setIsDialogOpen(false)
  }

  return (
    <Fragment>
      {/* Main bookmark list items */}
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
      <Divider />

      {/* Add new group list item */}
      <List>
        <ListItem button onClick={openDialog} className={classes.listItem}>
          <ListItemIcon>
            <Tooltip
              arrow
              title='Add new group'
              placement={props.isSidebarOpen ? 'top' : 'right'}
            >
              <AddIcon />
            </Tooltip>
          </ListItemIcon>
          <ListItemText primary={'Add category'} />
        </ListItem>
      </List>
      <Divider />
      <Spacer />

      {/* Footer */}
      <Divider />
      {props.isSidebarOpen ? (
        <List>
          <Footer />
        </List>
      ) : null}

      {/* Add new 'bookmark group' dialog */}
      <BookmarkGroupDialog
        isDialogOpen={isDialogOpen}
        closeDialog={closeDialog}
      />
    </Fragment>
  )
}
