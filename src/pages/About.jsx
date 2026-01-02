import { motion } from 'framer-motion';
import { fadeInItem, staggerContainer } from '../lib/animations';
import { Binoculars, Heart, Map, Shield } from 'lucide-react';

export default function About() {
    const values = [
        { icon: <Binoculars size={24} />, title: "Conservation", description: "Providing data and awareness to protect endangered avian species." },
        { icon: <Heart size={24} />, title: "Passion", description: "A lifelong dedication to the art of bird watching and photography." },
        { icon: <Map size={24} />, title: "Exploration", description: "Documenting species from remote rainforests to local marshes." },
        { icon: <Shield size={24} />, title: "Accuracy", description: "Scientific documentation with a commitment to ecological ethics." }
    ];

    return (
        <div className="pt-32 pb-20 overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Hero Section */}
                <section className="mb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h1 className="text-5xl md:text-7xl font-display font-bold text-primary-900 mb-8 leading-tight">
                                Behind the <span className="text-secondary italic">Lens</span>
                            </h1>
                            <p className="text-lg text-secondary font-body mb-8 leading-relaxed">
                                Welcome to my avian journal. My name is [Your Name], and for over a decade, I've traversed the globe documenting the fleeting beauty of birds. What started as a hobby in my backyard has evolved into a comprehensive mission to preserve nature's untold stories through pixels and notes.
                            </p>
                            <div className="flex gap-12">
                                <div>
                                    <h4 className="text-3xl font-display font-bold text-primary-900 border-b-4 border-accent inline-block mb-1">10+</h4>
                                    <p className="font-sans text-[10px] tracking-widest uppercase font-bold text-muted">Years Active</p>
                                </div>
                                <div>
                                    <h4 className="text-3xl font-display font-bold text-primary-900 border-b-4 border-primary-400 inline-block mb-1">500+</h4>
                                    <p className="font-sans text-[10px] tracking-widest uppercase font-bold text-muted">Species Logged</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-primary-50">
                                <img
                                    src="https://images.unsplash.com/photo-1444464666168-49d633b867ad?auto=format&fit=crop&w=800&q=80"
                                    alt="About Me"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent rounded-full -z-10 blur-3xl opacity-20" />
                        </motion.div>
                    </div>
                </section>

                {/* Mission / Values grid */}
                <section className="bg-white rounded-[40px] p-12 md:p-20 border border-primary-50 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-20 opacity-5 pointer-events-none">
                        <Shield size={200} />
                    </div>

                    <div className="max-w-3xl mb-16">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-900 mb-6 font-primary">My Mission & Values</h2>
                        <p className="text-secondary font-body leading-relaxed">
                            Every expedition is more than just a photo shoot. It's an opportunity to contribute to a global database of biodiversity and inspire a new generation of conservationists.
                        </p>
                    </div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-12"
                    >
                        {values.map((v, i) => (
                            <motion.div key={i} variants={fadeInItem} className="flex gap-6 items-start">
                                <div className="p-4 bg-primary-50 rounded-2xl text-primary-600 shrink-0">
                                    {v.icon}
                                </div>
                                <div>
                                    <h4 className="font-display font-bold text-xl text-primary-900 mb-2">{v.title}</h4>
                                    <p className="text-text font-body text-sm opacity-70 leading-relaxed">{v.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>
            </div>
        </div>
    );
}
