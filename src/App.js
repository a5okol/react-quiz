import React from 'react'
import Layout from './hoc/Layout/Layout'
import './hoc/Layout/Layout.scss'
import Quiz from './containers/Quiz/Quiz'


function App() {
  return (
      <Layout>
          <Quiz/>
      </Layout>
  );
}

export default App;
