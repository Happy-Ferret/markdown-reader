import React from 'react'
import ReactDOM from 'react-dom'
import store from './store'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const recentFiles = localStorage.getItem('recentFiles')
if (recentFiles !== null) {
  store.loadRecentFiles(JSON.parse(recentFiles))
}
const autoChangeStyle = localStorage.getItem('autoChangeStyle')
if (autoChangeStyle !== null) {
  store.toggleAutoChooseStyle(autoChangeStyle === 'true')
}
if (!store.settings.autoChangeStyle) {
  const markdownStyle = localStorage.getItem('markdownStyle')
  if (markdownStyle !== null) {
    store.changeStyle(markdownStyle)
  }
}

ReactDOM.render(<App store={store} />, document.getElementById('root'))
registerServiceWorker()
