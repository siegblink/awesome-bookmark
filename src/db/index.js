const initialFlagState = {
  openDrawer: false,
  openEditDrawer: false,
  editSuccessSnackbar: false,
  successSnackbar: false,
  errorSnackbar: false,
  deleteBookmarkSnackbar: false,
}

export const initialData = {
  personal: [
    {
      name: 'github-octodex',
      link: 'https://octodex.github.com',
      category: 'Personal',
    },
    {
      name: 'mastering-markdown-github-guide',
      link: 'https://guides.github.com/features/mastering-markdown/',
      category: 'Personal',
    },
    {
      name: 'github-high-scores',
      link: 'https://leereilly.net/github-high-scores/',
      category: 'Personal',
    },
  ],
  github: [],
  important: [],
  libraries: [],
  tools: [],
  others: [],
  // Flags data
  flags: initialFlagState,
}
