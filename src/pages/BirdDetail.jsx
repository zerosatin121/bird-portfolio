import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    MapPin,
    TrendingUp,
    Info,
    Eye,
    Share2,
    Heart,
    Loader2
} from 'lucide-react';
import { useBirds } from '../hooks/useBirds';
import { fadeInItem, staggerContainer } from '../lib/animations';

export default function BirdDetail() {
    const { slug } = useParams();
    const { fetchBirdBySlug } = useBirds();
    const [bird, setBird] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadBird = async () => {
            setLoading(true);
            const data = await fetchBirdBySlug(slug);
            if (data) {
                setBird(data);
            } else {
                setError("Bird species not found.");
            }
            setLoading(false);
        };
        loadBird();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen pt-20 gap-4">
                <Loader2 className="animate-spin text-primary-500" size={40} />
                <p className="font-sans text-[10px] tracking-widest uppercase text-muted font-bold">Documenting Specimen...</p>
            </div>
        );
    }

    if (error || !bird) {
        return (
            <div className="pt-32 pb-20 container mx-auto px-6 text-center">
                <h2 className="text-2xl font-display text-red-600 mb-4">Observation Missing</h2>
                <p className="text-secondary mb-8">{error || "We couldn't find the bird you were looking for."}</p>
                <Link to="/gallery" className="text-primary-500 font-sans text-xs tracking-widest uppercase font-bold border-b border-primary-500 pb-1">
                    Return to Gallery
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Navigation & Actions */}
                <div className="flex justify-between items-center mb-12">
                    <Link
                        to="/gallery"
                        className="group flex items-center gap-2 text-muted hover:text-primary-600 transition-colors font-sans text-xs tracking-widest uppercase font-bold"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Gallery
                    </Link>
                    <div className="flex gap-4">
                        <button className="p-2 rounded-full border border-primary-50 text-muted hover:text-red-500 transition-colors">
                            <Heart size={18} />
                        </button>
                        <button className="p-2 rounded-full border border-primary-50 text-muted hover:text-primary-500 transition-colors">
                            <Share2 size={18} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left: Image & Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-7"
                    >
                        <div className="aspect-[3/2] rounded-3xl overflow-hidden bg-primary-50 shadow-2xl">
                            <img
                                src={bird.thumbnail || '/placeholder-bird.jpg'}
                                alt={bird.english_name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Image Gallery (Placeholder for now) */}
                        <div className="grid grid-cols-4 gap-4 mt-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="aspect-square rounded-xl bg-primary-100/50 cursor-pointer overflow-hidden border border-primary-50 hover:border-primary-200 transition-colors">
                                    <img
                                        src={bird.thumbnail || '/placeholder-bird.jpg'}
                                        alt="thumbnail"
                                        className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Info Section */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="show"
                        className="lg:col-span-5"
                    >
                        <motion.div variants={fadeInItem} className="mb-10">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-primary-50 text-primary-600 text-[10px] font-sans tracking-widest uppercase font-bold rounded-full">
                                    Verified Observation
                                </span>
                                <span className="flex items-center gap-1 text-muted text-[10px] font-sans tracking-widest uppercase font-bold">
                                    <Eye size={12} /> {bird.view_count || 0}
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-display font-bold text-primary-900 mb-2 leading-tight">
                                {bird.english_name}
                            </h1>
                            <p className="text-xl md:text-2xl text-secondary font-body italic mb-6">
                                {bird.scientific_name}
                            </p>
                            <div className="flex items-center gap-2 text-muted font-body">
                                <MapPin size={18} className="text-primary-500" />
                                <span>{bird.location}</span>
                            </div>
                        </motion.div>

                        <motion.div variants={fadeInItem} className="space-y-8">
                            {/* Description */}
                            <div>
                                <h3 className="text-xs font-sans tracking-[0.2em] uppercase font-bold text-primary-500 mb-4 border-b border-primary-50 pb-2">Description</h3>
                                <p className="text-text font-body leading-relaxed opacity-80">
                                    {bird.description || "No detailed description available for this specimen yet."}
                                </p>
                            </div>

                            {/* Status Tags */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-primary-50 rounded-2xl border border-primary-100">
                                    <p className="text-[10px] font-sans tracking-widest uppercase font-bold text-muted mb-1">Status</p>
                                    <div className="flex items-center gap-2 text-primary-700 font-display font-bold text-lg">
                                        <TrendingUp size={16} />
                                        {bird.population_status || "Unknown"}
                                    </div>
                                </div>
                                <div className="p-4 bg-secondary/5 rounded-2xl border border-secondary/10">
                                    <p className="text-[10px] font-sans tracking-widest uppercase font-bold text-muted mb-1">Local Name</p>
                                    <p className="text-secondary font-display font-bold text-lg">{bird.local_name}</p>
                                </div>
                            </div>

                            {/* Fun Fact */}
                            <div className="p-6 bg-accent/5 rounded-3xl border-2 border-accent/10 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 text-accent group-hover:scale-125 transition-transform duration-500">
                                    <Info size={40} />
                                </div>
                                <h4 className="text-[10px] font-sans tracking-widest uppercase font-bold text-accent mb-3">Bird Fact</h4>
                                <p className="text-primary-900 font-body italic italic leading-relaxed relative z-10">
                                    "{bird.fun_fact || "This bird is known for its remarkable adaptability and unique plumage."}"
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
