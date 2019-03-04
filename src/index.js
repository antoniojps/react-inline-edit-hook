import React, { useState, useEffect, useRef, useMemo } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import './styles.css'

function App() {
  const elementToEdit = useRef(null)

  const [value, setValue] = useState('Hello CodeSandbox')
  const [isEditing, setIsEditing] = useState(false)
  const isKeyEnterPressed = useKeyPress('Enter')

  useOnClickOutside(elementToEdit, () => {
    setIsEditing(false)
  })

  useEffect(() => {
    if (isEditing && isKeyEnterPressed) setIsEditing(false)
  }, [isEditing, isKeyEnterPressed])

  const computeEditingClasses = isEditing => {
    if (isEditing) return 'isEditable--editing'
    return 'isEditable'
  }
  const isEditingClasses = useMemo(() => computeEditingClasses(isEditing), [
    isEditing
  ])

  return (
    <div className="App">
      <div
        onClick={() => setIsEditing(true)}
        ref={elementToEdit}
        className={isEditingClasses}
      >
        <Title>
          {isEditing ? (
            <input
              value={value}
              onChange={e => setValue(e.target.value)}
              style={{ all: 'unset', width: '100%' }}
            />
          ) : (
            value
          )}
        </Title>
      </div>
      <p>Is editing? {isEditing ? 'true' : 'false'}</p>
    </div>
  )
}

const Title = styled.div`
  color: blue;
  background-color: lightgreen;
  padding: 24px;
  text-align: left;
`

function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = event => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return
        }

        handler(event)
      }

      document.addEventListener('mousedown', listener)
      document.addEventListener('touchstart', listener)

      return () => {
        document.removeEventListener('mousedown', listener)
        document.removeEventListener('touchstart', listener)
      }
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  )
}

function useKeyPress(targetKey) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false)

  // If pressed key is our target key then set to true
  function downHandler({ key }) {
    if (key === targetKey) {
      setKeyPressed(true)
    }
  }

  // If released key is our target key then set to false
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false)
    }
  }

  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return keyPressed
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
