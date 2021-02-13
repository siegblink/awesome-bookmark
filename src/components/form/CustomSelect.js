import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const { useState } = React

const useStyles = makeStyles(function () {
  return {
    customSelect: {
      width: '100%',
    },
  }
})

const tabNames = [
  'Personal',
  'Github',
  'Important',
  'Libraries',
  'Tools',
  'Others',
]

export default function CustomSelect(props) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const { name, category, handleCategoryChange } = props

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <FormControl variant='filled' className={classes.customSelect}>
      <InputLabel id='select-bookmark-input'>Category</InputLabel>
      <Select
        name={name}
        labelId='bookmark-category'
        id='bookmark-category'
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={category}
        onChange={handleCategoryChange}
      >
        {tabNames.map((tabName) => {
          return (
            <MenuItem key={tabName} value={tabName}>
              {tabName}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}
