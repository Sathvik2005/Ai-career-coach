import { useState } from 'react';
import axios from 'axios';

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/resume/parse', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error uploading resume", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Resume Analyzer</h2>
      
      <div className="mb-6">
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
      </div>

      <button 
        onClick={handleUpload}
        disabled={loading}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {loading ? 'Analyzing...' : 'Analyze Resume'}
      </button>

      {result && (
        <div className="mt-8 space-y-4">
          <div className="p-4 bg-gray-50 rounded">
            <h3 className="font-bold">ATS Score</h3>
            <div className="text-3xl text-indigo-600">{result.ats_score}/100</div>
          </div>
          
          <div>
            <h3 className="font-bold">Skills Found</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {result.skills.map(skill => (
                <span key={skill} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">{skill}</span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-red-600">Missing Keywords</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {result.missing_keywords.map(skill => (
                <span key={skill} className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
