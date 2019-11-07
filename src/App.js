import React from 'react'
import Layout from './hoc/Layout/Layout'
import './hoc/Layout/Layout.scss'

function App() {
  return (
      <Layout>

          <div style={{width: 400, border: '1px solid black'}} className="Layout">
              <h1>Layout works</h1>
          </div>

      </Layout>
  );
}

export default App;
