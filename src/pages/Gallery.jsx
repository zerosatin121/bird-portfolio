import { motion } from 'framer-motion';
import { useBirds } from '../hooks/useBirds';
import BirdCard from '../components/gallery/BirdCard';
import { staggerContainer, fadeInItem } from '../lib/animations';
import { Search, Filter, Loader2 } from 'lucide-react';
import { useState, useMemo } from 'react';

export default function Gallery() {
    const { birds, loading, error } = useBirds();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState('All');

    const allTags = useMemo(() => {
        const tags = new Set(['All']);
        birds.forEach(bird => {
            bird.tags?.forEach(tag => tags.add(tag));
        });
        return Array.from(tags);
    }, [birds]);

    const filteredBirds = useMemo(() => {
        return birds.filter(bird => {
            const matchesSearch = bird.english_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                bird.local_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                bird.scientific_name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTag = selectedTag === 'All' || bird.tags?.includes(selectedTag);
            return matchesSearch && matchesTag;
        });
    }, [birds, searchQuery, selectedTag]);

    if (error) {
        return (
            <div className="pt-32 pb-20 container mx-auto px-6 text-center">
                <h2 className="text-2xl font-display text-red-600 mb-4">Oops! Something went wrong</h2>
                <p className="text-secondary">{error}</p>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 min-h-screen">
            <div className="container mx-auto px-6">
                {/* Header Section */}
                <header className="mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-display font-bold text-primary-900 mb-4"
                    >
                        Avian Gallery
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-secondary font-body max-w-2xl"
                    >
                        Explore the diverse species of birds documented across various missions and observations.
                    </motion.p>
                </header>

                {/* Filter Bar */}
                <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between border-b border-primary-50 pb-8">
                    <div className="relative w-full md:max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white rounded-full border border-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-100 transition-all font-sans text-sm"
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className={`px-6 py-2 rounded-full text-[10px] font-sans tracking-widest uppercase font-bold transition-all whitespace-nowrap ${selectedTag === tag
                                    ? 'bg-primary-500 text-white shadow-md'
                                    : 'bg-white text-muted border border-primary-50 hover:border-primary-200'
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Grid */}
                <AnimatePresence mode="popLayout">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-40 gap-4">
                            <Loader2 className="animate-spin text-primary-500" size={40} />
                            <p className="font-sans text-xs tracking-widest uppercase text-muted font-bold">Loading Birds...</p>
                        </div>
                    ) : filteredBirds.length > 0 ? (
                        <motion.div
                            key="grid"
                            variants={staggerContainer}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredBirds.map(bird => (
                                <motion.div key={bird.id} variants={fadeInItem}>
                                    <BirdCard bird={bird} />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-40"
                        >
                            <div className="inline-block p-6 bg-primary-50 rounded-full mb-6">
                                <Filter className="text-primary-300" size={32} />
                            </div>
                            <h3 className="text-xl font-display font-bold text-primary-900 mb-2">No results found</h3>
                            <p className="text-secondary font-body">Try adjusting your filters or search terms.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
