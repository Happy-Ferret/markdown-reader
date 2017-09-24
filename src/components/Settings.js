// @flow

import React from 'react'
import { observer } from 'mobx-react'
import store from '../store'

import { FormControlLabel } from 'material-ui/Form'
import Switch from 'material-ui/Switch'
import Button from 'material-ui/Button'

import '../style/dist/Settings.css'

export default observer(({ history }) => (
  <div style={{ paddingLeft: '5px' }}>
    <FormControlLabel
      control={
        <Switch
          checked={store.settings.autoChangeStyle}
          onChange={store.toggleAutoChooseStyle}
        />
      }
      label="Auto choose markdown style according to content"
    />
    <Button
      raised
      color="accent"
      className="btn-back"
      onClick={() => history.go(-1)}
    >
      Back
    </Button>
  </div>
))
