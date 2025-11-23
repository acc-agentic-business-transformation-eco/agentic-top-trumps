import React from 'react';
import { Info, RotateCcw } from 'lucide-react';
import { VendorCard, StatKey } from '../types';
import { statNames } from '../constants/stats';
import { StatButton } from './StatButton';

interface CardProps {
    vendor: VendorCard | null;
    title: string;
    showStats?: boolean;
    isRevealed?: boolean;
    isPlayerCard?: boolean;
    isFlipped: boolean;
    onFlip: () => void;
    selectedStat: StatKey | null;
    gameState: string;
    onStatSelect?: (stat: StatKey) => void;
}

export const Card: React.FC<CardProps> = ({
    vendor,
    title,
    showStats = true,
    isRevealed = true,
    isPlayerCard = true,
    isFlipped,
    onFlip,
    selectedStat,
    gameState,
    onStatSelect
}) => {
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
                                        stat={key as StatKey}
                                        value={vendor[key as StatKey] as number}
                                        disabled={gameState !== 'start'}
                                        isSelected={selectedStat === key}
                                        isPlayerCard={isPlayerCard}
                                        onSelect={onStatSelect}
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
