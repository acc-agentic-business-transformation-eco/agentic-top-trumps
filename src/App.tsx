import React, { useState } from 'react';
import { Zap, Trophy, RotateCcw, Shuffle, Grid, Play } from 'lucide-react';
import { useGameLogic } from './hooks/useGameLogic';
import { Card } from './components/Card';
import { VendorGallery } from './components/VendorGallery';
import { statNames, statIcons, statDescriptions } from './constants/stats';
import { StatKey } from './types';

function App() {
    const [view, setView] = useState<'game' | 'gallery'>('game');
    const {
        playerCard,
        computerCard,
        selectedStat,
        gameState,
        playerScore,
        computerScore,
        usedCards,
        winner,
        playerCardFlipped,
        computerCardFlipped,
        setPlayerCardFlipped,
        setComputerCardFlipped,
        startNewRound,
        compareStat,
        resetGame,
        aiVendors
    } = useGameLogic();

    if (view === 'gallery') {
        return (
            <>
                <button
                    onClick={() => setView('game')}
                    className="fixed top-4 left-4 z-50 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg transition-colors"
                >
                    <Play size={20} /> Play Game
                </button>
                <VendorGallery />
            </>
        );
    }

    if (winner) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center p-4">
                <div className="text-center text-white">
                    <Trophy className="mx-auto mb-6 text-6xl text-yellow-400" />
                    <h1 className="text-4xl font-bold mb-4">Game Over!</h1>
                    <div className="text-2xl mb-6">
                        {winner === 'player' && "🎉 You Win!"}
                        {winner === 'computer' && "🤖 Computer Wins!"}
                        {winner === 'tie' && "🤝 It's a Tie!"}
                    </div>
                    <div className="text-xl mb-8">
                        Final Score: You {playerScore} - {computerScore} Computer
                    </div>
                    <button
                        onClick={resetGame}
                        className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold text-xl transition-colors duration-300 flex items-center gap-2 mx-auto"
                    >
                        <RotateCcw /> Play Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 p-4">
            <button
                onClick={() => setView('gallery')}
                className="fixed top-4 left-4 z-50 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg transition-colors"
            >
                <Grid size={20} /> View Gallery
            </button>

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center text-white mb-8">
                    <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
                        <Zap className="text-yellow-400" />
                        AI Vendors Top Trumps
                        <Zap className="text-yellow-400" />
                    </h1>
                    <div className="flex justify-center items-center gap-8 text-xl">
                        <div className="bg-white/20 rounded-lg px-4 py-2">
                            You: <span className="font-bold text-green-400">{playerScore}</span>
                        </div>
                        <div className="bg-white/20 rounded-lg px-4 py-2">
                            Computer: <span className="font-bold text-red-400">{computerScore}</span>
                        </div>
                        <div className="bg-white/20 rounded-lg px-4 py-2">
                            Cards Left: <span className="font-bold text-blue-400">{Math.floor((aiVendors.length - usedCards.length) / 2)}</span>
                        </div>
                    </div>
                </div>

                {/* Game State Messages */}
                {gameState === 'start' && (
                    <div className="text-center text-white mb-6">
                        <p className="text-xl">Choose a stat to compete with!</p>
                    </div>
                )}

                {gameState === 'comparing' && (
                    <div className="text-center text-white mb-6">
                        <p className="text-xl animate-pulse">Comparing {selectedStat ? statNames[selectedStat] : ''}...</p>
                    </div>
                )}

                {gameState === 'result' && (
                    <div className="text-center text-white mb-6">
                        <div className="text-xl">
                            {playerCard && computerCard && selectedStat && playerCard[selectedStat] !== undefined && computerCard[selectedStat] !== undefined && playerCard[selectedStat] > computerCard[selectedStat] && (
                                <p className="text-green-400 font-bold">You Win This Round! 🎉</p>
                            )}
                            {playerCard && computerCard && selectedStat && playerCard[selectedStat] !== undefined && computerCard[selectedStat] !== undefined && playerCard[selectedStat] < computerCard[selectedStat] && (
                                <p className="text-red-400 font-bold">Computer Wins This Round! 🤖</p>
                            )}
                            {playerCard && computerCard && selectedStat && playerCard[selectedStat] !== undefined && computerCard[selectedStat] !== undefined && playerCard[selectedStat] === computerCard[selectedStat] && (
                                <p className="text-yellow-400 font-bold">It's a Tie! 🤝</p>
                            )}
                        </div>
                        <button
                            onClick={startNewRound}
                            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-bold transition-colors duration-300 flex items-center gap-2 mx-auto"
                        >
                            <Shuffle /> Next Round
                        </button>
                    </div>
                )}

                {/* Cards */}
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="h-96">
                            <h2 className="text-xl font-bold text-white text-center mb-2">Your Card</h2>
                            <Card
                                vendor={playerCard}
                                title="Player"
                                isPlayerCard={true}
                                isFlipped={playerCardFlipped}
                                onFlip={() => setPlayerCardFlipped(!playerCardFlipped)}
                                selectedStat={selectedStat}
                                gameState={gameState}
                                onStatSelect={compareStat}
                            />
                        </div>

                        <div className="h-96">
                            <h2 className="text-xl font-bold text-white text-center mb-2">Computer's Card</h2>
                            <Card
                                vendor={computerCard}
                                title="Computer"
                                showStats={true}
                                isRevealed={gameState === 'result'}
                                isPlayerCard={false}
                                isFlipped={computerCardFlipped}
                                onFlip={() => setComputerCardFlipped(!computerCardFlipped)}
                                selectedStat={selectedStat}
                                gameState={gameState}
                            />
                        </div>
                    </div>
                </div>

                {/* Instructions */}
                <div className="mt-12 text-center text-white/80">
                    <p className="text-sm">
                        Click on a stat from your card to compete! Higher values win the round.
                        <br />
                        Win more rounds than the computer to be the Top Trumps champion!
                        <br />
                        Click the info button on any card to learn more about that AI solution.
                    </p>
                </div>

                {/* Stat Descriptions */}
                <div className="mt-16 max-w-6xl mx-auto">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                        <h2 className="text-2xl font-bold text-white text-center mb-8">Understanding the Statistics</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {Object.entries(statNames).map(([key, name]) => {
                                const Icon = statIcons[key as StatKey];
                                return (
                                    <div key={key} className="bg-white/5 rounded-lg p-4 border border-white/10">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Icon size={20} className="text-blue-300 shrink-0" />
                                            <h3 className="text-lg font-semibold text-white">{name}</h3>
                                        </div>
                                        <p className="text-white/80 text-sm leading-relaxed">
                                            {statDescriptions[key]}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
