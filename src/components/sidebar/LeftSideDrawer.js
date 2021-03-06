import { makeStyles } from '@material-ui/core/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Divider from '@material-ui/core/Divider'
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
      flex: 1,
      flexDirection: 'column',
      padding: theme.spacing(0, 1),
    },
    backButton: {
      margin: theme.spacing(1, 0),
      width: 'fit-content',
      alignSelf: 'flex-end',
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
        {/* Back button */}
        <Tooltip arrow title='Close menu' placement='left'>
          <IconButton
            onClick={closeDrawer}
            classes={{ root: classes.backButton }}
          >
            <ChevronLeftIcon />
          </IconButton>
        </Tooltip>

        <Divider />
        {children}
      </div>
    </Drawer>
  )
}
