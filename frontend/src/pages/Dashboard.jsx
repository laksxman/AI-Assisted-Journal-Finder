import { useJournals } from '../hooks/useJournals';
import EntryForm from '../components/EntryForm';
import HistoryList from '../components/HistoryList';
import Insights from '../components/Insights';
import { useAuth } from '../context/AuthContext';
import { Users, Settings, Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { loading: authLoading } = useAuth();
  const { loading } = useJournals();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 bg-blue-100 p-2 rounded-xl text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                AI Journal
              </h1>
              <p className="text-gray-600">Reflect with AI-powered insights</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Left Column - Entry Form */}
        <div className="lg:col-span-1">
          <EntryForm />
        </div>

        {/* Right Column - Insights */}
        <div className="lg:col-span-2 space-y-6">
          <Insights />
        </div>
      </div>

      {/* Full Width History */}
      {!loading && <HistoryList />}
    </div>
  );
};

export default Dashboard;

