import clsx from 'clsx'
import { makeStyles, fade } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/ToolBar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import SearchInputField from './SearchInputField'

const drawerWidth = 240

const useStyles = makeStyles(function (theme) {
  return {
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    headerTitle: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
    },
    currentBookmark: {
      color: fade(theme.palette.common.white, 0.55),
    },
    searchBar: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // Vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }
})

export default function Header(props) {
  const { open, pathname, handleDrawerOpen } = props
  const classes = useStyles()

  return (
    <AppBar
      position='fixed'
      className={clsx(classes.appBar, { [classes.appBarShift]: open })}
    >
      <ToolBar>
        <IconButton
          aria-label='open drawer'
          color='inherit'
          edge='start'
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <Tooltip title='Open menu' placement='right' arrow>
            <MenuIcon />
          </Tooltip>
        </IconButton>
        <Typography variant='h6' noWrap className={classes.headerTitle}>
          Awesome Bookmark
          <ChevronRightIcon className={classes.currentBookmark} />
          <span className={classes.currentBookmark}>
            {`${pathname.slice(0, 1).toUpperCase()}${pathname.slice(1)}`}
          </span>
        </Typography>
        <SearchInputField />
        {props.children}
      </ToolBar>
    </AppBar>
  )
}
