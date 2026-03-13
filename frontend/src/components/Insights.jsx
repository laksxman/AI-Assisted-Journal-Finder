import { TrendingUp } from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";

import { useJournals } from "../hooks/useJournals";

const Insights = () => {
  const { insights, loading, error } = useJournals();

  if (loading) {
    return (
      <div className="card p-8 text-center">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p>Loading insights...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-4 bg-yellow-50 border-yellow-200">
        <p className="text-yellow-800 text-sm">{error}</p>
      </div>
    );
  }

  if (!insights || insights.totalEntries === 0) {
    return (
      <div className="card text-center py-12">
        <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h4 className="text-lg font-medium text-gray-900 mb-1">No insights yet</h4>
        <p className="text-gray-500">
          Create some journal entries to see your patterns
        </p>
      </div>
    );
  }

  // Mock data for demo - in real would aggregate from insights
  const emotionData = [
    { name: 'Calm', value: insights.topEmotion === 'calm' ? 45 : 20 },
    { name: 'Happy', value: 30 },
    { name: 'Excited', value: 15 },
    { name: 'Neutral', value: 10 }
  ];

  const ambienceData = [
    { name: insights.mostUsedAmbience || 'Forest', value: 60 },
    { name: 'Ocean', value: 25 },
    { name: 'Mountain', value: 15 }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#6b7280'];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <TrendingUp className="w-6 h-6 text-green-600" />
        <h3 className="text-xl font-semibold text-gray-900">📊 Insights</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="card p-6 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {insights.totalEntries || 0}
            </div>
            <div className="text-sm text-gray-600">Total Entries</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {insights.topEmotion || 'Calm'}
            </div>
            <div className="text-sm text-gray-600">Top Emotion</div>
          </div>
          <div className="card p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {insights.mostUsedAmbience || 'Forest'}
            </div>
            <div className="text-sm text-gray-600">Favorite Ambience</div>
          </div>
        </div>

        {/* Charts */}
        <div className="space-y-4">
          <div className="card p-6">
            <h4 className="font-semibold mb-4">Emotion Distribution</h4>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={emotionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  dataKey="value"
                  nameKey="name"
                >
                  {emotionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="card p-6">
            <h4 className="font-semibold mb-4">Ambience Usage</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={ambienceData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {insights.recentKeywords && insights.recentKeywords.length > 0 && (
        <div className="card p-6">
          <h4 className="font-semibold mb-4">Recent Keywords</h4>
          <div className="flex flex-wrap gap-2">
            {insights.recentKeywords.slice(0, 8).map((kw, i) => (
              <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Insights;

