import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, Send, MapPin, Phone, Instagram, Twitter, Facebook } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log('Form Submitted:', data);
        setSubmitted(true);
        // Add real submission logic here (e.g., Supabase or EmailJS)
    };

    if (submitted) {
        return (
            <div className="pt-40 pb-20 text-center container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-primary-50 p-12 rounded-[40px] max-w-xl mx-auto border border-primary-100 shadow-sm"
                >
                    <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                        <Send size={24} />
                    </div>
                    <h2 className="text-3xl font-display font-bold text-primary-900 mb-4">Message Received</h2>
                    <p className="text-secondary font-body mb-8">
                        Thank you for reaching out! I'll read your message and get back to you as soon as I've returned from the field.
                    </p>
                    <button
                        onClick={() => setSubmitted(false)}
                        className="text-primary-600 font-sans text-[10px] tracking-widest uppercase font-bold border-b border-primary-200 pb-1"
                    >
                        Send Another Message
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20">
            <div className="container mx-auto px-6">
                <header className="mb-20">
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-primary-900 mb-6">Connect with <br /><span className="text-secondary italic">The Watcher</span></h1>
                    <p className="text-secondary font-body max-w-2xl leading-relaxed">
                        Have a question about a species, an expedition, or just want to share your own observations? I'd love to hear from you.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Form Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-sans tracking-widest uppercase font-bold text-muted mb-2 ml-1">Full Name</label>
                                    <input
                                        {...register('name', { required: true })}
                                        className={`w-full bg-white border ${errors.name ? 'border-red-300' : 'border-primary-50'} rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary-100 outline-none transition-all font-body text-sm`}
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-sans tracking-widest uppercase font-bold text-muted mb-2 ml-1">Email Address</label>
                                    <input
                                        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                                        className={`w-full bg-white border ${errors.email ? 'border-red-300' : 'border-primary-50'} rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary-100 outline-none transition-all font-body text-sm`}
                                        placeholder="hello@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-sans tracking-widest uppercase font-bold text-muted mb-2 ml-1">Message</label>
                                <textarea
                                    {...register('message', { required: true })}
                                    rows="6"
                                    className={`w-full bg-white border ${errors.message ? 'border-red-300' : 'border-primary-50'} rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary-100 outline-none transition-all font-body text-sm resize-none`}
                                    placeholder="Tell me about your observation..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full md:w-auto px-12 py-5 bg-primary-900 text-white rounded-full font-sans text-xs tracking-widest uppercase font-bold hover:bg-primary-800 transition-all flex items-center justify-center gap-3 shadow-lg"
                            >
                                Send Message
                                <Send size={16} />
                            </button>
                        </form>
                    </motion.div>

                    {/* Contact Info Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-12"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-500 shrink-0">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-sans tracking-widest uppercase font-bold text-primary-900 mb-1">Email Me</h4>
                                    <p className="text-secondary font-body">birds@antigravity.watch</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-500 shrink-0">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-sans tracking-widest uppercase font-bold text-primary-900 mb-1">Field Base</h4>
                                    <p className="text-secondary font-body">Antigravity Peak, Pacific Northwest</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-12 border-t border-primary-50">
                            <h4 className="text-sm font-sans tracking-widest uppercase font-bold text-primary-900 mb-6">Social Observation</h4>
                            <div className="flex gap-4">
                                {[
                                    { icon: <Instagram size={20} />, label: "Instagram" },
                                    { icon: <Twitter size={20} />, label: "Twitter" },
                                    { icon: <Facebook size={20} />, label: "Facebook" }
                                ].map((s, i) => (
                                    <a key={i} href="#" className="w-10 h-10 rounded-xl border border-primary-50 flex items-center justify-center text-muted hover:text-primary-500 hover:border-primary-200 transition-all">
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
