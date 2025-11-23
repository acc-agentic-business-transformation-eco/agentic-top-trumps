import React from 'react';
import { motion } from 'framer-motion';
import { VendorCard, Theme } from '../types';
import { statNames, statIcons } from '../constants/stats';
import { StatKey } from '../types';

interface GalleryCardProps {
    vendor: VendorCard;
    onClick: () => void;
    isSelected: boolean;
    theme: Theme;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({ vendor, onClick, isSelected, theme }) => {
    // Dynamic styles based on theme
    const getThemeStyles = () => {
        switch (theme) {
            case 'dark':
                return {
                    container: 'bg-slate-800 border-slate-700 hover:border-slate-500 text-white',
                    textPrimary: 'text-slate-100',
                    textSecondary: 'text-slate-400',
                    statBg: 'bg-slate-700/50 border-slate-600/50',
                    statText: 'text-slate-300',
                    statValue: 'text-slate-200',
                    accent: 'bg-blue-500',
                    hoverOverlay: 'bg-white/5',
                    footerText: 'text-slate-500 group-hover:text-blue-400'
                };
            case 'vibrant':
                return {
                    container: `${vendor.color} border-white/20 hover:border-white/40 text-white`,
                    textPrimary: 'text-white',
                    textSecondary: 'text-white/80',
                    statBg: 'bg-black/20 border-white/10',
                    statText: 'text-white/90',
                    statValue: 'text-white',
                    accent: 'bg-white/30',
                    hoverOverlay: 'bg-black/10',
                    footerText: 'text-white/70 group-hover:text-white'
                };
            case 'light':
            default:
                return {
                    container: 'bg-white border-slate-200 hover:border-blue-300 text-slate-800',
                    textPrimary: 'text-slate-900',
                    textSecondary: 'text-slate-500',
                    statBg: 'bg-slate-50 border-slate-100 group-hover:border-blue-50',
                    statText: 'text-slate-500',
                    statValue: 'text-slate-700',
                    accent: 'bg-blue-500',
                    hoverOverlay: 'bg-blue-50/10',
                    footerText: 'text-slate-400 group-hover:text-blue-500'
                };
        }
    };

    const styles = getThemeStyles();

    return (
        <motion.div
            layoutId={`card-${vendor.name}`}
            onClick={onClick}
            className={`relative w-full aspect-[3/4] cursor-pointer group ${isSelected ? 'z-50' : 'z-0'}`}
            whileHover={{ scale: isSelected ? 1 : 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            <div className={`${styles.container} rounded-xl p-5 h-full shadow-lg hover:shadow-xl flex flex-col overflow-hidden relative border transition-all duration-300`}>
                {/* Header */}
                <div className="text-center mb-4">
                    <motion.h4 layoutId={`name-${vendor.name}`} className={`text-xl font-bold truncate ${styles.textPrimary}`}>
                        {vendor.name}
                    </motion.h4>
                    <div className={`h-0.5 w-12 mx-auto mt-2 rounded-full ${styles.accent}`} />
                </div>

                {/* Stats Preview */}
                <div className="space-y-3 flex-1">
                    {(['taskOrchestration', 'contextManagement', 'integration'] as StatKey[]).map((key) => {
                        const Icon = statIcons[key];
                        return (
                            <div key={key} className={`flex items-center justify-between rounded px-3 py-2 border transition-colors ${styles.statBg}`}>
                                <div className="flex items-center gap-2">
                                    <Icon size={14} className={`${styles.textSecondary} group-hover:text-current transition-colors`} />
                                    <span className={`text-xs font-medium truncate max-w-[90px] ${styles.statText}`}>
                                        {statNames[key]}
                                    </span>
                                </div>
                                <span className={`text-sm font-bold ${styles.statValue}`}>{vendor[key]}</span>
                            </div>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="mt-4 text-center">
                    <span className={`text-xs font-medium transition-colors duration-300 ${styles.footerText}`}>View Details</span>
                </div>

                {/* Hover Effect Overlay */}
                <div className={`absolute inset-0 transition-colors duration-300 rounded-xl pointer-events-none ${styles.hoverOverlay}`} />
            </div>
        </motion.div>
    );
};
