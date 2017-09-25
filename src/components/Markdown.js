// @flow

import React from 'react'
import { observer } from 'mobx-react'
import store from '../store'
import debounce from 'lodash-es/debounce'

import Button from 'material-ui/Button'
import Snackbar from 'material-ui/Snackbar'

import MarkdownIt from 'markdown-it'
import 'typeface-roboto-mono'
import 'typeface-fira-mono'
import Highlight from 'highlightjs'

import '../style/dist/markdown.css'
import '../style/dist/markdown-vue.css'
import '../style/dist/markdown-gitbook.css'
import 'highlightjs/styles/dracula.css'

const MarkdownRender = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: (src, lang) => {
    if (lang && Highlight.getLanguage(lang)) {
      try {
        return (
          '<div class="hljs">' +
          Highlight.highlight(lang, src).value +
          '</div>'
        )
      } catch (e) {}
      try {
        return (
          '<div class="hljs">' +
          Highlight.highlightAuto(src).value +
          '</div>'
        )
      } catch (e) {}
      return src
    }
  }
})

document.onscroll = debounce(() => {
  if (window.location.hash !== '#/reader') {
    return
  }

  const scroll = window.scrollY
  const recentFiles = store.recentFiles.slice()
  recentFiles[store.currentReading].scroll = scroll
  store.updateCurrentFileScroll(scroll)
  localStorage.setItem('recentFiles', JSON.stringify(recentFiles))
}, 500)

export default observer(({ history }) => (
  <div>
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={store.ui.comeBackSnackbar}
      autoHideDuration={5000}
      onRequestClose={store.toggleComeBackSnackbar}
      message="Welcome back! Would you like to be back to last position?"
      action={[
        <Button key="ok" color="accent" dense onClick={() => {
          window.scrollTo(
            0,
            store.recentFiles[store.currentReading].scroll
          )
          store.toggleComeBackSnackbar()
        }}>OK</Button>
      ]}
    />
    <div className={`markdown-${store.markdownStyle} padding`}
         dangerouslySetInnerHTML={{
           __html: MarkdownRender.render(store.markdown)
         }} />
    <Button
      raised
      color="primary"
      className="btn-back"
      onClick={() => history.go(-1)}
    >
      Back
    </Button>
  </div>
))
