import { useState } from 'react'
import './App.css'
import RouterManeger from './components/Router'

function App() {
  const [count, setCount] = useState(0)

  return (
    <RouterManeger />
  )
}

export default App
