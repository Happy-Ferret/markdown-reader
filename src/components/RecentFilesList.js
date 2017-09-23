// @flow

import React from 'react'
import { observer } from 'mobx-react'
import store from '../store'

import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List'

const RecentFilesList = observer(function ({ names, history }) {
  return (
    <List subheader={<ListSubheader>Recent Files</ListSubheader>}>
      {names.map((name, index) => (
        <ListItem
          button
          key={`${Math.random()}name`}
          onClick={() => {
            store.readRecentFile(index)
            if (history !== undefined) {
              history.push('/reader')
            }
          }}
        >
          <ListItemText primary={name} />
        </ListItem>
      ))}
    </List>
  )
})

export default RecentFilesList
