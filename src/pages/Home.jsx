import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { heroContainer, heroItem, staggerContainer, fadeInItem } from '../lib/animations';
import { ArrowRight, Bird, Binoculars, Map, Camera } from 'lucide-react';

const BACKGROUND_IMAGES = [
    "https://images.unsplash.com/photo-1486365227551-f3f90034a57c?auto=format&fit=crop&q=80&w=1920",
    "https://images.unsplash.com/photo-1555169062-013468b47731?auto=format&fit=crop&q=80&w=1920",
    "https://images.unsplash.com/photo-1551085254-e96b210db58a?auto=format&fit=crop&q=80&w=1920",
    "https://images.unsplash.com/photo-1497206365907-f5e630693df0?auto=format&fit=crop&q=80&w=1920",
    "https://images.unsplash.com/photo-1539664030485-a936c7d29c6e?auto=format&fit=crop&q=80&w=1920",
    "https://images.unsplash.com/photo-1504579264001-833438f93df2?auto=format&fit=crop&q=80&w=1920",
    "https://images.unsplash.com/photo-1534566991776-92e46728f72d?auto=format&fit=crop&q=80&w=1920"
];

const stats = [
    { icon: <Binoculars size={24} />, label: "Species Observed", value: "150+", color: "bg-primary-50 text-primary-600" },
    { icon: <Map size={24} />, label: "Locations Explored", value: "48", color: "bg-secondary/10 text-secondary" },
    { icon: <Camera size={24} />, label: "Moments Captured", value: "2.4k", color: "bg-accent/10 text-accent" },
];

export default function Home() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
        }, 3000); // Change image every 3 seconds
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
                {/* Dynamic Background Slideshow */}
                <div className="absolute inset-0 -z-10 bg-primary-900">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={BACKGROUND_IMAGES[currentImageIndex]}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 0.4, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${BACKGROUND_IMAGES[currentImageIndex]})` }}
                        />
                    </AnimatePresence>
                    {/* Artistic Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
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
