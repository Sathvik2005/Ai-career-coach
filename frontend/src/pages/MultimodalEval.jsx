import { useState } from 'react';
import axios from 'axios';

const MultimodalEval = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      // Mock files
      formData.append('video', new Blob(['mock video'], { type: 'video/mp4' }));
      formData.append('audio', new Blob(['mock audio'], { type: 'audio/wav' }));

      const response = await axios.post('/api/multimodal/analyze', formData);
      setResult(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Multimodal Analysis</h2>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
        <p className="text-gray-500 mb-4">Upload Video & Audio of your interview practice</p>
        <button 
          onClick={handleAnalyze}
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          {loading ? 'Analyzing...' : 'Upload & Analyze'}
        </button>
      </div>

      {result && (
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="p-4 bg-purple-50 rounded text-center">
            <div className="text-sm text-purple-600">Emotion</div>
            <div className="text-xl font-bold text-purple-900">{result.emotion}</div>
          </div>
          <div className="p-4 bg-blue-50 rounded text-center">
            <div className="text-sm text-blue-600">Confidence</div>
            <div className="text-xl font-bold text-blue-900">{(result.confidence * 100).toFixed(0)}%</div>
          </div>
          <div className="p-4 bg-green-50 rounded text-center">
            <div className="text-sm text-green-600">Pace</div>
            <div className="text-xl font-bold text-green-900">{result.speaking_pace}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultimodalEval;
