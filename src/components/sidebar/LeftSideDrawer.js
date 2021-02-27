import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'

const drawerWidth = 240

const useStyles = makeStyles((theme) => {
  return {
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    listContainer: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
  }
})

export default function RightSideDrawer(props) {
  const classes = useStyles()
  const { open, closeDrawer, children } = props

  return (
    <Drawer
      anchor='left'
      open={open}
      onClose={closeDrawer}
      className={classes.drawer}
    >
      <div className={classes.listContainer} role='presentation'>
        {children}
      </div>
    </Drawer>
  )
}
