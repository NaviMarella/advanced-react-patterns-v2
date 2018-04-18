// Flexible Compound Components with context

import React from 'react'
import {Switch} from '../switch'

const ToggleContext = React.createContext({on: false, toggle: () => {}})

class Toggle extends React.Component {
  // 🐨 each of these compound components will need to be changed to use
  // ToggleContext.Consumer and rather than getting `on` and `toggle`
  // from props, it'll get it from the ToggleContext.Consumer value.
  static On = ({children}) => {
    return (
      <ToggleContext.Consumer>
        {({on}) => ( on ? children : null )}
      </ToggleContext.Consumer>
    )
  }

  static Off = ({children}) => {
    return (
      <ToggleContext.Consumer>
        {({on}) => ( on ? null : children )}
      </ToggleContext.Consumer>
    )
  }

  static Button = (props) => {
    return (
      <ToggleContext.Consumer>
      {
        ({on, toggle}) => (
          <Switch on={on} onClick={toggle} {...props} />
        )
      }
      </ToggleContext.Consumer>
    )
  }

  toggle = () =>
  this.setState(
    ({on}) => ({on: !on}),
    () => this.props.onToggle(this.state.on),
  )
  state = {on: false, toggle: this.toggle}

  render() {
    // Because this.props.children is _immediate_ children only, we need
    // to 🐨 remove this map function and render our context provider with
    // this.props.children as the children of the provider. Then we'll
    // expose the on state and toggle method as properties in the context
    // value (the value prop).
    return (
      <ToggleContext.Provider value={this.state}>
        {this.props.children}
      </ToggleContext.Provider>
    )
  }
}

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.
// You can make all the tests pass by updating the Toggle component.
function Usage({onToggle = (...args) => console.log('onToggle', ...args)}) {
  return (
    <Toggle onToggle={onToggle}>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <div>
        <Toggle.Button />
      </div>
    </Toggle>
  )
}
Usage.title = 'Flexible Compound Components'

export {Toggle, Usage as default}
