import { useState } from 'react';
import axios from 'axios';

const CareerRecommendation = () => {
  const [skills, setSkills] = useState('');
  const [interests, setInterests] = useState('');
  const [score, setScore] = useState(7.5);
  const [result, setResult] = useState(null);

  const handleRecommend = async () => {
    try {
      const response = await axios.post('/api/career/recommend', {
        skills: skills.split(',').map(s => s.trim()),
        interests: interests.split(',').map(s => s.trim()),
        academic_score: parseFloat(score)
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error getting recommendations", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Career Guidance</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
          <input 
            type="text" 
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2"
            placeholder="Python, React, SQL"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Interests (comma separated)</label>
          <input 
            type="text" 
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2"
            placeholder="AI, Web Development"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Academic Score (0-10)</label>
          <input 
            type="number" 
            value={score}
            onChange={(e) => setScore(e.target.value)}
            step="0.1"
            max="10"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2"
          />
        </div>

        <button 
          onClick={handleRecommend}
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Get Recommendations
        </button>
      </div>

      {result && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Recommended Paths</h3>
          <div className="space-y-2">
            {result.recommendations.map((rec, idx) => (
              <div key={idx} className="p-4 bg-indigo-50 rounded border border-indigo-100">
                <div className="font-bold text-indigo-900">{rec}</div>
                <div className="text-sm text-indigo-600">Confidence: {(result.confidence * 100).toFixed(0)}%</div>
              </div>
            ))}
          </div>
          
          {result.skill_gaps.length > 0 && (
            <div className="mt-4">
              <h4 className="font-bold text-gray-700">Recommended Skills to Learn:</h4>
              <div className="flex gap-2 mt-2">
                {result.skill_gaps.map(gap => (
                  <span key={gap} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">{gap}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CareerRecommendation;
