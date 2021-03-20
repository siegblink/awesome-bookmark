import { useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

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

  // Declare variable for 'First letter'.
  const firstLetter = `${props.defaultCategory.slice(0, 1).toUpperCase()}`

  // Declare variable for 'Default category'.
  const defaultCategory = `${firstLetter}${props.defaultCategory.slice(1)}`

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
        value={props?.category || defaultCategory}
        onChange={props.setCategory}
        onClose={handleClose}
        onOpen={handleOpen}
        disabled={props.disabled}
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
