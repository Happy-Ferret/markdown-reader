// @flow

import React from 'react'
import { Button } from 'material-ui'
import store from '../store'

function chooseFile({ push }) {
  const el = document.createElement('input')
  el.type = 'file'
  el.onchange = ({ target }) => {
    const { files } = target
    if (files.length !== 1) {
      return
    }

    const reader = new FileReader()
    reader.onload = ({ target }) => {
      store.loadMarkdown(target.result, files[0].name)
      push('/reader')
    }
    reader.readAsText(files[0])
  }
  el.click()
}

export default ({ history }) => (
  <Button color="accent" onClick={() => chooseFile(history)}>
    Open a file
  </Button>
)
