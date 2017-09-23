// @flow

import React from 'react'
import { observer } from 'mobx-react'
import store from '../store'

import { Button } from 'material-ui'
import ReactMarkdown from 'react-markdown'
import 'typeface-roboto-mono'
import 'typeface-fira-mono'
import Highlight from 'highlightjs'

import '../style/dist/markdown.css'
import '../style/dist/markdown-vue.css'
import '../style/dist/markdown-gitbook.css'
import 'highlightjs/styles/dracula.css'

class CodeBlock extends React.Component<
  { literal: string, language: string },
  null
> {
  componentWillMount() {}
  componentDidMount() {
    this.highlight()
  }

  componentDidUpdate() {
    this.highlight()
  }

  highlight() {
    Highlight.highlightBlock(this.refs.code)
  }

  render() {
    return (
      <pre>
        <code ref="code" className={this.props.language}>
          {this.props.literal}
        </code>
      </pre>
    )
  }
}

function Code({ literal }) {
  return <code className="not-block">{literal}</code>
}

export default observer(({ history }) => (
  <div>
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
