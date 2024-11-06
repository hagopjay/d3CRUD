import React, { useState, useEffect } from 'react';
import { DataPoint } from '../types';

interface EditPointFormProps {
  point: DataPoint;
  onEdit: (id: string, updates: Partial<DataPoint>) => void;
  onClose: () => void;
}

export function EditPointForm({ point, onEdit, onClose }: EditPointFormProps) {
  const [x, setX] = useState(point.x.toString());
  const [y, setY] = useState(point.y.toString());
  const [label, setLabel] = useState(point.label);

  useEffect(() => {
    setX(point.x.toString());
    setY(point.y.toString());
    setLabel(point.label);
  }, [point]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit(point.id, {
      x: parseFloat(x),
      y: parseFloat(y),
      label,
    });
    onClose();
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg">
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
            onClick={onClose}
            className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}