import React from 'react';
import { statIcons, statNames } from '../constants/stats';
import { VendorCard, StatKey } from '../types';

interface StatButtonProps {
    stat: StatKey;
    value: number;
    disabled: boolean;
    isSelected: boolean;
    isPlayerCard?: boolean;
    onSelect?: (stat: StatKey) => void;
}

export const StatButton: React.FC<StatButtonProps> = ({
    stat,
    value,
    disabled,
    isSelected,
    isPlayerCard = true,
    onSelect
}) => {
    const Icon = statIcons[stat];

    const handleClick = () => {
        if (isPlayerCard && onSelect) {
            onSelect(stat);
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={disabled || !isPlayerCard}
            className={`px-3 py-2 rounded border transition-all duration-300 text-left w-full ${isSelected
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
