import React, { useState, useEffect } from 'react';
import { 
  Shuffle, RotateCcw, Trophy, Zap, Cog, Brain, Puzzle, 
  Users, Eye, GraduationCap, Code, Scale, Shield, 
  Headphones, DollarSign, Info 
} from 'lucide-react';
import seedData from './seed.json';

interface VendorCard {
  name: string;
  taskOrchestration: number;
  contextManagement: number;
  integration: number;
  multiAgent: number;
  humanOversight: number;
  selfImprovement: number;
  developmentEase: number;
  scalability: number;
  securityCompliance: number;
  vendorSupport: number;
  costEffectiveness: number;
  color: string;
  description: string;
  slug?: string;
  summary?: string;
  case_studies?: { title: string; summary: string }[];
  contact_emails?: string[];
}

const generateRandomColor = () => {
  const colors = [
    "bg-gradient-to-br from-blue-500 to-blue-700",
    "bg-gradient-to-br from-purple-500 to-purple-700",
    "bg-gradient-to-br from-green-500 to-green-700",
    "bg-gradient-to-br from-red-500 to-red-700",
    "bg-gradient-to-br from-orange-500 to-orange-700",
    "bg-gradient-to-br from-indigo-500 to-indigo-700",
    "bg-gradient-to-br from-teal-500 to-teal-700",
    "bg-gradient-to-br from-pink-500 to-pink-700",
    "bg-gradient-to-br from-yellow-500 to-yellow-700",
    "bg-gradient-to-br from-cyan-500 to-cyan-700",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const aiVendors: VendorCard[] = seedData.map(vendor => ({
  ...vendor,
  color: generateRandomColor(),
  description: vendor.summary || "No description available.",
}));

const statNames = {
  taskOrchestration: "Task Orchestration",
  contextManagement: "Context Management",
  integration: "Integration",
  multiAgent: "Multi-Agent",
  humanOversight: "Human Oversight",
  selfImprovement: "Self-Improvement",
  developmentEase: "Development Ease",
  scalability: "Scalability",
  securityCompliance: "Security & Compliance",
  vendorSupport: "Vendor Support",
  costEffectiveness: "Cost-Effectiveness"
};

const statIcons = {
  taskOrchestration: Cog,
  contextManagement: Brain,
  integration: Puzzle,
  multiAgent: Users,
  humanOversight: Eye,
  selfImprovement: GraduationCap,
  developmentEase: Code,
  scalability: Scale,
  securityCompliance: Shield,
  vendorSupport: Headphones,
  costEffectiveness: DollarSign
};

const statDescriptions = {
  taskOrchestration: "An agentic AI should be able to reason about a goal, break it into sub-tasks, and carry out multi-step workflows with minimal human guidance.",
  contextManagement: "Memory management capabilities let an AI agent \"remember\" prior user inputs, decisions, or relevant data so it can carry context from one step to the next.",
  integration: "An agentic AI solution must connect with the external tools, data sources, and enterprise systems required to get work done. Top platforms offer extensive integration capabilities, allowing agents to call APIs, databases, CRMs, web services, or other applications as part of their workflow.",
  multiAgent: "Some advanced agentic platforms support multi-agent systems, where multiple AI agents with specialized roles can work in tandem. This capability allows one agent to delegate sub-tasks to others or for a \"team\" of agents to cooperate towards a goal. When evaluating tools, consider if they support orchestrating multiple agents and how they manage inter-agent communication and coordination.",
  humanOversight: "Agents should gracefully defer to humans when needed. Agentic AI solutions often operate in environments where human users or operators are involved, so it's key to assess how the AI interacts with people and allows human-in-the-loop oversight. Consider the agent's user interaction channels: Can it communicate via multiple channels (chat interface, email, messaging apps, voice, etc.)?",
  selfLearning: "Ability to learn from experience and adapt over time. Check if the tool supports fine-tuning on domain-specific data or incremental learning so it can be customized and get smarter in your context.",
  developmentEase: "The ease with which your team can develop, configure, and maintain the AI agent. Look for low-code or no-code development features. For code-centric frameworks, a well-documented SDK and modular design with pre-built templates or modules for common tasks can speed up implementation.",
  scalability: "Evaluate whether the solution can handle increasing workloads, complex tasks, and large user bases without degradation in performance. Key questions include: Can the platform scale from a small pilot to a production system with thousands of users or agents?",
  securityCompliance: "Any enterprise-ready agentic AI tool must meet high standards for security and compliance. When evaluating, verify that the vendor or platform adheres to industry security certifications and regulations (for example, SOC 2 Type II, ISO 27001, GDPR, CCPA, etc.)",
  vendorSupport: "For long term viability check the vendor backing for a platform. Review case studies to verify clients with successful stories. How strong is the community behind the platform? What guarantees does the vendor offer and is there any history of that to verify.",
  price: "Agentic AI tools vary widely in pricing models. Some charge by usage (API calls or number of agents), others by seat or subscription tier, and some might be included as features in a larger platform. Ensure there is pricing transparency with no hidden fees, and consider the total cost including any needed add-ons (e.g. premium support, extra modules)."
};

function TopTrumpsGame() {
  const [playerCard, setPlayerCard] = useState<VendorCard | null>(null);
  const [computerCard, setComputerCard] = useState<VendorCard | null>(null);
  const [selectedStat, setSelectedStat] = useState<keyof VendorCard | null>(null);
  const [gameState, setGameState] = useState('start'); // 'start', 'comparing', 'result'
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [usedCards, setUsedCards] = useState<string[]>([]);
  const [winner, setWinner] = useState<'player' | 'computer' | 'tie' | null>(null);
  const [playerCardFlipped, setPlayerCardFlipped] = useState(false);
  const [computerCardFlipped, setComputerCardFlipped] = useState(false);

  const getRandomCard = () => {
    const availableCards = aiVendors.filter(card => !usedCards.includes(card.name));
    if (availableCards.length === 0) return null;
    return availableCards[Math.floor(Math.random() * availableCards.length)];
  };

  const startNewRound = () => {
    const newPlayerCard = getRandomCard();
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
    
    setPlayerCard(newPlayerCard);
    setUsedCards(prev => [...prev, newPlayerCard.name]);
    
    const newComputerCard = getRandomCard();
    setComputerCard(newComputerCard);
    if (newComputerCard) {
      setUsedCards(prev => [...prev, newComputerCard.name]);
    }
    
    setSelectedStat(null);
    setGameState('start');
    setPlayerCardFlipped(false);
    setComputerCardFlipped(false);
  };

  const compareStat = (stat: keyof VendorCard) => {
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
    startNewRound();
  };

  useEffect(() => {
    startNewRound();
  }, []);

  const StatButton = ({ stat, value, disabled, isSelected, isPlayerCard = true }) => {
    const Icon = statIcons[stat];
    return (
      <button
        onClick={() => isPlayerCard && compareStat(stat)}
        disabled={disabled || !isPlayerCard}
        className={`px-3 py-2 rounded border transition-all duration-300 text-left w-full ${
          isSelected 
            ? 'border-yellow-300 bg-white/30 shadow-md' 
            : disabled || !isPlayerCard
              ? 'border-white/20 bg-white/10' 
              : 'border-white/30 hover:border-white/50 hover:bg-white/20 cursor-pointer'
        }`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Icon size={16} className="shrink-0" />
            <span className="text-sm font-medium">{statNames[stat]}</span>
          </div>
          <span className={`text-xl font-bold ml-3 ${isSelected ? 'text-yellow-200' : 'text-white'}`}>
            {value}
          </span>
        </div>
      </button>
    );
  };

  const Card = ({ vendor, title, showStats = true, isRevealed = true, isPlayerCard = true, isFlipped, onFlip }) => {
    return (
      <div className="w-full h-full relative" style={{ perspective: '1000px' }}>
        <div 
          className="relative w-full h-full transition-transform duration-700"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* Front of card - Stats */}
          <div 
            className="absolute inset-0"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className={`${vendor?.color || 'bg-gray-500'} rounded-lg p-5 h-full text-white shadow-xl flex flex-col`}>
              <div className="text-center mb-4">
                <h3 className="text-base font-bold mb-3">{title}</h3>
                {vendor && (
                  <div className="bg-white/20 rounded px-4 py-3 mb-4">
                    <div className="flex items-center justify-center gap-3">
                      <h4 className="text-xl font-bold">{vendor.name}</h4>
                      <button
                        type="button"
                        onClick={onFlip}
                        className="bg-white/30 hover:bg-white/40 rounded-full p-2 transition-colors duration-300 flex-shrink-0 border border-white/20"
                        title="Learn more about this solution"
                      >
                        <Info size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {vendor && showStats && isRevealed && (
                <div className="space-y-2 flex-1 overflow-y-auto">
                  {Object.entries(statNames).map(([key, name]) => (
                    <StatButton
                      key={key}
                      stat={key}
                      value={vendor[key]}
                      disabled={gameState !== 'start'}
                      isSelected={selectedStat === key}
                      isPlayerCard={isPlayerCard}
                    />
                  ))}
                </div>
              )}
              
              {!isRevealed && (
                <div className="flex items-center justify-center flex-1">
                  <div className="text-6xl opacity-50">?</div>
                </div>
              )}
            </div>
          </div>
          
          {/* Back of card - Description */}
          <div 
            className="absolute inset-0"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <div className={`${vendor?.color || 'bg-gray-500'} rounded-lg p-5 h-full text-white shadow-xl flex flex-col`}>
              <div className="text-center mb-4">
                <h3 className="text-base font-bold mb-3">{title}</h3>
                {vendor && (
                  <div className="bg-white/20 rounded px-4 py-3 mb-4">
                    <div className="flex items-center justify-center gap-3">
                      <h4 className="text-xl font-bold">{vendor.name}</h4>
                      <button
                        type="button"
                        onClick={onFlip}
                        className="bg-white/30 hover:bg-white/40 rounded-full p-2 transition-colors duration-300 flex-shrink-0 border border-white/20"
                        title="Back to stats"
                      >
                        <RotateCcw size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {vendor && (
                <div className="flex-1 flex items-center">
                  <div className="bg-white/10 rounded-lg p-4 h-full w-full overflow-y-auto">
                    <h5 className="text-lg font-semibold mb-3 text-center">About this Solution</h5>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {vendor.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

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
                const Icon = statIcons[key];
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

export default TopTrumpsGame;