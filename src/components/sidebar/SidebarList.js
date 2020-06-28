import React, { Fragment } from 'react'
import List from '@material-ui/core/List'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import GitHubIcon from '@material-ui/icons/GitHub'
import LabelImportantIcon from '@material-ui/icons/LabelImportant'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import BuildIcon from '@material-ui/icons/Build'
import SidebarListItem from './SidebarListItem'

export default function SidebarList() {
  const sidebarItems = [
    { text: 'Personal', icon: <AccountCircleIcon /> },
    { text: 'Github', icon: <GitHubIcon /> },
    { text: 'Important', icon: <LabelImportantIcon /> },
    { text: 'Libraries', icon: <MenuBookIcon /> },
    { text: 'Tools', icon: <BuildIcon /> },
  ]

  return (
    <Fragment>
      <List>
        {sidebarItems.map(function (sidebarItem, index) {
          return <SidebarListItem key={index} sidebarItem={sidebarItem} />
        })}
      </List>
    </Fragment>
  )
}
