import { useState, useEffect } from 'react'
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
  const { category, defaultCategory, name, disabled } = props
  const { setCategory, updateCategory } = props
  const [open, setOpen] = useState(false)

  // Declare 'side effect' to automatically set a default value for 'Bookmark category'.
  useEffect(() => {
    // When the 'defaultCategory' prop is 'specified' or 'defined', then execute the 'side effect'.
    if (Boolean(defaultCategory)) {
      // Declare variable for 'First letter'.
      const firstLetter = `${defaultCategory?.slice(0, 1).toUpperCase()}`

      // Declare variable for 'Default category'.
      const parsedCategory = `${firstLetter}${defaultCategory?.slice(1)}`

      // Set the default category value.
      setCategory(parsedCategory)
    }
  }, [defaultCategory, setCategory])

  /**
   * Close the 'Select' dropdown.
   * @returns void
   */
  function closeSelect() {
    setOpen(false)
  }

  /**
   * Open the 'Select' dropdown.
   * @returns void
   */
  function openSelect() {
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
        name={name}
        open={open}
        value={category}
        onChange={updateCategory}
        onClose={closeSelect}
        onOpen={openSelect}
        disabled={disabled}
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
