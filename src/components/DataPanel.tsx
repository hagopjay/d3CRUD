import React from 'react';
import { Transition } from '@headlessui/react';
import { X, Edit2, Trash2 } from 'lucide-react';
import { DataPoint } from '../types';

interface DataPanelProps {
  isOpen: boolean;
  onClose: () => void;
  data: DataPoint[];
  onEdit: (point: DataPoint) => void;
  onDelete: (id: string) => void;
}

export function DataPanel({ isOpen, onClose, data, onEdit, onDelete }: DataPanelProps) {
  return (
    <Transition
      show={isOpen}
      enter="transform transition ease-in-out duration-300"
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leave="transform transition ease-in-out duration-300"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full"
      className="fixed inset-y-0 right-0 w-80 bg-white shadow-xl"
    >
      <div className="h-full flex flex-col">
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Data Points</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {data.map((point) => (
              <div
                key={point.id}
                className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{point.label}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(point)}
                      className="p-1 rounded hover:bg-white transition-colors"
                      title="Edit point"
                    >
                      <Edit2 size={16} className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => onDelete(point.id)}
                      className="p-1 rounded hover:bg-white transition-colors"
                      title="Delete point"
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  x: {point.x.toFixed(2)}, y: {point.y.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Transition>
  );
}