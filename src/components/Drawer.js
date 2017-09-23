// @flow

import React from 'react'
import { observer } from 'mobx-react'
import store from '../store'

import Drawer from 'material-ui/Drawer'
import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft'

import RecentFilesList from './RecentFilesList'

function switchStyleToVue() {
  store.changeStyle('vue')
}

function switchStyleToGitBook() {
  store.changeStyle('gitbook')
}

export default observer(() => (
  <Drawer open={store.ui.drawer} onBlur={store.toggleDrawer}>
    <IconButton onClick={store.toggleDrawer}>
      <ChevronLeftIcon />
    </IconButton>
    <Divider />
    <List subheader={<ListSubheader>Markdown Style</ListSubheader>}>
      <ListItem button onClick={switchStyleToVue}>
        <ListItemText primary="Vue" />
      </ListItem>
      <ListItem button onClick={switchStyleToGitBook}>
        <ListItemText primary="GitBook" />
      </ListItem>
    </List>
    <Divider />
    <RecentFilesList names={store.recentFilesName} />
  </Drawer>
))
