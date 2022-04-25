import React, { Component } from 'react'

class HomePage extends Component {
  render() {
    return (
      <main className='homepage'>
        <div className="container">
          <div>HomePage</div>
        </div>
      </main>
    )
  }
}

export default React.memo(HomePage);