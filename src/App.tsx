import React, { useState } from 'react';
import { Plus, Menu, Trash2, Edit2, X } from 'lucide-react';
import { ScatterPlot } from './components/ScatterPlot';
import { PointForm } from './components/PointForm';
import { Point, PointFormData } from './types/Point';

// Generate initial synthetic data
const initialData: Point[] = Array.from({ length: 20 }, (_, i) => ({
  id: `point-${i}`,
  x: Math.random() * 100,
  y: Math.random() * 100,
  label: `Point ${i + 1}`,
}));

function App() {
  const [points, setPoints] = useState<Point[]>(initialData);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleAddPoint = (data: PointFormData) => {
    const newPoint: Point = {
      id: `point-${Date.now()}`,
      ...data,
    };
    setPoints([...points, newPoint]);
  };

  const handleEditPoint = (data: PointFormData) => {
    if (!selectedPoint) return;
    setPoints(points.map(p => 
      p.id === selectedPoint.id ? { ...p, ...data } : p
    ));
  };

  const handleDeletePoint = (id: string) => {
    setPoints(points.filter(p => p.id !== id));
  };

  const openAddForm = () => {
    setSelectedPoint(null);
    setFormMode('add');
    setIsFormOpen(true);
  };

  const openEditForm = (point: Point) => {
    setSelectedPoint(point);
    setFormMode('edit');
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Interactive Scatter Plot</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 text-gray-500 hover:text-gray-600 focus:outline-none"
              >
                <Menu className="h-6 w-6" />
              </button>
              <button
                onClick={openAddForm}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Point
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Scatter plot */}
          <div className="flex-grow">
            <ScatterPlot
              data={points}
              width={800}
              height={600}
              onPointClick={(point) => openEditForm(point)}
            />
          </div>

          {/* Sidebar */}
          <div
            className={`fixed right-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
              isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Data Points</h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-2">
                {points.map((point) => (
                  <div
                    key={point.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <span className="font-medium">{point.label}</span>
                      <div className="text-sm text-gray-500">
                        ({point.x.toFixed(2)}, {point.y.toFixed(2)})
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditForm(point)}
                        className="p-1 text-gray-400 hover:text-primary-500"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePoint(point.id)}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Point form modal */}
      <PointForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={formMode === 'add' ? handleAddPoint : handleEditPoint}
        initialData={selectedPoint || undefined}
        mode={formMode}
      />
    </div>
  );
}

export default App;