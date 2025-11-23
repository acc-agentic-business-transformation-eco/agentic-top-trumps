import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, FileText, Info, Search, SortAsc, Palette } from 'lucide-react';
import { aiVendors } from '../data/vendors';
import { GalleryCard } from './GalleryCard';
import { statNames, statIcons } from '../constants/stats';
import { StatKey, Theme } from '../types';

type SortOption = 'name' | StatKey;

export const VendorGallery: React.FC = () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<SortOption>('name');

    // Initialize theme from localStorage or default to 'light'
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem('theme');
        return (savedTheme as Theme) || 'light';
    });

    // Persist theme changes to localStorage
    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    const selectedVendor = aiVendors.find(v => v.name === selectedId);

    const filteredAndSortedVendors = useMemo(() => {
        let result = [...aiVendors];

        // Filter
        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            result = result.filter(v =>
                v.name.toLowerCase().includes(lowerTerm) ||
                v.description.toLowerCase().includes(lowerTerm)
            );
        }

        // Sort
        result.sort((a, b) => {
            if (sortBy === 'name') {
                return a.name.localeCompare(b.name);
            }
            // Sort stats descending (higher is better)
            return (b[sortBy] as number) - (a[sortBy] as number);
        });

        return result;
    }, [searchTerm, sortBy]);

    // Theme-based styles for the main container and controls
    const getThemeStyles = () => {
        switch (theme) {
            case 'dark':
                return {
                    pageBg: 'bg-slate-900',
                    text: 'text-white',
                    inputBg: 'bg-slate-800',
                    inputBorder: 'border-slate-700',
                    inputText: 'text-white',
                    iconColor: 'text-slate-400',
                    expandedBg: 'bg-slate-800',
                    expandedBorder: 'border-slate-700',
                    expandedText: 'text-slate-300',
                    expandedTextPrimary: 'text-white',
                    expandedStatBg: 'bg-slate-700/50',
                    expandedStatBorder: 'border-slate-600/50',
                    closeBtn: 'bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white',
                    caseStudyBg: 'bg-slate-700/30 hover:bg-slate-700/50',
                    caseStudyBorder: 'border-slate-600/50',
                    descriptionBg: 'bg-slate-900/50 border-slate-700/50 text-slate-300'
                };
            case 'vibrant':
                return {
                    pageBg: 'bg-gray-900',
                    text: 'text-white',
                    inputBg: 'bg-gray-800',
                    inputBorder: 'border-gray-700',
                    inputText: 'text-white',
                    iconColor: 'text-gray-400',
                    expandedBg: 'bg-gray-800',
                    expandedBorder: 'border-gray-700',
                    expandedText: 'text-gray-300',
                    expandedTextPrimary: 'text-white',
                    expandedStatBg: 'bg-gray-700/50',
                    expandedStatBorder: 'border-gray-600/50',
                    closeBtn: 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white',
                    caseStudyBg: 'bg-gray-700/30 hover:bg-gray-700/50',
                    caseStudyBorder: 'border-gray-600/50',
                    descriptionBg: 'bg-black/20 border-white/10 text-gray-300'
                };
            case 'light':
            default:
                return {
                    pageBg: 'bg-slate-50',
                    text: 'text-slate-900',
                    inputBg: 'bg-white',
                    inputBorder: 'border-slate-200',
                    inputText: 'text-slate-900',
                    iconColor: 'text-slate-400',
                    expandedBg: 'bg-white',
                    expandedBorder: 'border-slate-200',
                    expandedText: 'text-slate-600',
                    expandedTextPrimary: 'text-slate-900',
                    expandedStatBg: 'bg-slate-50',
                    expandedStatBorder: 'border-slate-100',
                    closeBtn: 'bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800',
                    caseStudyBg: 'bg-white hover:shadow-md',
                    caseStudyBorder: 'border-slate-200 hover:border-blue-300',
                    descriptionBg: 'bg-slate-50 border-slate-100 text-slate-600'
                };
        }
    };

    const styles = getThemeStyles();

    return (
        <div className={`min-h-screen ${styles.pageBg} p-8 transition-colors duration-500`}>
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col xl:flex-row justify-between items-center mb-8 gap-6">
                    <h1 className={`text-3xl font-bold ${styles.text}`}>AI Vendor Gallery</h1>

                    <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
                        {/* Search */}
                        <div className="relative flex-1 sm:flex-none">
                            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${styles.iconColor}`} size={18} />
                            <input
                                type="text"
                                placeholder="Search vendors..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`${styles.inputBg} ${styles.inputText} pl-10 pr-4 py-2 rounded-lg border ${styles.inputBorder} focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none w-full sm:w-64 transition-all shadow-sm`}
                            />
                        </div>

                        {/* Sort */}
                        <div className="relative flex-1 sm:flex-none">
                            <SortAsc className={`absolute left-3 top-1/2 -translate-y-1/2 ${styles.iconColor}`} size={18} />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as SortOption)}
                                className={`${styles.inputBg} ${styles.inputText} pl-10 pr-8 py-2 rounded-lg border ${styles.inputBorder} focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none appearance-none w-full sm:w-64 cursor-pointer transition-all shadow-sm`}
                            >
                                <option value="name">Sort by Name</option>
                                {Object.entries(statNames).map(([key, name]) => (
                                    <option key={key} value={key}>Sort by {name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Theme Switcher */}
                        <div className="relative flex-1 sm:flex-none">
                            <Palette className={`absolute left-3 top-1/2 -translate-y-1/2 ${styles.iconColor}`} size={18} />
                            <select
                                value={theme}
                                onChange={(e) => setTheme(e.target.value as Theme)}
                                className={`${styles.inputBg} ${styles.inputText} pl-10 pr-8 py-2 rounded-lg border ${styles.inputBorder} focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none appearance-none w-full sm:w-48 cursor-pointer transition-all shadow-sm`}
                            >
                                <option value="light">Light Theme</option>
                                <option value="dark">Dark Theme</option>
                                <option value="vibrant">Vibrant Theme</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    <AnimatePresence mode='popLayout'>
                        {filteredAndSortedVendors.map((vendor) => (
                            <GalleryCard
                                key={vendor.name}
                                vendor={vendor}
                                isSelected={selectedId === vendor.name}
                                onClick={() => setSelectedId(vendor.name)}
                                theme={theme}
                            />
                        ))}
                    </AnimatePresence>
                </div>

                {filteredAndSortedVendors.length === 0 && (
                    <div className={`text-center py-12 ${styles.iconColor}`}>
                        <p className="text-xl">No vendors found matching "{searchTerm}"</p>
                    </div>
                )}

                {/* Selected Card Overlay */}
                <AnimatePresence>
                    {selectedId && selectedVendor && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedId(null)}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                            />

                            {/* Expanded View Container */}
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                                <div className="w-full max-w-6xl h-[85vh] flex gap-8 pointer-events-auto">

                                    {/* Left Side: The Card */}
                                    <motion.div
                                        layoutId={`card-${selectedVendor.name}`}
                                        className="w-1/3 h-full"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    >
                                        <div className={`${theme === 'vibrant' ? selectedVendor.color : styles.expandedBg} rounded-2xl p-6 h-full ${theme === 'vibrant' ? 'text-white' : styles.expandedTextPrimary} shadow-2xl flex flex-col overflow-y-auto border ${styles.expandedBorder}`}>
                                            <div className="text-center mb-6">
                                                <motion.h4 layoutId={`name-${selectedVendor.name}`} className={`text-3xl font-bold ${theme === 'vibrant' ? 'text-white' : styles.expandedTextPrimary}`}>
                                                    {selectedVendor.name}
                                                </motion.h4>
                                                <div className={`h-1 w-24 ${theme === 'vibrant' ? 'bg-white/30' : 'bg-blue-500'} mx-auto mt-4 rounded-full`} />
                                            </div>

                                            <div className="space-y-3 flex-1">
                                                {Object.entries(statNames).map(([key, name]) => {
                                                    const Icon = statIcons[key as StatKey];
                                                    return (
                                                        <div key={key} className={`flex items-center justify-between rounded-lg px-4 py-3 border ${theme === 'vibrant' ? 'bg-black/20 border-white/10' : `${styles.expandedStatBg} ${styles.expandedStatBorder}`}`}>
                                                            <div className="flex items-center gap-3">
                                                                <Icon size={20} className={theme === 'vibrant' ? 'text-white/80' : styles.iconColor} />
                                                                <span className={`font-medium ${theme === 'vibrant' ? 'text-white/90' : styles.expandedText}`}>
                                                                    {name}
                                                                </span>
                                                            </div>
                                                            <span className={`text-xl font-bold ${theme === 'vibrant' ? 'text-white' : styles.expandedTextPrimary}`}>
                                                                {selectedVendor[key as StatKey]}
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Right Side: Details Panel */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 50 }}
                                        transition={{ delay: 0.1 }}
                                        className={`w-2/3 h-full ${styles.expandedBg} rounded-2xl p-8 ${styles.expandedText} overflow-y-auto border ${styles.expandedBorder} shadow-2xl relative`}
                                    >
                                        <button
                                            onClick={() => setSelectedId(null)}
                                            className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${styles.closeBtn}`}
                                        >
                                            <X size={24} />
                                        </button>

                                        <div className="space-y-8">
                                            {/* Description */}
                                            <div>
                                                <h2 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${theme === 'vibrant' ? 'text-blue-400' : 'text-blue-600'}`}>
                                                    <Info size={24} />
                                                    About {selectedVendor.name}
                                                </h2>
                                                <p className={`text-lg leading-relaxed p-6 rounded-xl border ${styles.descriptionBg}`}>
                                                    {selectedVendor.description}
                                                </p>
                                            </div>

                                            {/* Case Studies */}
                                            <div>
                                                <h2 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${theme === 'vibrant' ? 'text-green-400' : 'text-green-600'}`}>
                                                    <FileText size={24} />
                                                    Case Studies
                                                </h2>
                                                {selectedVendor.case_studies && selectedVendor.case_studies.length > 0 ? (
                                                    <div className="grid gap-4">
                                                        {selectedVendor.case_studies.map((study, index) => (
                                                            <div key={index} className={`border rounded-xl p-6 transition-all ${styles.caseStudyBg} ${styles.caseStudyBorder}`}>
                                                                <h3 className={`text-xl font-bold mb-2 ${styles.expandedTextPrimary}`}>{study.title}</h3>
                                                                <p className={styles.expandedText}>{study.summary}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className={`${styles.iconColor} italic`}>No case studies available.</p>
                                                )}
                                            </div>

                                            {/* Contact Emails */}
                                            <div>
                                                <h2 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${theme === 'vibrant' ? 'text-purple-400' : 'text-purple-600'}`}>
                                                    <Mail size={24} />
                                                    Contact Information
                                                </h2>
                                                {selectedVendor.contact_emails && selectedVendor.contact_emails.length > 0 && selectedVendor.contact_emails[0] !== "" ? (
                                                    <div className="flex flex-wrap gap-3">
                                                        {selectedVendor.contact_emails.map((email, index) => (
                                                            <a
                                                                key={index}
                                                                href={`mailto:${email}`}
                                                                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-white font-medium shadow-sm hover:shadow-md"
                                                            >
                                                                <Mail size={16} />
                                                                {email}
                                                            </a>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className={`${styles.iconColor} italic`}>No contact information available.</p>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
