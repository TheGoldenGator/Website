import React from 'react'
import logo from './assets/vincentSpin.gif'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ textAlign: 'center', margin: 0, padding: 0 }}>
          <img src={logo} className="App-logo" alt="logo" />
          <p
            style={{
              float: 'right',
              verticalAlign: 'center',
              display: 'inline-block',
              lineHeight: '100px',
              textAlign: 'center',
            }}
          >
            <strong>This is awkward...</strong>
          </p>
        </div>
        <p>You caught me updating the site. It'll be back soon!</p>
      </header>
    </div>
  )
}

export default App
