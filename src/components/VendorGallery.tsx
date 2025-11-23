import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, FileText, Info } from 'lucide-react';
import { VendorCard } from '../types';
import { aiVendors } from '../data/vendors';
import { GalleryCard } from './GalleryCard';
import { statNames, statIcons } from '../constants/stats';
import { StatKey } from '../types';

export const VendorGallery: React.FC = () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const selectedVendor = aiVendors.find(v => v.name === selectedId);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-8 text-center">AI Vendor Gallery</h1>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {aiVendors.map((vendor) => (
                        <GalleryCard
                            key={vendor.name}
                            vendor={vendor}
                            isSelected={selectedId === vendor.name}
                            onClick={() => setSelectedId(vendor.name)}
                        />
                    ))}
                </div>

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
                                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
                            />

                            {/* Expanded View Container */}
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                                <div className="w-full max-w-6xl h-[80vh] flex gap-8 pointer-events-auto">

                                    {/* Left Side: The Card */}
                                    <motion.div
                                        layoutId={`card-${selectedVendor.name}`}
                                        className="w-1/3 h-full"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    >
                                        <div className={`${selectedVendor.color} rounded-2xl p-6 h-full text-white shadow-2xl flex flex-col overflow-y-auto`}>
                                            <div className="text-center mb-6">
                                                <motion.h3 layoutId={`title-${selectedVendor.name}`} className="text-lg font-bold opacity-80 uppercase tracking-wider mb-2">
                                                    AI Vendor
                                                </motion.h3>
                                                <div className="bg-white/20 rounded-xl px-4 py-3">
                                                    <motion.h4 layoutId={`name-${selectedVendor.name}`} className="text-3xl font-bold">
                                                        {selectedVendor.name}
                                                    </motion.h4>
                                                </div>
                                            </div>

                                            <div className="space-y-4 flex-1">
                                                {Object.entries(statNames).map(([key, name]) => {
                                                    const Icon = statIcons[key as StatKey];
                                                    return (
                                                        <div key={key} className="flex items-center justify-between bg-white/10 rounded-lg px-4 py-3">
                                                            <div className="flex items-center gap-3">
                                                                <Icon size={20} className="text-white/80" />
                                                                <span className="font-medium text-white/90">{name}</span>
                                                            </div>
                                                            <span className="text-xl font-bold">{selectedVendor[key as StatKey]}</span>
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
                                        className="w-2/3 h-full bg-white/10 backdrop-blur-md rounded-2xl p-8 text-white overflow-y-auto border border-white/20 shadow-2xl relative"
                                    >
                                        <button
                                            onClick={() => setSelectedId(null)}
                                            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                                        >
                                            <X size={24} />
                                        </button>

                                        <div className="space-y-8">
                                            {/* Description */}
                                            <div>
                                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                                    <Info className="text-blue-400" />
                                                    About {selectedVendor.name}
                                                </h2>
                                                <p className="text-lg leading-relaxed text-white/90 bg-black/20 p-6 rounded-xl">
                                                    {selectedVendor.description}
                                                </p>
                                            </div>

                                            {/* Case Studies */}
                                            <div>
                                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                                    <FileText className="text-green-400" />
                                                    Case Studies
                                                </h2>
                                                {selectedVendor.case_studies && selectedVendor.case_studies.length > 0 ? (
                                                    <div className="grid gap-4">
                                                        {selectedVendor.case_studies.map((study, index) => (
                                                            <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                                                                <h3 className="text-xl font-bold text-yellow-300 mb-2">{study.title}</h3>
                                                                <p className="text-white/80">{study.summary}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-white/50 italic">No case studies available.</p>
                                                )}
                                            </div>

                                            {/* Contact Emails */}
                                            <div>
                                                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                                    <Mail className="text-purple-400" />
                                                    Contact Information
                                                </h2>
                                                {selectedVendor.contact_emails && selectedVendor.contact_emails.length > 0 && selectedVendor.contact_emails[0] !== "" ? (
                                                    <div className="flex flex-wrap gap-3">
                                                        {selectedVendor.contact_emails.map((email, index) => (
                                                            <a
                                                                key={index}
                                                                href={`mailto:${email}`}
                                                                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                                            >
                                                                <Mail size={16} />
                                                                {email}
                                                            </a>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-white/50 italic">No contact information available.</p>
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
