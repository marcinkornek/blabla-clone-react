import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import chai from 'chai'
import { render, shallow, mount } from 'enzyme'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import chaiEnzyme from 'chai-enzyme'
import chaiSorted from 'chai-sorted'
import { merge } from 'lodash'
import createStore from '../../src/store/configureStore.dev.js'

const { assert, expect } = chai

chai.should()
chai.use(sinonChai)
chai.use(chaiEnzyme())
chai.use(chaiSorted)

const store = createStore()

const defaults = {
  assert,
  chai,
  expect,
  mount,
  noop: () => {},
  React,
  ReactDOM,
  render,
  shallow,
  sinon,
  sinonChai,
  store,
  __DEVELOPMENT__: true,
}

merge(global, defaults)

export default defaults
