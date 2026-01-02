import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { heroContainer, heroItem } from '../lib/animations';
import { ArrowRight, Bird } from 'lucide-react';

export default function Home() {
    return (
        <div className="relative min-h-screen flex flex-col justify-center overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 -z-10 bg-background">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-100 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="container mx-auto px-6 py-20 mt-16">
                <motion.div
                    variants={heroContainer}
                    initial="hidden"
                    animate="show"
                    className="max-w-4xl"
                >
                    <motion.div variants={heroItem} className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full text-primary-600 text-[10px] font-sans tracking-widest uppercase font-bold mb-8">
                        <Bird size={14} />
                        Discover Avian Life
                    </motion.div>

                    <motion.h1
                        variants={heroItem}
                        className="text-6xl md:text-8xl font-display font-bold text-primary-900 leading-[0.9] mb-8"
                    >
                        Nature's <span className="text-secondary italic">Untold</span> Stories.
                    </motion.h1>

                    <motion.p
                        variants={heroItem}
                        className="text-lg md:text-xl text-secondary font-body max-w-xl mb-12 leading-relaxed"
                    >
                        A curated portfolio capturing the fleeting moments of avian beauty, documenting species, and tracing the journeys of feathers across the globe.
                    </motion.p>

                    <motion.div variants={heroItem} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <Link
                            to="/gallery"
                            className="group px-8 py-4 bg-primary-500 text-white rounded-full font-sans text-xs tracking-widest uppercase font-bold flex items-center gap-3 hover:bg-primary-600 transition-all shadow-lg shadow-primary-200"
                        >
                            Explore Gallery
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            to="/about"
                            className="px-8 py-4 text-text font-sans text-xs tracking-widest uppercase font-bold hover:text-primary-600 transition-colors"
                        >
                            Meet the Watcher
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
