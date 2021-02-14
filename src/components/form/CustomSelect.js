import * as React from 'react'
import clsx from 'clsx'
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
      marginTop: '1rem',
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

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <FormControl
      variant='filled'
      className={clsx({ [classes.customSelect]: props.marginTop })}
    >
      <InputLabel id='select-bookmark-input'>Category</InputLabel>
      <Select
        id='bookmark-category'
        labelId='bookmark-category'
        name={props.name}
        open={open}
        value={props.category}
        onChange={props.setCategory}
        onClose={handleClose}
        onOpen={handleOpen}
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
