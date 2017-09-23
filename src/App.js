// @flow

import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { HashRouter, Route } from 'react-router-dom'

import 'typeface-roboto'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import { blue } from 'material-ui/colors'

import Drawer from './components/Drawer'
import Markdown from './components/Markdown'
import Welcome from './components/Welcome'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <AppBar
            position="static"
            style={{ position: 'fixed', backgroundColor: blue[500] }}
          >
            <Toolbar>
              <IconButton
                color="contrast"
                aria-label="open drawer"
                onClick={this.props.store.toggleDrawer}
              >
                <MenuIcon />
              </IconButton>
              <Typography type="title" color="inherit">
                {this.props.store.appBarTitle}
              </Typography>
            </Toolbar>
          </AppBar>
          <div style={{ paddingTop: '56px' }}>
            <Route exact path="/" component={Welcome} />
            <Route path="/reader" component={Markdown} />
          </div>
          <Drawer />
        </div>
      </HashRouter>
    )
  }
}

export default observer(App)
