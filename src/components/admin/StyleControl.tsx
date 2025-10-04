import React from 'react';
import { TextStyle } from '../../types';
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface StyleControlProps {
  label: string;
  value: TextStyle;
  onChange: (newValue: Partial<TextStyle>) => void;
}

const StyleControl: React.FC<StyleControlProps> = ({ label, value, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value: inputValue } = e.target;
    const isNumeric = ['size', 'x', 'y'].includes(name);
    onChange({ [name]: isNumeric ? Number(inputValue) : inputValue });
  };

  const handleAlignmentChange = (align: 'left' | 'center' | 'right') => {
    onChange({ align });
  };

  return (
    <div className="space-y-3 rounded-lg border border-gray-200 p-4 bg-white">
      <p className="font-semibold text-sm text-gray-800 capitalize">
        {label.replace(/([A-Z])/g, ' $1').trim()}
      </p>
      
      <div className="grid grid-cols-2 gap-3">
        {/* Color */}
        <div className="col-span-2">
          <label className="text-xs text-gray-500 block mb-1">Color</label>
          <div className="relative">
            <input type="color" name="color" value={value.color} onChange={handleInputChange} className="w-full h-9 p-0 border-none rounded-md cursor-pointer" />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none">{value.color}</span>
          </div>
        </div>
        
        {/* Font Size */}
        <div>
          <label className="text-xs text-gray-500 block mb-1">Size (px)</label>
          <input type="number" name="size" value={value.size} onChange={handleInputChange} className="w-full h-9 px-2 border border-gray-300 rounded-md" />
        </div>
        
        {/* Font Weight */}
        <div>
          <label className="text-xs text-gray-500 block mb-1">Weight</label>
          <select name="weight" value={value.weight} onChange={handleInputChange} className="w-full h-9 px-2 border border-gray-300 rounded-md">
            <option value="400">Normal</option>
            <option value="500">Medium</option>
            <option value="600">SemiBold</option>
            <option value="700">Bold</option>
            <option value="800">ExtraBold</option>
            <option value="900">Black</option>
          </select>
        </div>
        
        {/* Font Family */}
        <div className="col-span-2">
          <label className="text-xs text-gray-500 block mb-1">Font</label>
          <select name="font" value={value.font} onChange={handleInputChange} className="w-full h-9 px-2 border border-gray-300 rounded-md">
            <option value="Poppins">Poppins</option>
            <option value="Inter">Inter</option>
            <option value="Lexend">Lexend (Nexa)</option>
            <option value="Plus Jakarta Sans">Plus Jakarta Sans (Neulis)</option>
            <option value="MuseoModerno">MuseoModerno (Musue)</option>
            <option value="Cinzel Decorative">Cinzel Decorative (Fractual)</option>
            <option value="Pacifico">Pacifico (Bassy)</option>
            <option value="Cooper Hewitt">Cooper Hewitt</option>
          </select>
        </div>

        {/* Alignment */}
        <div className="col-span-2">
          <label className="text-xs text-gray-500 block mb-1">Alignment</label>
          <div className="flex items-center gap-1">
            <button onClick={() => handleAlignmentChange('left')} className={`p-2 rounded ${value.align === 'left' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}><AlignLeft size={16} /></button>
            <button onClick={() => handleAlignmentChange('center')} className={`p-2 rounded ${value.align === 'center' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}><AlignCenter size={16} /></button>
            <button onClick={() => handleAlignmentChange('right')} className={`p-2 rounded ${value.align === 'right' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}><AlignRight size={16} /></button>
          </div>
        </div>

        {/* Position */}
        <div>
          <label className="text-xs text-gray-500 block mb-1">X Pos (%)</label>
          <input type="number" name="x" value={value.x} onChange={handleInputChange} className="w-full h-9 px-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">Y Pos (%)</label>
          <input type="number" name="y" value={value.y} onChange={handleInputChange} className="w-full h-9 px-2 border border-gray-300 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default StyleControl;
