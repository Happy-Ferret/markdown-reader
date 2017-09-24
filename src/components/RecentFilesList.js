// @flow

import React from 'react'
import { observer } from 'mobx-react'
import store from '../store'

import { ListItem, ListItemText } from 'material-ui/List'

const RecentFilesList = observer(function({ names, history }) {
  return <div>{names.map((name, index) => (
    <ListItem
      button
      key={`${Math.random()}name`}
      onClick={() => {
        store.readRecentFile(index)
        if (history !== undefined) {
          history.push('/reader')
        }
        if (store.ui.drawer) {
          store.toggleDrawer()
        }
      }}
    >
      <ListItemText inset={history === undefined} primary={name} />
    </ListItem>
  ))}</div>
})

export default RecentFilesList
