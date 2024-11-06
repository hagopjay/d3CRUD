import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { DataPoint } from '../types';

interface AddPointFormProps {
  onAdd: (point: Omit<DataPoint, 'id'>) => void;
}

export function AddPointForm({ onAdd }: AddPointFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [label, setLabel] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      x: parseFloat(x),
      y: parseFloat(y),
      label,
    });
    setX('');
    setY('');
    setLabel('');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
      >
        <Plus size={24} />
      </button>
    );
  }

  return (
    <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">X Coordinate</label>
          <input
            type="number"
            step="any"
            value={x}
            onChange={(e) => setX(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Y Coordinate</label>
          <input
            type="number"
            step="any"
            value={y}
            onChange={(e) => setY(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Label</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Add Point
          </button>
        </div>
      </form>
    </div>
  );
}