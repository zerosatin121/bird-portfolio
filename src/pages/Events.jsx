import { motion } from 'framer-motion';
import { useEvents } from '../hooks/useEvents';
import EventCard from '../components/events/EventCard';
import { staggerContainer, fadeInItem } from '../lib/animations';
import { Map, Loader2, Compass } from 'lucide-react';

export default function Events() {
    const { events, loading, error } = useEvents();

    if (error) {
        return (
            <div className="pt-32 pb-20 container mx-auto px-6 text-center">
                <h2 className="text-2xl font-display text-red-600 mb-4">Connection Lost</h2>
                <p className="text-secondary">{error}</p>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 min-h-screen bg-background">
            <div className="container mx-auto px-6">
                {/* Header Section */}
                <header className="mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-primary-600 text-[10px] font-sans tracking-widest uppercase font-bold mb-6 shadow-sm border border-primary-50"
                    >
                        <Compass size={14} className="animate-pulse" />
                        Expedition Log
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-display font-bold text-primary-900 mb-6"
                    >
                        Documenting the <span className="text-accent italic">Journey</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-secondary font-body max-w-2xl mx-auto leading-relaxed"
                    >
                        Chronological records of bird watching missions, capturing the spirit of discovery and the species encountered along the way.
                    </motion.p>
                </header>

                {/* Map Placeholder */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="relative h-[400px] rounded-3xl overflow-hidden bg-primary-50 mb-20 border-8 border-white shadow-2xl"
                >
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary-100/30">
                        <Map size={48} className="text-primary-300 mb-4" />
                        <h3 className="font-display text-xl font-bold text-primary-900">Interactive Observation Map</h3>
                        <p className="text-muted text-xs font-sans tracking-widest uppercase font-bold mt-2">Connecting Observations through space</p>
                    </div>
                </motion.div>

                {/* Timeline Section */}
                <div className="max-w-5xl mx-auto">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-40 gap-4">
                            <Loader2 className="animate-spin text-primary-500" size={40} />
                            <p className="font-sans text-xs tracking-widest uppercase text-muted font-bold">Unfolding History...</p>
                        </div>
                    ) : events.length > 0 ? (
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            animate="show"
                            className="relative"
                        >
                            {/* Vertical Line */}
                            <div className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-px bg-primary-100 -translate-x-1/2 hidden md:block" />

                            {events.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    variants={fadeInItem}
                                    className="relative z-10"
                                >
                                    <EventCard event={event} />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="text-center py-40">
                            <div className="inline-block p-6 bg-primary-50 rounded-full mb-6">
                                <Compass className="text-primary-300" size={32} />
                            </div>
                            <h3 className="text-xl font-display font-bold text-primary-900 mb-2">No expeditions recorded</h3>
                            <p className="text-secondary font-body">Check back later for new bird watching updates.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
