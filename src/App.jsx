import './style.css'
import { useState } from 'react'

function App() {
  const [input, setInput] = useState([])
  const [result, setResult] = useState(null)

  function handelClear() {
    setInput([])
    setResult(null)
  }

  function handleErase() {
    setInput(prev => {

      if(prev.length === 0) return prev

      let last = prev[prev.length - 1]

      if(typeof last === 'number') {
        let newNum = Math.floor(last) / 10
        let finalNum = Math.floor(newNum)

        if(finalNum === 0) {
          return prev.slice(0, -1)
        }

        return [...prev.slice(0, -1), finalNum]
      }

      return prev.slice(0, -1)
    })
  }

  function handleInput(element) {

    let last = input[input.length - 1]

    if(input.length === 0 && element === ')')
      return

    if(input.length === 0 && element === '^')
      return

    if(input.length === 0 && element === '!')
      return

    if(typeof last === 'string' && (
        element === '+' ||
        element === '-' ||
        element === '*' ||
        element === '/'
    ) && last !== 'π' && last !== 'e') {
      return
    }

    if(element === 0 && input.length === 1 && input[0] === 0)
      return

    if(input[0] === 0 && typeof element === 'number') {
      setInput([element])
      return
    }

    if((element === 'π' || element === 'e') &&
      (typeof last === 'number' || last === 'π' || last === 'e')) {

      setInput(prev => [...prev, element])
      return
    }

    if(typeof element === 'string' &&
      typeof last === 'string' &&
      last !== '(' &&
      last !== ')' &&
      last !== 'π' &&
      last !== 'e') {

      setInput(prev => [...prev.slice(0, -1), element])
      return
    }

    if(typeof last === 'number' && typeof element === 'number') {
      setInput(prev => [...prev.slice(0, -1), last * 10 + element])
      return
    }

    setInput(prev => [...prev, element])
  }


  function handleCalculation(input) {

    let expression = [...input]

    while(expression.includes('(')) {

      let left = -1
      let right = -1

      for(let i = 0; i < expression.length; i++) {

        if(expression[i] === '(') {
          left = i
        }

        if(expression[i] === ')' && left !== -1) {
          right = i
          break
        }
      }

      if(left === -1 || right === -1)
        return

      let inside = expression.slice(left + 1, right)

      let result = calculateExpression(inside)

      expression = [
        ...expression.slice(0, left),
        result,
        ...expression.slice(right + 1)
      ]
    }

    let result = calculateExpression(expression)

    setResult(result)
  }


  function calculateExpression(expression) {

    let numbers = [...expression]

    for(let i = 0; i < numbers.length; i++) {
      if(numbers[i] === 'π') {
        numbers[i] = Math.PI
      }

      if(numbers[i] === 'e') {
        numbers[i] = Math.E
      }
    }

    for(let i = 0; i < numbers.length - 1; i++) {
      if(typeof numbers[i] === 'number' &&
        typeof numbers[i + 1] === 'number') {

        numbers = [...numbers.slice(0, i + 1), '*', ...numbers.slice(i + 1)]
        i++
      }
    }

    for(let i = 0; i < numbers.length; i++) {
      if(numbers[i] === '^') {
        let left = numbers[i - 1]
        let right = numbers[i + 1]

        let result = Math.pow(left, right)

        numbers = [...numbers.slice(0, i - 1), result,...numbers.slice(i + 2)]
        i--
      }
    }

    for(let i = 0; i < numbers.length; i++) {
      if(numbers[i] === 'sqrt' || numbers[i] === '1/') {
        let right = numbers[i + 1]

        let result

        if(numbers[i] === 'sqrt') {
          result = Math.sqrt(right)
        }

        if(numbers[i] === '1/') {
          result = 1 / right
        }

        numbers = [...numbers.slice(0, i), result, ...numbers.slice(i + 2)]
        i--
      }
    }

    for(let i = 0; i < numbers.length; i++) {
      if(numbers[i] === 'log') {
        let right = numbers[i + 1]

        let result = Math.log10(right)

        numbers = [...numbers.slice(0, i), result, ...numbers.slice(i + 2)]
      }
    }

    for(let i = 0; i < numbers.length; i++) {
      if(numbers[i] === '%') {
        let left = numbers[i - 1]

        let result = left / 100

        numbers = [...numbers.slice(0, i - 1), result, ...numbers.slice(i + 1)]
        i--
      }
    }
    
    for(let i = 0; i < numbers.length; i++) {
      if(numbers[i] === '!') {
        let left = numbers[i - 1]

        let result = 1

        for(let j = 1; j <= left; j++) {
          result *= j
        }

        numbers = [ ...numbers.slice(0, i - 1), result, ...numbers.slice(i + 1)]
        i--
      }
    }

    for(let i = 0; i < numbers.length; i++) {
      if(numbers[i] === '*' || numbers[i] === '/') {
        let left = numbers[i - 1]
        let right = numbers[i + 1]

        let result

        if(numbers[i] === '*') {
          result = left * right
        }

        if(numbers[i] === '/') {
          result = left / right
        }

        numbers = [ ...numbers.slice(0, i - 1), result, ...numbers.slice(i + 2)]
        i--
      }
    }

    let result = numbers[0]

    for(let i = 1; i < numbers.length; i += 2) {
      let operator = numbers[i]
      let number = numbers[i + 1]

      if(operator === '+') {
        result += number
      }

      if(operator === '-') {
        result -= number
      }
    }

    return result
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

          <button className='btn'></button>
          <button className='btn' onClick={() => handleInput(0)}>0</button>
          <button className='btn' onClick={() => handleCalculation(input)}>
            <img src='../src/images/equal.png'/>
          </button>

          <button className='btn' onClick={() => handleInput('/')}>
            <img src='../src/images/division.png'/>
          </button>

          <button className='btn' onClick={() => handleInput('(')}>(</button>
          <button className='btn' onClick={() => handleInput(')')}>)</button>
          <button className='btn' onClick={() => handleErase()}>E</button>
          <button className='btn' onClick={() => handelClear()}>AC</button>

          <button className='btn' onClick={() => handleInput('^')}>
            <img src='../src/images/power.png' className='power-btn'/>
          </button>
          <button className='btn' onClick={() => handleInput('!')}>n!</button>
          <button className='btn' onClick={() => handleInput('sqrt')}>
            <img src='../src/images/squreroot.png' className='power-btn'/>
          </button>
          <button className='btn' onClick={() => handleInput('%')}>%</button>
          <button className='btn' onClick={() => handleInput('1/')}>1/x</button>
          <button className='btn' onClick={() => handleInput('log')}>log(n)</button>
          <button className='btn' onClick={() => handleInput('π')}>
            <img src='../src/images/pi.png' className='pi-btn'/>
          </button>
          <button className='btn' onClick={() => handleInput('e')}>
            <img src='../src/images/euler.png' className='e-btn'/>
          </button>
      </div>
    </div>  
  )
}

export default App
