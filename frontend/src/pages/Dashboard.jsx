import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Welcome to AI Career Coach</h1>
      <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
        Your all-in-one platform for resume analysis, career guidance, and interview preparation powered by advanced AI.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/resume" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition">
          <div className="text-4xl mb-4">📄</div>
          <h3 className="text-xl font-bold mb-2">Resume Analyzer</h3>
          <p className="text-gray-500">Get ATS scores and keyword optimization tips.</p>
        </Link>

        <Link to="/career" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-xl font-bold mb-2">Career Path</h3>
          <p className="text-gray-500">Discover roles that match your skills and interests.</p>
        </Link>

        <Link to="/interview" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition">
          <div className="text-4xl mb-4">🎤</div>
          <h3 className="text-xl font-bold mb-2">Mock Interview</h3>
          <p className="text-gray-500">Practice with AI-generated questions and feedback.</p>
        </Link>

        <Link to="/multimodal" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition">
          <div className="text-4xl mb-4">📹</div>
          <h3 className="text-xl font-bold mb-2">Multimodal Eval</h3>
          <p className="text-gray-500">Analyze your confidence and emotions via video.</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
