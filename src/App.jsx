import { useState } from 'react'
import { nanoid } from 'nanoid'
import { decode } from 'html-entities'
import './App.css'
import Form from './Form.jsx'

function App() {
  const [started, setStarted] = useState(false)
  const [questions, setQuestions] = useState([])

  function startGame() {
    async function getQuiz() {
      try {
        const response = await fetch(`https://opentdb.com/api.php?amount=5&type=multiple`)
        if (!response.ok) {
          throw new Error('Failed to fetch quiz')
        }
        const data = await response.json()
        setQuestions(data.results.map(question => {
          const randomIndex = Math.floor(Math.random() * question.incorrect_answers.length)
          const choicesArray = question.incorrect_answers.toSpliced(randomIndex, 0, question.correct_answer).map(choice => decode(choice))
          return {
            id: nanoid(),
            question: decode(question.question),
            answer: decode(question.correct_answer),
            choices: choicesArray,
          }
        }))
      } catch(error) {
        console.error(error)
      } finally {
        setStarted(true)
      }
    }
    getQuiz()
  }

  return (
    <>
    {
      started ?
      <Form questionsArray={questions} startGame={startGame} />
      :
      <div className='start-screen'>
        <h1>Quizzical</h1>
        <h2>Answer some trivia questions!</h2>
        <button className='start-game-btn' onClick={startGame}>Start Quiz</button>
      </div>
    }
    </>
  )
}

export default App
