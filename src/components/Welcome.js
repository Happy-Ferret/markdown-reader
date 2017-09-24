// @flow

import React from 'react'
import { observer } from 'mobx-react'
import store from '../store'

import List, { ListSubheader } from 'material-ui/List'

import FileChoose from './FileChoose'
import RecentFilesList from './RecentFilesList'

export default observer(({ history }) => (
  <div style={{ paddingTop: '7px' }}>
    <FileChoose history={history} />
    <List subheader={<ListSubheader>Recent Files</ListSubheader>}>
      <RecentFilesList names={store.recentFilesName} history={history} />
    </List>
  </div>
))
