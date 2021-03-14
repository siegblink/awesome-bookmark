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
      const updatedBookmarkData = state[oldData.category.toLowerCase()].map(
        (bookmark) => {
          // When the existing bookmark data finds a match, begin the update process.
          if (bookmark.name === oldData.name) {
            return { ...bookmark, name: newData.name, link: newData.link }
          }

          // Otherwise, return the existing bookmark data.
          return bookmark
        }
      )

      // Return the updated state.
      return { ...state, [oldData.category.toLowerCase()]: updatedBookmarkData }
    }

    case 'DELETE_BOOKMARK':
      return state.filter((bookmark) => bookmark.name !== action.payload.name)

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
