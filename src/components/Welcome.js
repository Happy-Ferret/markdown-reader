// @flow

import React from 'react'
import { observer } from 'mobx-react'
import store from '../store'

import FileChoose from './FileChoose'
import RecentFilesList from './RecentFilesList'

export default observer(({ history }) => (
  <div>
    <FileChoose history={history} />
    <RecentFilesList names={store.recentFilesName} history={history} />
  </div>
))
