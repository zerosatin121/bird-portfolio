import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, Save, Calendar, MapPin, Bird, Info, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useStorage } from '../../hooks/useStorage';

export default function EventForm({ event, birds, onSubmit, onCancel }) {
    const { uploadImage, uploading } = useStorage();
    const [previewUrl, setPreviewUrl] = useState(event?.images?.[0]?.url || '');
    const [selectedFile, setSelectedFile] = useState(null);

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: event || {
            title: '',
            event_date: new Date().toISOString().split('T')[0],
            location_name: '',
            description: '',
            bird_species_spotted: [],
            images: [{ url: '', caption: 'Main expedition photo' }]
        }
    });

    const thumbnailUrl = watch('images.0.url');

    // Use selected file preview if available, otherwise use external URL
    const displayUrl = selectedFile ? previewUrl : thumbnailUrl;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const onFormSubmit = async (data) => {
        let finalImageUrl = data.images?.[0]?.url;

        if (selectedFile) {
            console.log('Starting file upload for event:', selectedFile.name);
            const uploadedUrl = await uploadImage(selectedFile, 'events'); // Upload to events bucket
            if (uploadedUrl) {
                console.log('Upload successful! URL:', uploadedUrl);
                finalImageUrl = uploadedUrl;
            } else {
                console.error('File upload failed. Check storage policies.');
                alert('Image upload failed. Please ensure your Supabase storage bucket "events" is public and has "INSERT" policies enabled.');
                return; // Stop the save process if upload failed
            }
        }

        const formattedData = {
            ...data,
            images: [{ url: finalImageUrl, caption: 'Main expedition photo' }]
        };

        onSubmit(formattedData);
    };

    return (
        <div className="bg-white rounded-[40px] p-8 md:p-12 border border-primary-50">
            <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                        <Calendar />
                    </div>
                    <div>
                        <h2 className="text-2xl font-display font-bold text-primary-900">{event ? 'Edit Expedition' : 'New Expedition'}</h2>
                        <p className="text-muted text-[10px] font-sans tracking-widest uppercase font-bold">Observation Mission Log</p>
                    </div>
                </div>
                <button onClick={onCancel} className="p-2 text-muted hover:text-red-500 transition-colors">
                    <X size={24} />
                </button>
            </div>

            <form onSubmit={handleSubmit(onFormSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-sans tracking-widest uppercase font-bold text-muted mb-2 ml-1">Expedition Title</label>
                        <input
                            {...register('title', { required: true })}
                            className="w-full bg-primary-50 rounded-2xl px-6 py-4 border-none focus:ring-2 focus:ring-primary-100 outline-none text-sm font-body"
                            placeholder="e.g. Morning Marsh Observation"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-sans tracking-widest uppercase font-bold text-muted mb-2 ml-1">Event Date</label>
                            <input
                                type="date"
                                {...register('event_date', { required: true })}
                                className="w-full bg-primary-50 rounded-2xl px-6 py-4 border-none focus:ring-2 focus:ring-primary-100 outline-none text-sm font-body"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-sans tracking-widest uppercase font-bold text-muted mb-2 ml-1">Location Name</label>
                            <div className="relative">
                                <MapPin size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-primary-400" />
                                <input
                                    {...register('location_name', { required: true })}
                                    className="w-full bg-primary-50 rounded-2xl pl-14 pr-6 py-4 border-none focus:ring-2 focus:ring-primary-100 outline-none text-sm font-body"
                                    placeholder="Park name..."
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-sans tracking-widest uppercase font-bold text-muted mb-4 ml-1">Birds Spotted</label>
                        <div className="grid grid-cols-2 gap-2 h-48 overflow-y-auto pr-2 custom-scrollbar">
                            {birds.map(bird => (
                                <label key={bird.id} className="flex items-center gap-3 p-3 bg-primary-50/50 rounded-xl cursor-pointer hover:bg-primary-50 transition-colors">
                                    <input
                                        type="checkbox"
                                        value={bird.english_name}
                                        {...register('bird_species_spotted')}
                                        className="w-4 h-4 rounded border-primary-100 text-primary-500"
                                    />
                                    <span className="text-xs font-body text-primary-900 truncate">{bird.english_name}</span>
                                </label>
                            ))}
                            {birds.length === 0 && <p className="text-[10px] text-muted italic p-4">Add birds to the database first.</p>}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-sans tracking-widest uppercase font-bold text-muted mb-2 ml-1">Expedition Highlights</label>
                        <textarea
                            {...register('description', { required: true })}
                            rows="8"
                            className="w-full bg-primary-50 rounded-2xl px-6 py-4 border-none focus:ring-2 focus:ring-primary-100 outline-none text-sm font-body resize-none"
                            placeholder="Chronicle the journey and discoveries..."
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="block text-[10px] font-sans tracking-widest uppercase font-bold text-muted mb-2 ml-1">Expedition Imagery</label>

                        <div className="grid grid-cols-1 gap-4">
                            {/* Preview Area */}
                            <div className="aspect-video rounded-2xl bg-primary-50 border-2 border-dashed border-primary-100 flex items-center justify-center overflow-hidden relative group">
                                {displayUrl ? (
                                    <>
                                        <img src={displayUrl} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <p className="text-white text-[10px] font-sans uppercase tracking-widest font-bold">Image Preview</p>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center p-6">
                                        <ImageIcon className="mx-auto mb-2 text-primary-200" size={32} />
                                        <p className="text-[9px] text-muted font-sans uppercase tracking-[0.2em]">No image selected</p>
                                    </div>
                                )}
                            </div>

                            {/* Upload/URL Choice */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <label className="flex items-center justify-center gap-3 flex-1 px-6 py-4 bg-primary-100/50 text-primary-700 rounded-2xl cursor-pointer hover:bg-primary-100 transition-all border border-primary-200 border-dashed">
                                    <Upload size={18} />
                                    <span className="text-[10px] font-sans tracking-widest uppercase font-bold text-center">Upload File</span>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                                </label>

                                <div className="space-y-2 flex-[2]">
                                    <input
                                        {...register('images.0.url')}
                                        className={`w-full bg-primary-50 rounded-2xl px-6 py-4 border-none focus:ring-2 focus:ring-primary-100 outline-none text-xs font-body ${thumbnailUrl?.includes('unsplash.com/photos') ? 'ring-2 ring-amber-500 bg-amber-50' : ''
                                            }`}
                                        placeholder="...or external URL"
                                    />
                                    {thumbnailUrl?.includes('unsplash.com/photos') && (
                                        <div className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-xl text-[10px] font-sans tracking-widest uppercase font-bold animate-pulse">
                                            <Info size={12} />
                                            Warning: This is a webpage link. Right-click the image and select "Copy Image Address" instead.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 mt-8 pt-8 border-t border-primary-50 flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-8 py-4 text-muted font-sans text-[10px] tracking-widest uppercase font-bold hover:text-red-500 transition-colors"
                        disabled={uploading}
                    >
                        Discard Log
                    </button>
                    <button
                        type="submit"
                        disabled={uploading}
                        className="px-10 py-4 bg-secondary text-white rounded-full font-sans text-[10px] tracking-widest uppercase font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-xl disabled:opacity-50"
                    >
                        {uploading ? (
                            <>
                                <Loader2 size={14} className="animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <Save size={14} />
                                Seal Expedition Log
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
