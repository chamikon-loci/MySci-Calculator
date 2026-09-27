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
    )) return // ห้ามใส่ตัวดำเนินการหลังตัวดำเนินการ

    if(element === 0 && input.length === 1 && input[0] === 0) return //ป้องกัน 00

    if(input[0] === 0 && typeof element === 'number') { //ป้องกัน 0 แล้วเลขในตอนเริ่ม
      setInput([element])
      return
    }

    if(typeof element === 'string' && typeof last === 'string' && last !== '(' && last !== ')') { //เปลี่ยนตัวดำเนินการล่าสุด
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

    let balance = 0
    for(let i = 0; i < expression.length; i++) {

      if(expression[i] === '(') {
        balance++
      }

      if(expression[i] === ')') {
        balance--
      }

      if(balance < 0) {
        console.log('วงเล็บไม่สมดุล')
        return
      }
    }

    while(expression.includes('(')) {

      let innerLeft = -1
      let innerRight = -1
      for(let i = 0; i < expression.length; i++) {

        if(expression[i] === '(') {
          innerLeft = i
        }

        if(expression[i] === ')' && innerLeft !== -1) {
          innerRight = i
          break
        }
      }

      let inside = expression.slice(innerLeft + 1, innerRight)
      let result = calculateExpression(inside)
      expression = [...expression.slice(0, innerLeft), result, ...expression.slice(innerRight + 1)]
    }

    let result = calculateExpression(expression)
    setResult(result)
    } 

  function calculateExpression(expression) {
    let numbers = [...expression]

    for(let i = 0; i < numbers.length; i++) {
      if(numbers[i] === '^') {
        let left = numbers[i - 1]
        let right = numbers[i + 1]

        let result = 0
        if(numbers[i] === '^') {
          result += Math.pow(left, right)
        }
        numbers = [...numbers.slice(0, i - 1), result, ...numbers.slice(i + 2)]
      }
    }

    for(let i = 0; i < numbers.length; i++) {
      if(numbers[i] === '!') {
        let left = numbers[i - 1]

        let result = 1
        for(let j = 1; j <= left; j++) {
          result *= j
        }
        numbers = [...numbers.slice(0, i - 1), result, ...numbers.slice(i + 1)]
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

        numbers = [...numbers.slice(0, i - 1), result, ...numbers.slice(i + 2)]
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
          <button className='btn'>E</button>
          <button className='btn' onClick={() => handelClear()}>AC</button>

          <button className='btn' onClick={() => handleInput('^')}>
            <img src='../src/images/power.png' className='power-btn'/>
          </button>
          <button className='btn' onClick={() => handleInput('!')}>n!</button>
          <button className='btn'>
            <img src='../src/images/squreroot.png' className='power-btn'/>
          </button>
      </div>
    </div>  
  )
}

export default App
