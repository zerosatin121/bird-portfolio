import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Lock,
    LayoutDashboard,
    PlusCircle,
    Bird as BirdIcon,
    Calendar,
    LogOut,
    Trash2,
    Edit3,
    Search,
    CheckCircle2,
    AlertCircle,
    Loader2
} from 'lucide-react';
import { useBirds } from '../hooks/useBirds';
import { useEvents } from '../hooks/useEvents';
import BirdForm from '../components/admin/BirdForm';
import EventForm from '../components/admin/EventForm';

export default function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [activeTab, setActiveTab] = useState('birds');
    const [isAdding, setIsAdding] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const { birds, loading: birdsLoading, fetchBirds } = useBirds();
    const { events, loading: eventsLoading, fetchEvents } = useEvents();
    const [actionStatus, setActionStatus] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSave = async (data) => {
        try {
            setActionStatus({ type: 'loading', message: 'Saving recorded observation...' });

            // Format tags if they are a string
            const formattedData = { ...data };
            if (typeof formattedData.tags === 'string') {
                formattedData.tags = formattedData.tags.split(',').map(tag => tag.trim());
            }

            const table = activeTab === 'birds' ? 'birds' : 'events';

            // Generate slug for birds if missing
            if (activeTab === 'birds' && !formattedData.slug) {
                formattedData.slug = formattedData.english_name
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/[\s_-]+/g, '-')
                    .replace(/^-+|-+$/g, '');
            }

            const { error } = await supabase
                .from(table)
                .upsert(formattedData);

            if (error) throw error;

            setActionStatus({ type: 'success', message: `${activeTab === 'birds' ? 'Bird' : 'Event'} successfully registered.` });

            // Refresh list
            if (activeTab === 'birds') fetchBirds();
            else fetchEvents();

            setTimeout(() => {
                setIsAdding(false);
                setEditingItem(null);
                setActionStatus(null);
            }, 1500);
        } catch (err) {
            console.error('Error saving:', err);
            setActionStatus({ type: 'error', message: `Failed to save: ${err.message}` });
        }
    };

    const handleDelete = async (id) => {
        if (!confirm(`Are you sure you want to remove this ${activeTab === 'birds' ? 'bird' : 'event'} record?`)) return;

        try {
            setActionStatus({ type: 'loading', message: 'Removing record...' });
            const table = activeTab === 'birds' ? 'birds' : 'events';

            const { error } = await supabase
                .from(table)
                .delete()
                .eq('id', id);

            if (error) throw error;

            setActionStatus({ type: 'success', message: 'Record successfully removed.' });

            if (activeTab === 'birds') fetchBirds();
            else fetchEvents();

            setTimeout(() => setActionStatus(null), 2000);
        } catch (err) {
            console.error('Error deleting:', err);
            setActionStatus({ type: 'error', message: `Deletion failed: ${err.message}` });
        }
    };

    // Simple auth check using env variable
    const handleLogin = (e) => {
        e.preventDefault();
        const adminPass = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
        if (password === adminPass) {
            setIsAuthenticated(true);
            setLoginError('');
            localStorage.setItem('admin_auth', 'true');
        } else {
            setLoginError('Invalid observation credentials.');
        }
    };

    useEffect(() => {
        const auth = localStorage.getItem('admin_auth');
        if (auth === 'true') setIsAuthenticated(true);
    }, []);

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('admin_auth');
    };

    if (!isAuthenticated) {
        return (
            <div className="pt-40 pb-20 flex items-center justify-center container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-10 rounded-[40px] shadow-2xl border border-primary-50 max-w-md w-full"
                >
                    <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-8 shadow-lg shadow-primary-100">
                        <Lock size={24} />
                    </div>
                    <h2 className="text-3xl font-display font-bold text-primary-900 text-center mb-2">Restricted Access</h2>
                    <p className="text-muted text-center font-body text-sm mb-8">Enter the watcher's key to proceed to the command center.</p>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Watcher Credentials"
                                className="w-full px-6 py-4 bg-primary-50 rounded-2xl border-none focus:ring-2 focus:ring-primary-200 outline-none transition-all font-body text-sm text-center"
                            />
                            {loginError && <p className="text-red-500 text-[10px] font-sans tracking-widest uppercase font-bold mt-3 text-center flex items-center justify-center gap-1"><AlertCircle size={12} />{loginError}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full py-4 bg-primary-900 text-white rounded-2xl font-sans text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-primary-800 transition-all shadow-xl"
                        >
                            Verify Identity
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 min-h-screen bg-primary-50/30">
            <div className="container mx-auto px-6">
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 text-primary-600 font-sans text-[10px] tracking-widest uppercase font-bold mb-2">
                            <LayoutDashboard size={14} />
                            Command Center
                        </div>
                        <h1 className="text-4xl font-display font-bold text-primary-900">Portfolio Manager</h1>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-6 py-3 bg-white text-muted hover:text-red-500 rounded-full border border-primary-100 font-sans text-[10px] tracking-widest uppercase font-bold transition-all shadow-sm"
                    >
                        <LogOut size={14} />
                        Secure Exit
                    </button>
                </header>

                {/* Status Messages */}
                <AnimatePresence>
                    {actionStatus && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`fixed top-12 left-1/2 -translate-x-1/2 z-50 px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 font-sans text-[10px] tracking-widest uppercase font-bold border-2 ${actionStatus.type === 'success' ? 'bg-green-50 text-green-700 border-green-100' :
                                actionStatus.type === 'error' ? 'bg-red-50 text-red-700 border-red-100' :
                                    'bg-primary-900 text-white border-primary-800'
                                }`}
                        >
                            {actionStatus.type === 'loading' && <Loader2 size={16} className="animate-spin" />}
                            {actionStatus.type === 'success' && <CheckCircle2 size={16} />}
                            {actionStatus.type === 'error' && <AlertCircle size={16} />}
                            {actionStatus.message}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Dashboard Content */}
                <AnimatePresence mode="wait">
                    {isAdding || editingItem ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                        >
                            {activeTab === 'birds' ? (
                                <BirdForm
                                    bird={editingItem}
                                    onSubmit={handleSave}
                                    onCancel={() => { setIsAdding(false); setEditingItem(null); }}
                                />
                            ) : (
                                <EventForm
                                    event={editingItem}
                                    birds={birds}
                                    onSubmit={handleSave}
                                    onCancel={() => { setIsAdding(false); setEditingItem(null); }}
                                />
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white rounded-[40px] shadow-sm border border-primary-50 overflow-hidden"
                        >
                            <div className="flex border-b border-primary-50">
                                <button
                                    onClick={() => { setActiveTab('birds'); setIsAdding(false); setEditingItem(null); }}
                                    className={`flex-1 py-8 flex items-center justify-center gap-3 font-sans text-[10px] tracking-widest uppercase font-bold transition-all ${activeTab === 'birds' ? 'bg-primary-50 text-primary-900' : 'text-muted hover:text-primary-600'}`}
                                >
                                    <BirdIcon size={18} />
                                    Managed Birds
                                </button>
                                <button
                                    onClick={() => { setActiveTab('events'); setIsAdding(false); setEditingItem(null); }}
                                    className={`flex-1 py-8 flex items-center justify-center gap-3 font-sans text-[10px] tracking-widest uppercase font-bold transition-all ${activeTab === 'events' ? 'bg-primary-50 text-primary-900' : 'text-muted hover:text-primary-600'}`}
                                >
                                    <Calendar size={18} />
                                    Managed Events
                                </button>
                            </div>

                            <div className="p-8 md:p-12">
                                <div className="flex justify-between items-center mb-10">
                                    <div className="relative w-full max-w-xs">
                                        <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                                        <input
                                            type="text"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            placeholder={`Search ${activeTab}...`}
                                            className="w-full pl-10 pr-4 py-3 bg-primary-50 rounded-full border-none focus:ring-2 focus:ring-primary-100 text-[10px] font-sans uppercase tracking-widest outline-none"
                                        />
                                    </div>
                                    <button
                                        onClick={() => setIsAdding(true)}
                                        className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-full font-sans text-[10px] tracking-widest uppercase font-bold hover:bg-primary-600 transition-all shadow-lg shadow-primary-100"
                                    >
                                        <PlusCircle size={14} />
                                        Add New {activeTab === 'birds' ? 'Bird' : 'Event'}
                                    </button>
                                </div>

                                {/* Content Table */}
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-primary-50">
                                                <th className="pb-4 font-sans text-[9px] tracking-widest uppercase font-bold text-muted">Identification</th>
                                                <th className="pb-4 font-sans text-[9px] tracking-widest uppercase font-bold text-muted">Status / Location</th>
                                                <th className="pb-4 font-sans text-[9px] tracking-widest uppercase font-bold text-muted text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-primary-50/50">
                                            {activeTab === 'birds' ? (
                                                birds.filter(bird =>
                                                    bird.english_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                    bird.scientific_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                    bird.location?.toLowerCase().includes(searchTerm.toLowerCase())
                                                ).map((bird) => (
                                                    <tr key={bird.id} className="group hover:bg-primary-50/30 transition-colors">
                                                        <td className="py-6">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-12 h-12 rounded-xl bg-primary-100 overflow-hidden">
                                                                    <img src={bird.thumbnail} alt="" className="w-full h-full object-cover" />
                                                                </div>
                                                                <div>
                                                                    <p className="font-display font-bold text-primary-900 leading-tight">{bird.english_name}</p>
                                                                    <p className="text-muted text-[10px] italic font-body">{bird.scientific_name}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="py-6">
                                                            <p className="text-secondary text-[11px] font-body mb-1">{bird.location}</p>
                                                            <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[8px] tracking-widest uppercase font-bold rounded-full">
                                                                {bird.population_status}
                                                            </span>
                                                        </td>
                                                        <td className="py-6 text-right space-x-2">
                                                            <button
                                                                onClick={() => setEditingItem(bird)}
                                                                className="p-2 text-muted hover:text-primary-600 transition-colors"
                                                            >
                                                                <Edit3 size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(bird.id)}
                                                                className="p-2 text-muted hover:text-red-500 transition-colors"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                events.filter(event =>
                                                    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                                    event.location_name?.toLowerCase().includes(searchTerm.toLowerCase())
                                                ).map((event) => (
                                                    <tr key={event.id} className="group hover:bg-primary-50/30 transition-colors">
                                                        <td className="py-6">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                                                                    <Calendar size={18} />
                                                                </div>
                                                                <div>
                                                                    <p className="font-display font-bold text-primary-900 leading-tight">{event.title}</p>
                                                                    <p className="text-muted text-[10px] font-sans tracking-widest uppercase">{new Date(event.event_date).toLocaleDateString()}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="py-6">
                                                            <p className="text-secondary text-[11px] font-body mb-1">{event.location_name}</p>
                                                            <span className="text-[9px] text-muted font-sans uppercase font-bold">{event.bird_species_spotted?.length || 0} sightings</span>
                                                        </td>
                                                        <td className="py-6 text-right space-x-2">
                                                            <button
                                                                onClick={() => setEditingItem(event)}
                                                                className="p-2 text-muted hover:text-primary-600 transition-colors"
                                                            >
                                                                <Edit3 size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(event.id)}
                                                                className="p-2 text-muted hover:text-red-500 transition-colors"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
