import { useState } from 'react';
import axios from 'axios';

const MockInterview = () => {
  const [role, setRole] = useState('Software Engineer');
  const [level, setLevel] = useState('Entry Level');
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  const startInterview = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/interview/start', { role, level });
      setQuestions(response.data.questions);
      setCurrentQ(0);
      setFeedback(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEvaluate = async () => {
    // Mocking audio upload with text for now as per backend mock
    try {
      const formData = new FormData();
      // In real app, append audio blob
      formData.append('answer_audio', new Blob(['mock audio'], { type: 'audio/wav' })); 
      
      const response = await axios.post(`/api/interview/evaluate?question=${questions[currentQ]}`, formData);
      setFeedback(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">AI Mock Interview</h2>

      {!questions.length ? (
        <div className="space-y-4">
          <input 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            className="block w-full border p-2 rounded"
            placeholder="Job Role"
          />
          <select 
            value={level} 
            onChange={(e) => setLevel(e.target.value)}
            className="block w-full border p-2 rounded"
          >
            <option>Entry Level</option>
            <option>Mid Level</option>
            <option>Senior Level</option>
          </select>
          <button 
            onClick={startInterview}
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
          >
            {loading ? 'Generating...' : 'Start Interview'}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-500">Question {currentQ + 1} of {questions.length}</h3>
            <p className="text-xl font-bold mt-2">{questions[currentQ]}</p>
          </div>

          <div className="flex justify-center space-x-4">
            <button className="bg-red-500 text-white px-4 py-2 rounded-full">🔴 Record Answer</button>
            <button onClick={handleEvaluate} className="bg-green-600 text-white px-4 py-2 rounded">Submit Answer</button>
          </div>

          {feedback && (
            <div className="p-4 bg-blue-50 rounded border border-blue-100">
              <div className="font-bold text-blue-900">Score: {feedback.score}/10</div>
              <p className="mt-2 text-blue-800">{feedback.feedback}</p>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button 
              disabled={currentQ === 0}
              onClick={() => { setCurrentQ(c => c - 1); setFeedback(null); }}
              className="text-gray-600 disabled:text-gray-300"
            >
              Previous
            </button>
            <button 
              disabled={currentQ === questions.length - 1}
              onClick={() => { setCurrentQ(c => c + 1); setFeedback(null); }}
              className="text-gray-600 disabled:text-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockInterview;
