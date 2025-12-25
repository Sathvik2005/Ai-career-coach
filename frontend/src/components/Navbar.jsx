import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">AI Career Coach</Link>
          <div className="flex space-x-4">
            <Link to="/resume" className="hover:text-indigo-200">Resume</Link>
            <Link to="/career" className="hover:text-indigo-200">Career</Link>
            <Link to="/interview" className="hover:text-indigo-200">Interview</Link>
            <Link to="/multimodal" className="hover:text-indigo-200">Multimodal</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
