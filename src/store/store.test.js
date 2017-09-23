import store from './index'

// noinspection JSAnnotator
window.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn()
}

it('should return initial state correctly', () => {
  expect(store.markdown).toBe('')
  expect(store.markdownStyle).toBe('vue')
  expect(store.recentFiles.slice()).toEqual([])
  expect(store.ui.drawer).toBe(false)
})

it('should throw error when mutate directly', () => {
  expect(() => store.markdown = 'md').toThrow()
})
