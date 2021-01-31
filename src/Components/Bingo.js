import React, { useState, useEffect } from 'react'
import Confetti from './Confetti'

const Bingo = ({ grid, centre, size }) => {
    const [isBingo, setIsBingo] = useState(false)
    const [state, setState] = useState({
        grid: grid,
        selection: { [centre]: true },
        size
    });
    const copyObject = (obj) => {
        return Object.assign({}, obj);
    }

    const checkRow = (row) => {
        const size = state.size;
        const rowStart = row * size;
        for (let i = rowStart; i < rowStart + size; i++) {
            if (!state.selection[i]) {
                //console.log('- Bingo in row ' + row + '? Fail at cell ' + i);
                return false;
            }
        }
        //console.log('- Bingo in row ' + row + '? Success!');
        return true;
    }

    const checkCol = (col) => {
        const size = state.size;
        for (let j = col; j < size * size; j += size) {
            if (!state.selection[j]) {
                //console.log('- Bingo in col ' + col + '? Fail at cell ' + j);
                return false;
            }
        }
        //console.log('- Bingo in col ' + col + '? Success!');
        return true;
    }

    /* Upper left to lower right */
    const checkDiagonalA = (row, col) => {
        const size = state.size;
        if (row === col) {
            for (let i = 0; i < size; i++) {
                if (!state.selection[size * i + i]) {
                    //console.log('- Bingo in diagonal A? Fail at cell ' + (size * i + i));
                    return false;
                }
            }
            //console.log('- Bingo in diagonal A? Success!');
            return true;
        }
    }

    /* Upper right to lower left */
    const checkDiagonalB = (row, col) => {
        const size = state.size;
        if (row === (size - col - 1)) {
            for (let i = 0; i < size; i++) {
                if (!state.selection[size * i + size - i - 1]) {
                    //console.log('- Bingo in diagonal B? Fail at cell ' + (size * i + size - i - 1));
                    return false;
                }
            }
            //console.log('- Bingo in diagonal B? Success!')
            return true;
        }
    }

    const checkBingo = () => {
        if (state.activeRow !== undefined && state.activeCol !== undefined) {
            if (
                checkRow(state.activeRow) ||
                checkCol(state.activeCol) ||
                checkDiagonalA(state.activeRow, state.activeCol) ||
                checkDiagonalB(state.activeRow, state.activeCol)
            ) {
                if (!isBingo)
                    setIsBingo(true)
            }
            else {
                setIsBingo(false)
            }
        }
    }
    useEffect(() => {
        checkBingo()
        return () => { }
        //eslint-disable-next-line
    }, [state])

    const renderRow = (row, y) => {
        return (
            <React.Fragment key={y}>
                {row.map((cell, x) => { return renderCell(cell, y, x); })}
            </React.Fragment>
        );
    }
    const renderCell = (cell, row, col) => {
        const selected = state.selection[cell.id] ? true : false;
        return (
            <div
                key={cell.id}
                className={`
                        bg-yellow-50 
                        md:m-1 
                        md:p-10
                        text-xs md:text-base
                        rounded
                        border
                        shadow
                        transition 
                        duration-150 
                        ease-in-out 
                        transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:transform-none
                        border-black-100 
                        hover:border-red-500 
                        cursor-pointer
                        ${selected && "bg-blue-300 border-red-500"}`}

                onClick={() => {
                    if (cell.id !== centre) {
                        let selection = copyObject(state.selection);
                        selection[cell.id] = !selected;
                        setState({
                            ...state,
                            selection: selection,
                            activeCell: cell.id,
                            activeRow: row,
                            activeCol: col
                        });
                        // setClick(Math.random())
                    }
                }}
            >
                <p style={{ textDecoration: state.selection[cell.id] && 'line-through' }}>{cell.value}</p>
            </div>
        );
    }
    return (
        <>
            <div className="grid grid-cols-5 gap-1 md:gap-2 m-1">
                {state.grid.map((row, y) => { return (renderRow(row, y)) })}
            </div>
            {isBingo && <Confetti />}
        </>
    )
}

export default Bingo
