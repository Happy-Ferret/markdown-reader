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
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { blue } from 'material-ui/colors'

import Drawer from './components/Drawer'
import Markdown from './components/Markdown'
import Welcome from './components/Welcome'
import Settings from './components/Settings'

const theme = createMuiTheme({
  palette: {
    primary: blue
  }
})

class App extends Component {
  render() {
    return (
      <HashRouter>
        <MuiThemeProvider theme={theme}>
          <div>
            <AppBar
              position="static"
              style={{ position: 'fixed' }}
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
            <div style={{ paddingTop: '65px' }}>
              <Route exact path="/" component={Welcome} />
              <Route path="/reader" component={Markdown} />
              <Route path="/settings" component={Settings} />
            </div>
            <Drawer />
          </div>
        </MuiThemeProvider>
      </HashRouter>
    )
  }
}

export default observer(App)
