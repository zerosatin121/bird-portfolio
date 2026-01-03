import { Link } from 'react-router-dom';
import { Bird, Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-primary-900 text-white pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="md:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-6">
                            <Bird className="text-accent w-8 h-8" />
                            <span className="font-display text-2xl font-bold">AvianPortfolio</span>
                        </Link>
                        <p className="text-primary-100 max-w-sm font-body">
                            Documenting the beauty and diversity of avian life through photography and careful observation.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-display text-lg font-bold mb-6 text-accent">Explore</h4>
                        <ul className="space-y-4 font-sans text-sm tracking-widest uppercase">
                            <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
                            <li><Link to="/gallery" className="hover:text-accent transition-colors">Gallery</Link></li>
                            <li><Link to="/events" className="hover:text-accent transition-colors">Events</Link></li>
                            <li><Link to="/about" className="hover:text-accent transition-colors">About</Link></li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h4 className="font-display text-lg font-bold mb-6 text-accent">Connect</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full border border-primary-700 flex items-center justify-center hover:bg-primary-800 transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-primary-700 flex items-center justify-center hover:bg-primary-800 transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-primary-700 flex items-center justify-center hover:bg-primary-800 transition-colors">
                                <Facebook size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-primary-800 pt-8 flex flex-col md:row justify-between items-center gap-4 text-primary-300 text-xs tracking-widest uppercase">
                    <p>© {new Date().getFullYear()} Bird Watching Portfolio. Built with passion.</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
