import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Loader2, Info, AlertTriangle, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { PosterTemplate } from '../../types';
import PosterEditor from './PosterEditor';
import PosterTemplateForm from './PosterTemplateForm';

const AdminPosters: React.FC = () => {
  const [templates, setTemplates] = useState<PosterTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTemplate, setEditingTemplate] = useState<PosterTemplate | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const fetchTemplates = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('poster_templates')
      .select('id, created_at, name, layout_name, component_name, thumbnail_url, background_image_url, is_active, width, height')
      .order('created_at', { ascending: false });

    if (error) {
      setError("Could not fetch poster templates. Please check your Supabase connection.");
    } else {
      setTemplates(data as PosterTemplate[] || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleToggleActive = async (template: PosterTemplate) => {
    const { error } = await supabase
      .from('poster_templates')
      .update({ is_active: !template.is_active })
      .eq('id', template.id);

    if (error) {
      alert(`Error updating status. Details: ${error.message}`);
    } else {
      await fetchTemplates();
    }
  };

  const handleDelete = async (id: string, backgroundUrl: string | null) => {
    if (confirm('Are you sure you want to delete this template? This cannot be undone.')) {
      const { error: dbError } = await supabase.from('poster_templates').delete().eq('id', id);
      
      if (dbError) {
        alert(`Error deleting template from database. Details: ${dbError.message}`);
        return;
      }
      
      if (backgroundUrl) {
        try {
            const urlParts = backgroundUrl.split('/poster_backgrounds/');
            if (urlParts.length > 1) {
                const filePath = urlParts[1];
                const { error: storageError } = await supabase.storage.from('poster_backgrounds').remove([filePath]);
                if (storageError) {
                    alert(`Template deleted, but failed to delete background image. Manual cleanup may be needed. Error: ${storageError.message}`);
                }
            }
        } catch (e) {
            console.error("Could not parse file path from URL for deletion:", backgroundUrl);
        }
      }

      await fetchTemplates();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-ui-text-primary">Manage Poster Models</h2>
        <p className="text-ui-text-secondary">Activate, edit styles, or create new result poster designs.</p>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-4" role="alert">
        <div className="flex">
          <div className="py-1"><Info className="w-5 h-5 mr-3" /></div>
          <div>
            <p className="font-bold">How it works</p>
            <p className="text-sm">Click "Add New Template" to upload a background and create a new design. Use the toggle to activate or deactivate designs, and hover over a card to edit or delete.</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12"><Loader2 className="w-8 h-8 text-brand-mid-blue animate-spin" /></div>
      ) : error ? (
        <div className="text-center py-12 text-rose-600"><h3 className="text-xl font-semibold">Error loading templates</h3><p>{error}</p></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-ui-surface rounded-xl shadow-md overflow-hidden group flex flex-col"
            >
              <div className="relative">
                <img src={template.thumbnail_url || template.background_image_url || 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/400x300/F0F5FA/082026?text=No+Preview'} alt={template.name} className="w-full h-40 object-cover bg-gray-200" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                <div className="absolute top-2 right-2 flex items-center gap-2">
                    {!(template.component_name || template.layout_name) && (
                      <div className="bg-amber-400 text-black p-1.5 rounded-full" title="Layout is missing!">
                        <AlertTriangle size={16} />
                      </div>
                    )}
                    <span className={`px-2 py-1 text-xs font-bold text-white rounded-full ${template.is_active ? 'bg-green-500' : 'bg-gray-500'}`}>
                      {template.is_active ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                </div>

                <div className="absolute bottom-2 left-4 right-4">
                    <h3 className="font-bold text-lg text-white truncate" style={{textShadow: '0 1px 3px rgba(0,0,0,0.7)'}}>{template.name}</h3>
                </div>

                <div className="absolute inset-0 bg-black/70 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button onClick={() => setEditingTemplate(template)} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold">
                        <Edit size={16} /> Edit
                    </button>
                    <button onClick={() => handleDelete(template.id, template.background_image_url)} className="bg-rose-600 text-white p-2.5 rounded-lg" title="Delete Template">
                        <Trash2 size={18} />
                    </button>
                </div>
              </div>
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                    <p className="text-sm text-ui-text-secondary mb-3">
                        Component: {(template.component_name || template.layout_name) ? 
                            <code className="bg-black/5 px-1.5 py-1 rounded text-xs font-medium">{template.component_name || template.layout_name}</code> : 
                            <span className="text-amber-600 font-bold">Missing!</span>
                        }
                    </p>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{new Date(template.created_at).toLocaleDateString()}</span>
                  <label htmlFor={`toggle-${template.id}`} className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input type="checkbox" id={`toggle-${template.id}`} className="sr-only" checked={template.is_active} onChange={() => handleToggleActive(template)} />
                      <div className="block bg-gray-300 w-10 h-5 rounded-full"></div>
                      <div className={`dot absolute left-1 top-0.5 bg-white w-4 h-4 rounded-full transition-transform ${template.is_active ? 'translate-x-5 bg-brand-coral' : ''}`}></div>
                    </div>
                  </label>
                </div>
              </div>
            </motion.div>
          ))}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: templates.length * 0.05 }}
            onClick={() => setShowCreateForm(true)}
            className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-500 hover:border-brand-mid-blue hover:text-brand-mid-blue transition-colors duration-300 min-h-[280px]"
          >
            <PlusCircle className="w-12 h-12 mb-2" />
            <span className="font-semibold">Add New Template</span>
          </motion.button>
        </div>
      )}

      {showCreateForm && (
        <PosterTemplateForm 
          onClose={() => setShowCreateForm(false)}
          onSave={fetchTemplates}
        />
      )}

      {editingTemplate && (
        <PosterEditor
          template={editingTemplate}
          onClose={() => setEditingTemplate(null)}
          onSave={fetchTemplates}
        />
      )}
    </div>
  );
};

export default AdminPosters;
