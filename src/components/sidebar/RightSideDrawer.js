import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import FilledInput from '@material-ui/core/FilledInput'
import Button from '@material-ui/core/Button'
import CustomSelect from '../form/CustomSelect'

const useStyles = makeStyles({
  list: {
    width: 400,
    padding: '1.5rem',
  },
  form: {
    display: 'grid',
    gap: '1rem',
  },
  currentBookmarkInfo: {
    marginTop: '2rem',
  },
  detailsContainer: {
    display: 'grid',
    gap: '1rem',
  },
})

export default function RightSideDrawer(props) {
  const classes = useStyles()
  const { open, closeDrawer, editedBookmark } = props
  const { setEditedBookmark, currentBookmarkName } = props
  const { currentBookmarkLink, currentBookmarkCategory } = props
  const { submitEditedBookmark, pathname } = props
  const { name, link } = editedBookmark

  return (
    <div>
      <Drawer anchor='right' open={open} onClose={closeDrawer}>
        <div className={classes.list} role='presentation'>
          <Typography variant='h5' gutterBottom>
            Edit bookmark
          </Typography>

          <form
            onSubmit={submitEditedBookmark({
              name: currentBookmarkName,
              link: currentBookmarkLink,
              category: currentBookmarkCategory,
            })}
            className={classes.form}
          >
            <FormControl fullWidth variant='filled'>
              <InputLabel htmlFor='bookmark-name'>Name</InputLabel>
              <FilledInput
                id='bookmark-name'
                name='name'
                value={name}
                onChange={setEditedBookmark}
              />
            </FormControl>

            <FormControl fullWidth variant='filled'>
              <InputLabel htmlFor='bookmark-link'>Link</InputLabel>
              <FilledInput
                id='bookmark-link'
                name='link'
                value={link}
                onChange={setEditedBookmark}
              />
            </FormControl>

            <CustomSelect
              name='category'
              category={`${pathname.slice(0, 1).toUpperCase()}${pathname
                .slice(1)
                .toLowerCase()}`}
              disabled
            />

            <Button
              color='primary'
              variant='contained'
              size='large'
              type='submit'
              onClick={submitEditedBookmark({
                name: currentBookmarkName,
                link: currentBookmarkLink,
                category: currentBookmarkCategory,
              })}
            >
              Save edits
            </Button>

            <Button
              variant='outlined'
              size='large'
              type='button'
              onClick={() => {}}
            >
              Cancel
            </Button>
          </form>

          <Typography
            gutterBottom
            variant='h5'
            className={classes.currentBookmarkInfo}
          >
            Details
          </Typography>
          <section className={classes.detailsContainer}>
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
          </section>
        </div>
      </Drawer>
    </div>
  )
}
