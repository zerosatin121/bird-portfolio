import { motion } from 'framer-motion';
import { MapPin, Calendar, Bird, Info } from 'lucide-react';
import { cardVariants } from '../../lib/animations';

export default function EventCard({ event }) {
    const formattedDate = new Date(event.event_date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <motion.div
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={cardVariants}
            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-primary-50 group mb-12"
        >
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image Section */}
                <div className="relative aspect-[4/3] md:aspect-auto bg-primary-100 overflow-hidden">
                    <img
                        src={event.images?.[0]?.url || '/placeholder-bird.jpg'}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-6 left-6 flex flex-col items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg border border-primary-50">
                        <span className="text-secondary font-display font-bold text-xl leading-none">
                            {new Date(event.event_date).getDate()}
                        </span>
                        <span className="text-[10px] font-sans tracking-widest uppercase font-bold text-muted">
                            {new Date(event.event_date).toLocaleString('default', { month: 'short' })}
                        </span>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-primary-500 font-sans text-[10px] tracking-widest uppercase font-bold mb-4">
                        <Calendar size={14} />
                        {formattedDate}
                    </div>

                    <h3 className="text-3xl font-display font-bold text-primary-900 mb-4 leading-tight">
                        {event.title}
                    </h3>

                    <div className="flex items-center gap-2 text-secondary font-body mb-6">
                        <MapPin size={16} className="text-accent" />
                        <span>{event.location_name}</span>
                    </div>

                    <p className="text-text font-body opacity-80 mb-8 line-clamp-3">
                        {event.description}
                    </p>

                    <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                            {event.bird_species_spotted?.map((bird, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-primary-50 text-primary-600 text-[10px] font-sans tracking-widest uppercase font-bold rounded-full flex items-center gap-1"
                                >
                                    <Bird size={10} />
                                    {bird}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
