/**
 * This is a 'Reducer' function that will do all of the state transformation and manipulation.
 * @param state {object} - This is the accumulated data object used by all the connected components.
 * @param action {object} - This is the object that represents the kind of transformation will be done to the state.
 */
export default function bookmarkReducer(state, action) {
  switch (action.type) {
    case 'SET_BOOKMARKS':
      return [...state, action.payload]
    case 'DELETE_BOOKMARK':
      return state.filter((bookmark) => bookmark.name !== action.payload.name)
    default:
      throw new Error('Invalid action')
  }
}
