import clsx from 'clsx'
import { makeStyles, alpha, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
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
      color: alpha(theme.palette.common.white, 0.55),
    },
    searchBar: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
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
  const { open, pathname, displayDrawer } = props
  const classes = useStyles()

  // Get the 'Theme' data from 'useTheme'.
  const theme = useTheme()

  // Get the 'Media query' data from 'useMediaQuery'.
  const isExtraSmall = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <AppBar
      position='fixed'
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open && !isExtraSmall,
      })}
    >
      <Toolbar>
        <IconButton
          aria-label='open drawer'
          color='inherit'
          edge='start'
          onClick={displayDrawer}
          className={clsx(
            classes.menuButton,
            open && !isExtraSmall && classes.hide
          )}
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
      </Toolbar>
    </AppBar>
  )
}
