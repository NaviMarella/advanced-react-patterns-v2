// Building the toggle component

import React from 'react'
 import {Switch} from '../switch'

class Toggle extends React.Component {
  state = {
    on: false
  }
  handleOnClick = () => {
    console.log('Hello');
    this.setState((prevState) => {
      return {
        on: !prevState.on
      }
    },
    () => {
      this.props.onToggle(this.state.on)
    }
    )
  }
  render() {
    // 🐨 here you'll want to return the switch with the `on` and `onClick` props
    return <Switch on={this.state.on} onClick={this.handleOnClick}/>
  }
}

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.
// You can make all the tests pass by updating the Toggle component.
function Usage({onToggle = (...args) => console.log('onToggle', ...args)}) {
  return <Toggle onToggle={onToggle} />
}
Usage.title = 'Build Toggle'

export {Toggle, Usage as default}
