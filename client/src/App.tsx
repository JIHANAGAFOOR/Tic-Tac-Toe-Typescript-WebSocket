import * as React from 'react';
import { isNull, isNullOrUndefined, isUndefined } from 'util';
import './App.css';
import Board, { SquareState } from './Board';
import { calculateWinner, getWinnerLine } from './Functions';
import { GameControls } from './GameControls';

type BoardState = Array<SquareState>;

export interface AppState {
    history: Array<BoardState>,
    playSound: boolean;
    stepNumber: number;
    winner: SquareState;
    winnerLine?: Array<number>;
    xIsNext: boolean;
}

class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.reset();
    }

    reset = () => {
        const playSoundStored = localStorage.getItem('playSound');
        const playSound = isNull(playSoundStored) ? true : JSON.parse(playSoundStored);
        const history = [
            Array(9).fill(null)
        ];

        const state = {
            history,
            playSound,
            stepNumber: 0,
            winner: null,
            winnerLine: undefined,
            xIsNext: true,
        };

        if (isUndefined(this.state)) {
            this.state = state;
        } else {
            this.setState(state);
        }
    }

    handleBoardClick = (i: number) => {
        const history = this.state.history;
        // The board's current state is the latest entry in this.state.history
        const boardState = history.slice(-1).pop() as BoardState;
        // Ignore click if the square already has a value, or if the game is over
        if (!isNullOrUndefined(boardState[i]) || this.state.winner) {
            return;
        }
        // Update this square's value
        boardState[i] = this.state.xIsNext ? 'X' : 'O';
        const winner = calculateWinner(boardState);
        const winnerLine = getWinnerLine(boardState);

        this.setState({
            history: history.concat([boardState]),
            stepNumber: this.state.stepNumber + 1,
            winner,
            winnerLine,
            xIsNext: !this.state.xIsNext,
        })
    }

    jumpTo(step: number) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) ? false : true
        })
    }

    toggleSound = () => {
        const playSound = !this.state.playSound;

        localStorage.setItem('playSound', playSound.toString());
        this.setState({
            playSound
        });
    }

    getSound(): React.ReactNode {
        if (this.state.playSound) {
            return (
                <audio id="background-sound" autoPlay={true} loop={true} src="assets/sounds/electro-bass.wav"/>
            );
        }
        return null;
    }

    getStatusText():  string {
        if (this.state.winner) {
            return 'Winner: ' + this.state.winner;
        }
        else if (this.state.stepNumber >= 9) {
            return "It's a tie!";
        }
        return 'Current turn: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const status = this.getStatusText();

        return (
            <div className="App">
                <div className="game-info">
                    <div className="text-center">{status}</div>

                    
                </div>
                <div className="game-board">
                    <Board
                        squares={current}
                        winnerLine={this.state.winnerLine}
                        onClick={this.handleBoardClick}
                    />
                </div>
                <GameControls
                    toggleSound={this.toggleSound}
                    reset={this.reset}
                />
                {this.getSound()}
            </div>
        );
    }
}

export default App;