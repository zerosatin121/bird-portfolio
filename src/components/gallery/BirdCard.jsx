import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Eye, Info } from 'lucide-react';
import { cardVariants, imageVariants } from '../../lib/animations';

export default function BirdCard({ bird }) {
    return (
        <motion.div
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={cardVariants}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-primary-50 group"
        >
            <Link to={`/bird/${bird.slug}`} className="block relative">
                {/* Image Container */}
                <div className="aspect-[4/3] overflow-hidden bg-primary-100">
                    <motion.img
                        variants={imageVariants}
                        src={bird.thumbnail || '/placeholder-bird.jpg'}
                        alt={bird.english_name}
                        className="w-full h-full object-cover"
                    />

                    {/* Featured Badge */}
                    {bird.is_featured && (
                        <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-[10px] font-sans tracking-widest uppercase font-bold shadow-lg">
                            Featured
                        </div>
                    )}

                    {/* Species Type Badge (using tags) */}
                    {bird.tags?.[0] && (
                        <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm text-primary-900 px-3 py-1 rounded-full text-[10px] font-sans tracking-widest uppercase font-bold">
                            {bird.tags[0]}
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="font-display text-xl font-bold text-primary-900 leading-tight">
                                {bird.english_name}
                            </h3>
                            <p className="text-secondary text-xs italic font-body">
                                {bird.scientific_name}
                            </p>
                        </div>
                        <div className="flex items-center gap-1 text-muted text-[10px]">
                            <Eye size={12} />
                            <span>{bird.view_count || 0}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mt-6 pt-4 border-t border-primary-50">
                        <div className="flex items-center gap-1 text-muted text-xs">
                            <MapPin size={14} className="text-primary-400" />
                            <span className="truncate max-w-[120px]">{bird.location}</span>
                        </div>

                        <div className="ml-auto">
                            <div className="flex items-center gap-1 text-primary-600 text-[10px] font-sans tracking-widest uppercase font-bold group-hover:text-accent transition-colors">
                                Details
                                <Info size={12} />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
