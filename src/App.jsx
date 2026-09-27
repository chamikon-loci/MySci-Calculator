import './style.css'
import { useState } from 'react'

function App() {
  const [input, setInput] = useState([])
  const [result, setResult] = useState(null)

  function handelClear() {
    setInput([])
    setResult(null)
  }

  function handleInput(element) {
    if(element === 0 && input.length === 1 && input[0] === 0) {
      return;
    }

    if(input[0] === 0 && typeof element === 'number') {
      setInput([element])
      return;
    } 
    
    if(typeof input[input.length - 1] === 'string' && typeof element === 'string') {
      setInput(prev => [...prev.slice(0, -1), element])
      return;
    }

    setInput(prev => [...prev, element])
  }
  
  return (
    <div className="calculator-container">
      <div className="display-container">{result !== null ? result : input}</div>

      <div className='button-container'>
          <button className='btn' onClick={() => handleInput(7)}>7</button>
          <button className='btn' onClick={() => handleInput(8)}>8</button>
          <button className='btn' onClick={() => handleInput(9)}>9</button>
          <button className='btn' onClick={() => handleInput('+')}>
            <img src='../src/images/plus.png'/>
          </button>

          <button className='btn' onClick={() => handleInput(4)}>4</button>
          <button className='btn' onClick={() => handleInput(5)}>5</button>
          <button className='btn' onClick={() => handleInput(6)}>6</button>
          <button className='btn' onClick={() => handleInput('-')}>
            <img src='../src/images/minus.png'/>
          </button>

          <button className='btn' onClick={() => handleInput(1)}>1</button>
          <button className='btn' onClick={() => handleInput(2)}>2</button>
          <button className='btn' onClick={() => handleInput(3)}>3</button>
          <button className='btn' onClick={() => handleInput('*')}>
            <img src='../src/images/multiply.png'/>
          </button>

          <button className='btn' onClick={() => handelClear()}>C</button>
          <button className='btn' onClick={() => handleInput(0)}>0</button>
          <button className='btn'>
            <img src='../src/images/equal.png'/>
          </button>

          <button className='btn' onClick={() => handleInput('/')}>
            <img src='../src/images/division.png'/>
          </button>
      </div>
    </div>  
  )
}

export default App
