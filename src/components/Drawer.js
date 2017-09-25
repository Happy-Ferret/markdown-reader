// @flow

import React from 'react'
import Link from 'react-router-dom/Link'
import { observer } from 'mobx-react'
import store from '../store'
import { version } from '../../package.json'

import Drawer from 'material-ui/Drawer'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Collapse from 'material-ui/transitions/Collapse'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft'
import ExpandMore from 'material-ui-icons/ExpandMore'
import ExpandLess from 'material-ui-icons/ExpandLess'

import RecentFilesList from './RecentFilesList'

function switchStyleToVue() {
  store.changeStyle('vue')
  store.toggleDrawer()
}

function switchStyleToGitBook() {
  store.changeStyle('gitbook')
  store.toggleDrawer()
}

function closeDrawer() {
  store.toggleDrawer()
}

export default observer(() => (
  <Drawer open={store.ui.drawer}>
    <IconButton onClick={store.toggleDrawer}>
      <ChevronLeftIcon />
    </IconButton>
    <Divider />
    <List>
      <ListItem button onClick={store.toggleStyleChoicesShow}>
        <ListItemText primary="Markdown Style" />
        {store.ui.showStyleChoices ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={store.ui.showStyleChoices} transitionDuration="auto">
        <ListItem button onClick={switchStyleToVue}>
          <ListItemText inset primary="Vue" />
        </ListItem>
        <ListItem button onClick={switchStyleToGitBook}>
          <ListItemText inset primary="GitBook" />
        </ListItem>
      </Collapse>
      <ListItem button component={Link} to="/settings" onClick={closeDrawer}>
        <ListItemText primary="Settings" />
      </ListItem>
      <ListItem button onClick={store.toggleExpandRecentFiles}>
        <ListItemText primary="Recent Files" />
        {store.ui.showRecentFiles ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={store.ui.showRecentFiles} transitionDuration="auto">
        <RecentFilesList
          closeDrawer={closeDrawer}
          names={store.recentFilesName}
        />
      </Collapse>
      <ListItem button onClick={store.toggleDrawer}>
        <ListItemText primary={'Version ' + version} />
      </ListItem>
    </List>
  </Drawer>
))
