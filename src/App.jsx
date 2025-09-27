import { useState } from 'react'
import './App.css'
import RouterManeger from './router'

function App() {
  const [count, setCount] = useState(0)

  return (
    <RouterManeger />
  )
}

export default App
