import { useState } from 'react';
import { supabase } from '../lib/supabase';

export const useStorage = () => {
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);

    const uploadImage = async (file, bucket = 'birds') => {
        try {
            setUploading(true);
            setUploadError(null);

            // Create a unique filename
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            // Upload the file
            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from(bucket)
                .getPublicUrl(filePath);

            return publicUrl;
        } catch (err) {
            console.error('Error uploading image:', err);
            setUploadError(err.message);
            return null;
        } finally {
            setUploading(false);
        }
    };

    return { uploadImage, uploading, uploadError };
};
