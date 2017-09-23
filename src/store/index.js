// @flow

import { observable, action, useStrict, reaction } from 'mobx'

useStrict(true)

const store = observable({
  markdown: '',
  markdownStyle: 'vue',
  recentFiles: [],
  ui: {
    drawer: false
  },
  get appBarTitle () {
    if (!this.markdown.startsWith('# ')) {
      return 'Markdown Reader'
    }
    const heading = /^#\s(.*)\n/.exec(this.markdown)[1]
    return `${heading} - Markdown Reader`
  },
  get recentFilesName () {
    return this.recentFiles.map(file => file.name)
  },
  loadMarkdown: action(function (markdown: string, fileName: string) {
    this.markdown = markdown

    if (this.recentFiles.length === 25) {
      this.recentFiles.pop()
    }
    this.recentFiles.unshift({ name: fileName, content: markdown })
  }),
  changeStyle: action(function (style: 'vue' | 'gitbook') {
    this.markdownStyle = style
  }),
  toggleDrawer: action.bound(function () {
    this.ui.drawer = !this.ui.drawer
  }),
  loadRecentFiles: action(function (files) {
    this.recentFiles = files
  }),
  readRecentFile: action(function (index) {
    this.markdown = this.recentFiles[index].content
  })
})

reaction(
  () => store.appBarTitle,
  title => document.title = title
)

reaction(
  () => store.recentFiles.length,
  () => localStorage.setItem('recentFiles', JSON.stringify(store.recentFiles))
)

export default store
