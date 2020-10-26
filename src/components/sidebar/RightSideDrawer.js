import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import FilledInput from '@material-ui/core/FilledInput'
import Button from '@material-ui/core/Button'
import { CustomSelect } from '../main/Main'

const useStyles = makeStyles({
  list: {
    width: 400,
    padding: '24px',

    '& > * + *': {
      marginTop: '24px',
    },
  },
  form: {
    '& > * + *': {
      marginTop: '24px',
    },
  },
  currentBookmarkInfo: {
    paddingTop: '24px',
  },
})

export default function RightSideDrawer(props) {
  const classes = useStyles()
  const { open, handleClose, editedBookmark } = props
  const { handleEditedBookmark, currentBookmarkName } = props
  const { currentBookmarkLink, currentBookmarkCategory } = props
  const { handleSubmitEditedBookmark } = props
  const { name, link, category } = editedBookmark

  return (
    <div>
      <Drawer anchor='right' open={open} onClose={handleClose}>
        <div className={classes.list} role='presentation'>
          <Typography variant='h5'>Edit bookmark</Typography>

          <form className={classes.form}>
            <FormControl fullWidth variant='filled'>
              <InputLabel htmlFor='bookmark-name'>Name</InputLabel>
              <FilledInput
                id='bookmark-name'
                name='name'
                value={name}
                onChange={handleEditedBookmark}
              />
            </FormControl>

            <FormControl fullWidth variant='filled'>
              <InputLabel htmlFor='bookmark-link'>Link</InputLabel>
              <FilledInput
                id='bookmark-link'
                name='link'
                value={link}
                onChange={handleEditedBookmark}
              />
            </FormControl>

            <CustomSelect
              name='category'
              category={category}
              handleCategoryChange={handleEditedBookmark}
            />

            <Button
              color='primary'
              variant='contained'
              size='large'
              type='submit'
              onClick={handleSubmitEditedBookmark}
            >
              Save edits
            </Button>
          </form>

          <Typography variant='h5' className={classes.currentBookmarkInfo}>
            Current bookmark info
          </Typography>
          <div>
            <Typography variant='caption'>Name</Typography>
            <Typography variant='subtitle1'>{currentBookmarkName}</Typography>
          </div>
          <div>
            <Typography variant='caption'>Link</Typography>
            <Typography variant='subtitle1'>{currentBookmarkLink}</Typography>
          </div>
          <div>
            <Typography variant='caption'>Category</Typography>
            <Typography variant='subtitle1'>
              {currentBookmarkCategory}
            </Typography>
          </div>
        </div>
      </Drawer>
    </div>
  )
}
