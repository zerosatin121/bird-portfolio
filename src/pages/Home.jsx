import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { heroContainer, heroItem, staggerContainer, fadeInItem } from '../lib/animations';
import { ArrowRight, Bird, Binoculars, Map, Camera } from 'lucide-react';

const stats = [
    { icon: <Binoculars size={24} />, label: "Species Observed", value: "150+", color: "bg-primary-50 text-primary-600" },
    { icon: <Map size={24} />, label: "Locations Explored", value: "48", color: "bg-secondary/10 text-secondary" },
    { icon: <Camera size={24} />, label: "Moments Captured", value: "2.4k", color: "bg-accent/10 text-accent" },
];

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
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
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-12"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInItem}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className={`w-16 h-16 rounded-2xl ${stat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {stat.icon}
                                </div>
                                <h3 className="text-4xl font-display font-bold text-primary-900 mb-2">{stat.value}</h3>
                                <p className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-muted">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
