import JournalCard from "./JournalCard";
import { BookText, List } from "lucide-react";
import Button from "./ui/Button";
import { useJournals } from "../hooks/useJournals";

const HistoryList = () => {
  const { entries, loading, error, refetchEntries } = useJournals();

  // ensure entries is always an array
  const safeEntries = entries || [];

  if (loading && safeEntries.length === 0) {
    return (
      <div className="card p-8 text-center">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p>Loading your journal...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <BookText className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-semibold text-gray-900">
          Journal History
        </h3>

        <Button onClick={refetchEntries} className="ml-auto">
          Refresh
        </Button>
      </div>

      {error && (
        <div className="card p-4 bg-red-50 border-red-200">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {safeEntries.length === 0 ? (
        <div className="card text-center py-12">
          <List className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-1">
            No entries yet
          </h4>
          <p className="text-gray-500">
            Create your first journal entry above to get started
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {safeEntries.map((entry) => (
            <JournalCard key={entry._id || Math.random()} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryList;