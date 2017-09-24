// @flow

import React from 'react'
import { observer } from 'mobx-react'
import store from '../store'
import debounce from 'lodash-es/debounce'

import Button from 'material-ui/Button'
import Snackbar from 'material-ui/Snackbar'

import ReactMarkdown from 'react-markdown'
import 'typeface-roboto-mono'
import 'typeface-fira-mono'
import Highlight from 'highlightjs'

import '../style/dist/markdown.css'
import '../style/dist/markdown-vue.css'
import '../style/dist/markdown-gitbook.css'
import 'highlightjs/styles/dracula.css'

class CodeBlock extends React.Component<{ literal: string, language: string },
  null> {
  componentWillMount () {
  }

  componentDidMount () {
    this.highlight()
  }

  componentDidUpdate () {
    this.highlight()
  }

  highlight () {
    Highlight.highlightBlock(this.refs.code)
  }

  render () {
    return (
      <pre>
        <code ref="code" className={this.props.language}>
          {this.props.literal}
        </code>
      </pre>
    )
  }
}

function Code ({ literal }) {
  return <code className="not-block">{literal}</code>
}

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
    <ReactMarkdown
      className={`markdown-${store.markdownStyle} padding`}
      source={store.markdown}
      renderers={Object.assign({}, ReactMarkdown.renderers, {
        CodeBlock,
        Code
      })}
    />
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
