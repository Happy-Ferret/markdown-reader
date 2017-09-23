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

ReactDOM.render(<App store={store} />, document.getElementById('root'))
registerServiceWorker()
