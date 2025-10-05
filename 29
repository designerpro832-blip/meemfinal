import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { defaultPosterStyles } from '../../lib/defaultStyles';
import { Loader2, UploadCloud, X } from 'lucide-react';

interface PosterTemplateFormProps {
  onClose: () => void;
  onSave: () => void;
}

const PosterTemplateForm: React.FC<PosterTemplateFormProps> = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !name.trim()) {
      setError('Template name and a background image are required.');
      return;
    }
    setIsSubmitting(true);
    setError(null);

    let filePath = '';
    let publicUrl: string | null = null;

    try {
      const fileExtension = file.name.split('.').pop();
      const uniqueComponentName = `${name.trim().replace(/\s+/g, '-')}-${Date.now()}`;
      filePath = `public/${uniqueComponentName}.${fileExtension}`;
      
      const { error: uploadError } = await supabase.storage
        .from('poster_backgrounds')
        .upload(filePath, file);
      
      if (uploadError) throw new Error(`Storage Error: ${uploadError.message}`);

      const { data: urlData } = supabase.storage
        .from('poster_backgrounds')
        .getPublicUrl(filePath);
      
      if (!urlData?.publicUrl) throw new Error('Could not get public URL for the uploaded image.');
      publicUrl = urlData.publicUrl;

      const { error: insertError } = await supabase
        .from('poster_templates')
        .insert({
          name: name.trim(),
          layout_name: 'FlexibleLayout', // The component to render
          component_name: uniqueComponentName, // The unique identifier
          background_image_url: publicUrl,
          thumbnail_url: publicUrl,
          styles: defaultPosterStyles['FlexibleLayout'],
          is_active: false,
          width: 500, // Default width
          height: 500, // Default height
        });

      if (insertError) throw new Error(`Database Error: ${insertError.message}`);

      onSave();
      onClose();

    } catch (err: any) {
      if (publicUrl) {
        await supabase.storage.from('poster_backgrounds').remove([filePath]);
      }
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 w-full max-w-lg shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <X size={24} />
        </button>
        <h3 className="text-xl font-bold text-gray-800 mb-6">Create Custom Poster Template</h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="bg-rose-100 text-rose-700 p-3 rounded-md text-sm">{error}</div>}
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 'Blue Abstract Design'"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Background Image</label>
            <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {preview ? (
                  <img src={preview} alt="Background preview" className="mx-auto h-24 w-auto rounded-md" />
                ) : (
                  <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                )}
                <div className="flex text-sm text-gray-600 justify-center">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" required />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 2MB</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : 'Create Template'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PosterTemplateForm;
