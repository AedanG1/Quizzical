import { useState } from 'react'
import './Form.css'

export default function Form(props) {
    const [answers, setAnswers] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const [score, setScore] = useState(0)

    function handleChange(event) {
        const { name, value } = event.target
        setAnswers(prevAnswers => {
            return {
                ...prevAnswers,
                [name]: value
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        let sum = 0
        props.questionsArray.forEach(question => {
            if (question.answer === answers[question.id]) {
                sum += 1
            }
        })
        setSubmitted(true)
        setScore(sum)
    }

    function restartGame(event) {
        event.preventDefault()
        setSubmitted(false)
        props.startGame()
    }

    return (
        <form>
            {props.questionsArray.map(question => {
                return <div className='question-div' key={question.id}>
                    <legend>{question.question}</legend>
                    <div className='radio-div'>
                        {question.choices.map(choice => {
                            let choiceStyle
                            if (submitted) {
                                if (choice === question.answer) {
                                    choiceStyle = { backgroundColor: '#94D7A2', border: 'none' }
                                } else if (choice === answers[question.id]) {
                                    choiceStyle = { backgroundColor: '#F8BCBC', opacity: '0.5' };
                                } else {
                                    choiceStyle = { opacity: '0.5' }
                                }
                            }
                            return <div key={choice}>
                                        <input 
                                            id={choice}
                                            name={question.id}
                                            type='radio'
                                            value={choice}
                                            onChange={handleChange}
                                            disabled={submitted}
                                        />
                                        <label style={choiceStyle} htmlFor={choice}>{choice}</label>
                                    </div>
                        })}
                    </div>
                </div>
            })}
            {submitted ?
            <div className='score-div'>
                <div className='score-msg'>You scored {score} / {props.questionsArray.length} correct answers</div>
                <button className='restart-btn' onClick={restartGame}>Try again</button> 
            </div> 
            : 
            <button className='submit-btn' onClick={handleSubmit}>Check answers</button>}
        </form>
    )
}