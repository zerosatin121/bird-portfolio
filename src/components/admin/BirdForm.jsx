import { useForm } from 'react-hook-form';
import { X, Save, Bird, Info, MapPin, Tag } from 'lucide-react';

export default function BirdForm({ bird, onSubmit, onCancel }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: bird || {
            english_name: '',
            local_name: '',
            scientific_name: '',
            description: '',
            fun_fact: '',
            location: '',
            population_status: 'Common',
            thumbnail: '',
            tags: [],
            is_featured: false
        }
    });

    return (
        <div className="bg-white rounded-[40px] p-8 md:p-12 border border-primary-50">
            <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-500">
                        <Bird />
                    </div>
                    <div>
                        <h2 className="text-2xl font-display font-bold text-primary-900">{bird ? 'Edit Specimen' : 'New Observation'}</h2>
                        <p className="text-muted text-[10px] font-sans tracking-widest uppercase font-bold">Avian Database Entry</p>
                    </div>
                </div>
                <button onClick={onCancel} className="p-2 text-muted hover:text-red-500 transition-colors">
                    <X size={24} />
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-sans tracking-widest uppercase font-bold text-muted mb-2 ml-1">English Name</label>
                        <input
                            {...register('english_name', { required: true })}
                            className="w-full bg-primary-50 rounded-2xl px-6 py-4 border-none focus:ring-2 focus:ring-primary-100 outline-none text-sm font-body"
                            placeholder="e.g. Great Blue Heron"
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-sans tracking-widest uppercase font-bold text-muted mb-2 ml-1">Scientific Name</label>
                        <input
                            {...register('scientific_name', { required: true })}
                            className="w-full bg-primary-50 rounded-2xl px-6 py-4 border-none focus:ring-2 focus:ring-primary-100 outline-none text-sm font-body italic"
                            placeholder="e.g. Ardea herodias"
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-sans tracking-widest uppercase font-bold text-muted mb-2 ml-1">Location Found</label>
                        <div className="relative">
                            <MapPin size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-primary-400" />
                            <input
                                {...register('location', { required: true })}
                                className="w-full bg-primary-50 rounded-2xl pl-14 pr-6 py-4 border-none focus:ring-2 focus:ring-primary-100 outline-none text-sm font-body"
                                placeholder="e.g. Everglades, Florida"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-sans tracking-widest uppercase font-bold text-muted mb-2 ml-1">Population Status</label>
                            <select
                                {...register('population_status')}
                                className="w-full bg-primary-50 rounded-2xl px-6 py-4 border-none focus:ring-2 focus:ring-primary-100 outline-none text-sm font-body appearance-none"
                            >
                                <option>Common</option>
                                <option>Uncommon</option>
                                <option>Vulnerable</option>
                                <option>Endangered</option>
                                <option>Critically Endangered</option>
                            </select>
                        </div>
                        <div className="flex flex-col justify-end pb-4 ml-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" {...register('is_featured')} className="w-5 h-5 rounded-lg border-primary-100 text-primary-500 focus:ring-primary-100" />
                                <span className="text-[10px] font-sans tracking-widest uppercase font-bold text-muted">Featured</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-sans tracking-widest uppercase font-bold text-muted mb-10 ml-1">Observation Summary</label>
                        <textarea
                            {...register('description', { required: true })}
                            rows="5"
                            className="w-full bg-primary-50 rounded-2xl px-6 py-4 border-none focus:ring-2 focus:ring-primary-100 outline-none text-sm font-body resize-none"
                            placeholder="Describe the specimen's behavior, appearance, and habitat..."
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-sans tracking-widest uppercase font-bold text-muted mb-2 ml-1">Image URL</label>
                        <input
                            {...register('thumbnail')}
                            className="w-full bg-primary-50 rounded-2xl px-6 py-4 border-none focus:ring-2 focus:ring-primary-100 outline-none text-sm font-body"
                            placeholder="https://images.unsplash.com/..."
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-sans tracking-widest uppercase font-bold text-muted mb-2 ml-1 flex items-center gap-2">
                            <Tag size={12} />
                            Tags (Comma Separated)
                        </label>
                        <input
                            {...register('tags')}
                            className="w-full bg-primary-50 rounded-2xl px-6 py-4 border-none focus:ring-2 focus:ring-primary-100 outline-none text-sm font-body"
                            placeholder="Raptor, Migration, Rare"
                        />
                    </div>
                </div>

                <div className="md:col-span-2 mt-8 pt-8 border-t border-primary-50 flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-8 py-4 text-muted font-sans text-[10px] tracking-widest uppercase font-bold hover:text-red-500 transition-colors"
                    >
                        Discard
                    </button>
                    <button
                        type="submit"
                        className="px-10 py-4 bg-primary-900 text-white rounded-full font-sans text-[10px] tracking-widest uppercase font-bold flex items-center gap-2 hover:bg-primary-800 transition-all shadow-xl shadow-primary-900/20"
                    >
                        <Save size={14} />
                        Commit Record
                    </button>
                </div>
            </form>
        </div>
    );
}
