import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import withInlineEdit from './withInlineEdit'
import './styles.css'

function App() {
  return (
    <div className="App">
      <Title />
      <Container />
    </div>
  )
}

const Title = withInlineEdit(styled.h1`
  color: black;
`)

const Container = withInlineEdit(styled.div`
  color: blue;
  background-color: lightgreen;
  padding: 24px;
  text-align: left;
`)

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
