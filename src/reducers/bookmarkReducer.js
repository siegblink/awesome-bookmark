/**
 * This is a 'Reducer' function that will do all of the state transformation and manipulation.
 * @param state {object} - This is the accumulated data object used by all the connected components.
 * @param action {object} - This is the object that represents the kind of transformation will be done to the state.
 */
export default function bookmarkReducer(state, action) {
  switch (action.type) {
    case 'SET_BOOKMARKS': {
      // Parse the bookmark category from the payload.
      const parsedCategory = action.payload.category.toLowerCase()

      // Create a new piece of bookmark data.
      const newBookmarkData = createBookmarkData(action.payload)

      // Update the bookmark group data.
      const updatedBookmarkGroup = updateBookmarkGroup(
        state[parsedCategory],
        newBookmarkData
      )
      return { ...state, [parsedCategory]: updatedBookmarkGroup }
    }

    case 'EDIT_BOOKMARK': {
      // Get access to the payload data.
      const { oldData, newData } = action.payload

      // Replace the existing bookmark data.
      const updatedBookmark = state[oldData.category.toLowerCase()].map(
        (bookmark) => {
          // When the existing bookmark data finds a match, begin the update process.
          if (bookmark.name === oldData.name) {
            return {
              ...bookmark,
              name: newData.name,
              link: newData.link ? newData.link : oldData.link,
            }
          }

          // Otherwise, return the existing bookmark data.
          return bookmark
        }
      )

      // Return the updated state.
      return { ...state, [oldData.category.toLowerCase()]: updatedBookmark }
    }

    case 'DELETE_BOOKMARK': {
      // Get the specific bookmark entry data.
      const capturedState =
        state[action.payload.bookmark.category.toLowerCase()]

      // Execute the delete operation.
      const updatedBookmark = capturedState.filter((bookmark) => {
        return bookmark.name !== action.payload.bookmark.name
      })

      // Return the updated state.
      return {
        ...state,
        [action.payload.bookmark.category.toLowerCase()]: updatedBookmark,
      }
    }

    case 'OPEN_DRAWER': {
      const updatedFlags = { ...state.flags, openDrawer: true }
      return { ...state, flags: updatedFlags }
    }
    case 'CLOSE_DRAWER': {
      const updatedFlags = { ...state.flags, openDrawer: false }
      return { ...state, flags: updatedFlags }
    }

    case 'OPEN_EDIT_DRAWER': {
      const updatedFlags = { ...state.flags, openEditDrawer: true }
      return { ...state, flags: updatedFlags }
    }
    case 'CLOSE_EDIT_DRAWER': {
      const updatedFlags = { ...state.flags, openEditDrawer: false }
      return { ...state, flags: updatedFlags }
    }

    case 'OPEN_EDIT_SUCCESS_SNACKBAR': {
      const updatedFlags = { ...state.flags, editSuccessSnackbar: true }
      return { ...state, flags: updatedFlags }
    }
    case 'CLOSE_EDIT_SUCCESS_SNACKBAR': {
      const updatedFlags = { ...state.flags, editSuccessSnackbar: false }
      return { ...state, flags: updatedFlags }
    }

    case 'OPEN_SUCCESS_SNACKBAR': {
      const updatedFlags = { ...state.flags, successSnackbar: true }
      return { ...state, flags: updatedFlags }
    }
    case 'CLOSE_SUCCESS_SNACKBAR': {
      const updatedFlags = { ...state.flags, successSnackbar: false }
      return { ...state, flags: updatedFlags }
    }

    case 'OPEN_ERROR_SNACKBAR': {
      const updatedFlags = { ...state.flags, errorSnackbar: true }
      return { ...state, flags: updatedFlags }
    }
    case 'CLOSE_ERROR_SNACKBAR': {
      const updatedFlags = { ...state.flags, errorSnackbar: false }
      return { ...state, flags: updatedFlags }
    }

    case 'OPEN_DELETE_BOOKMARK_SNACKBAR': {
      const updatedFlags = { ...state.flags, deleteBookmarkSnackbar: true }
      return { ...state, flags: updatedFlags }
    }
    case 'CLOSE_DELETE_BOOKMARK_SNACKBAR': {
      const updatedFlags = { ...state.flags, deleteBookmarkSnackbar: false }
      return { ...state, flags: updatedFlags }
    }

    default:
      throw new Error('Invalid action')
  }
}

/**
 * This is a function that will set a piece of 'Bookmark data'.
 * @param {object} data - This is the 'payload' data.
 * @returns {object}
 */
function createBookmarkData(data) {
  const bookmarkTemplate = { name: '', link: '', category: '' }
  return { ...bookmarkTemplate, ...data }
}

/**
 * This is a function that will set the 'Bookmark group' data.
 * @param {array} existingData - This is the existing 'Bookmark group' data.
 * @param {object} newData - This is the new bookmark data that will be inserted in the existing data.
 */
function updateBookmarkGroup(existingData, newData) {
  return [...existingData, newData]
}
