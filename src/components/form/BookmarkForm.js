import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import FilledInput from '@material-ui/core/FilledInput'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import CustomSelect from './CustomSelect'

const { useState } = React

const useStyles = makeStyles(function (theme) {
  return {
    paper: {
      padding: theme.spacing(3),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(1),
    },
    textFieldGroup: {
      padding: '24px 0 8px',
      display: 'grid',
      gap: '20px',
    },
    buttonGroup: {
      padding: '16px 0',
      display: 'flex',
      justifyContent: 'flex-end',
    },
    cancelButton: {
      marginRight: '16px',
    },
  }
})

export default function BookmarkForm(props) {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [link, setLink] = useState('')
  const [category, setCategory] = useState('')
  const { setBookmarks } = props

  function changeName(event) {
    setName(event.target.value)
  }

  function changeLink(event) {
    setLink(event.target.value)
  }

  function changeCategory(event) {
    setCategory(event.target.value)
  }

  function submitBookmark(event) {
    event.preventDefault()
    if (!name && !link && !category) {
      return
    }
    if (!name || !link || !category) {
      return
    }

    console.log('Name is set to', name)
    console.log('Link is set to', link)
    console.log('Category is set to', category)

    setBookmarks({ type: 'SET_BOOKMARKS', payload: { name, link, category } })
    setName('')
    setLink('')
    setCategory('')

    props.setOpenSnackbar(true)
  }

  function clearBookmark(event) {
    event.preventDefault()
    setName('')
    setLink('')
    setCategory('')
  }

  return (
    <Paper className={classes.paper}>
      <Typography variant='h5'>Add new bookmark</Typography>
      <Typography color='textSecondary'>
        Enter the bookmark name, url, and category.
      </Typography>
      <div className={classes.textFieldGroup}>
        <FormControl fullWidth variant='filled' className={classes.margin}>
          <InputLabel htmlFor='bookmark-name'>Name</InputLabel>
          <FilledInput
            id='bookmark-name'
            value={name}
            onChange={changeName}
          />
        </FormControl>
        <FormControl fullWidth variant='filled' className={classes.margin}>
          <InputLabel htmlFor='bookmark-link'>Link</InputLabel>
          <FilledInput
            id='bookmark-link'
            value={link}
            onChange={changeLink}
          />
        </FormControl>
        <CustomSelect
          category={category}
          setCategory={changeCategory}
        />
      </div>
      <div className={classes.buttonGroup}>
        <Button
          color='primary'
          className={classes.cancelButton}
          onClick={clearBookmark}
        >
          Clear
        </Button>
        <Button variant='contained' color='primary' onClick={submitBookmark}>
          Add bookmark
        </Button>
      </div>
    </Paper>
  )
}
