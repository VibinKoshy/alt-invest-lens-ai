import { TrendingUp, Settings, Bell, User, Upload, BarChart3, Shield, Bot, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
const Header = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  return <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Portfolio Analyzer</h1>
          </div>
          
          
          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link to="/" className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-600 hover:text-gray-900'}`}>
              Dashboard
            </Link>
            <Link to="/upload" className={`flex items-center space-x-1 text-sm font-medium transition-colors ${isActive('/upload') ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-600 hover:text-gray-900'}`}>
              <Upload className="h-4 w-4" />
              <span>Data Upload</span>
            </Link>
            <Link to="/scenarios" className={`flex items-center space-x-1 text-sm font-medium transition-colors ${isActive('/scenarios') ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-600 hover:text-gray-900'}`}>
              <BarChart3 className="h-4 w-4" />
              <span>Scenario Modeling</span>
            </Link>
            <Link to="/risk-compliance" className={`flex items-center space-x-1 text-sm font-medium transition-colors ${isActive('/risk-compliance') ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-600 hover:text-gray-900'}`}>
              <Shield className="h-4 w-4" />
              <span>Risk & Compliance</span>
            </Link>
            <Link to="/reports" className={`flex items-center space-x-1 text-sm font-medium transition-colors ${isActive('/reports') ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-600 hover:text-gray-900'}`}>
              <FileText className="h-4 w-4" />
              <span>Reports</span>
            </Link>
            <Link to="/ai-assistant" className={`flex items-center space-x-1 text-sm font-medium transition-colors ${isActive('/ai-assistant') ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-600 hover:text-gray-900'}`}>
              <Bot className="h-4 w-4" />
              <span>AI Assistant</span>
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <User className="h-4 w-4 mr-2" />
            John Anderson
          </Button>
        </div>
      </div>
    </header>;
};
export default Header;