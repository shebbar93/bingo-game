import React, { useEffect } from 'react'
import start from '../Func/DrawConfetti'

const Confetti = () => {
    useEffect(() => {
        start()
    });
    return (
        <canvas id='canvas' />
    )
}

export default Confetti
