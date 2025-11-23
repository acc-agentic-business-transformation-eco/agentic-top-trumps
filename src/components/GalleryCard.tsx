import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { VendorCard } from '../types';
import { statNames, statIcons } from '../constants/stats';
import { StatKey } from '../types';

interface GalleryCardProps {
    vendor: VendorCard;
    onClick: () => void;
    isSelected: boolean;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({ vendor, onClick, isSelected }) => {
    return (
        <motion.div
            layoutId={`card-${vendor.name}`}
            onClick={onClick}
            className={`relative w-full aspect-[3/4] cursor-pointer group ${isSelected ? 'z-50' : 'z-0'}`}
            whileHover={{ scale: isSelected ? 1 : 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            <div className={`${vendor.color} rounded-xl p-4 h-full text-white shadow-xl flex flex-col overflow-hidden relative`}>
                {/* Header */}
                <div className="text-center mb-2">
                    <motion.h3 layoutId={`title-${vendor.name}`} className="text-sm font-bold opacity-80 uppercase tracking-wider mb-1">
                        AI Vendor
                    </motion.h3>
                    <div className="bg-white/20 rounded-lg px-3 py-2">
                        <motion.h4 layoutId={`name-${vendor.name}`} className="text-lg font-bold truncate">
                            {vendor.name}
                        </motion.h4>
                    </div>
                </div>

                {/* Stats Preview (only show a few key stats in grid view) */}
                <div className="mt-4 space-y-2 flex-1">
                    {(['taskOrchestration', 'contextManagement', 'integration'] as StatKey[]).map((key) => {
                        const Icon = statIcons[key];
                        return (
                            <div key={key} className="flex items-center justify-between bg-white/10 rounded px-2 py-1.5">
                                <div className="flex items-center gap-2">
                                    <Icon size={14} className="text-white/80" />
                                    <span className="text-xs font-medium text-white/90 truncate max-w-[80px]">
                                        {statNames[key]}
                                    </span>
                                </div>
                                <span className="text-sm font-bold">{vendor[key]}</span>
                            </div>
                        );
                    })}
                    <div className="text-center mt-2">
                        <span className="text-xs text-white/60 italic">Click for more details...</span>
                    </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-xl" />
            </div>
        </motion.div>
    );
};
