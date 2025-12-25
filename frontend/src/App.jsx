import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ResumeUpload from './pages/ResumeUpload';
import CareerRecommendation from './pages/CareerRecommendation';
import MockInterview from './pages/MockInterview';
import MultimodalEval from './pages/MultimodalEval';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/resume" element={<ResumeUpload />} />
            <Route path="/career" element={<CareerRecommendation />} />
            <Route path="/interview" element={<MockInterview />} />
            <Route path="/multimodal" element={<MultimodalEval />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
