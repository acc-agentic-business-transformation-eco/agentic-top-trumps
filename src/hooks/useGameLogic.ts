import { useState, useEffect } from 'react';
import { VendorCard, StatKey } from '../types';
import { aiVendors } from '../data/vendors';

export const useGameLogic = () => {
    const [playerCard, setPlayerCard] = useState<VendorCard | null>(null);
    const [computerCard, setComputerCard] = useState<VendorCard | null>(null);
    const [selectedStat, setSelectedStat] = useState<StatKey | null>(null);
    const [gameState, setGameState] = useState('start'); // 'start', 'comparing', 'result'
    const [playerScore, setPlayerScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);
    const [usedCards, setUsedCards] = useState<string[]>([]);
    const [winner, setWinner] = useState<'player' | 'computer' | 'tie' | null>(null);
    const [playerCardFlipped, setPlayerCardFlipped] = useState(false);
    const [computerCardFlipped, setComputerCardFlipped] = useState(false);

    const getRandomCard = (excludeCards: string[]) => {
        const availableCards = aiVendors.filter(card => !excludeCards.includes(card.name));
        if (availableCards.length === 0) return null;
        return availableCards[Math.floor(Math.random() * availableCards.length)];
    };

    const startNewRound = () => {
        // Create a local copy of usedCards to track changes within this function execution
        let currentUsedCards = [...usedCards];

        const newPlayerCard = getRandomCard(currentUsedCards);

        if (!newPlayerCard) {
            // Game over
            if (playerScore > computerScore) {
                setWinner('player');
            } else if (computerScore > playerScore) {
                setWinner('computer');
            } else {
                setWinner('tie');
            }
            return;
        }

        // Add player card to local list so computer doesn't pick it
        currentUsedCards.push(newPlayerCard.name);
        setPlayerCard(newPlayerCard);

        const newComputerCard = getRandomCard(currentUsedCards);

        if (!newComputerCard) {
            // If computer can't get a card (e.g. odd number of total cards), end game
            if (playerScore > computerScore) {
                setWinner('player');
            } else if (computerScore > playerScore) {
                setWinner('computer');
            } else {
                setWinner('tie');
            }
            return;
        }

        setComputerCard(newComputerCard);
        currentUsedCards.push(newComputerCard.name);

        // Update the state once with all new used cards
        setUsedCards(currentUsedCards);

        setSelectedStat(null);
        setGameState('start');
        setPlayerCardFlipped(false);
        setComputerCardFlipped(false);
    };

    const compareStat = (stat: StatKey) => {
        if (!playerCard || !computerCard || !stat) return;

        setSelectedStat(stat);
        setGameState('comparing');

        setTimeout(() => {
            const playerValue = playerCard[stat];
            const computerValue = computerCard[stat];

            if (playerValue !== undefined && computerValue !== undefined) {
                if (playerValue > computerValue) {
                    setPlayerScore(prev => prev + 1);
                } else if (computerValue > playerValue) {
                    setComputerScore(prev => prev + 1);
                }
            }

            setGameState('result');
        }, 1500);
    };

    const resetGame = () => {
        setPlayerScore(0);
        setComputerScore(0);
        setUsedCards([]);
        setWinner(null);
        setPlayerCard(null);
        setComputerCard(null);
    };

    // Effect to handle reset game logic correctly
    useEffect(() => {
        if (winner === null && usedCards.length === 0 && !playerCard) {
            startNewRound();
        }
    }, [winner, usedCards, playerCard]);


    useEffect(() => {
        startNewRound();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
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
    };
};
