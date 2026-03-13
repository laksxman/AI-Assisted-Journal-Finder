import { formatRelativeDate } from '../utils/formatDate';
import { Badge } from "./ui/Budge";
import { Trees, Waves, MountainSnow } from "lucide-react";

const ambienceIcons = {
  forest: Trees,
  ocean: Waves,
  mountain: MountainSnow
};

const JournalCard = ({ entry }) => {
  const Icon = ambienceIcons[entry.ambience];
  
  const emotionColors = {
    happy: 'bg-green-100 text-green-800',
    sad: 'bg-red-100 text-red-800',
    calm: 'bg-blue-100 text-blue-800',
    anxious: 'bg-yellow-100 text-yellow-800',
    excited: 'bg-orange-100 text-orange-800',
    neutral: 'bg-gray-100 text-gray-800'
  };

  return (
    <div className="card group">
      <div className="flex items-start space-x-4 mb-4">
        <div className="p-3 bg-gradient-to-br rounded-xl">
          <Icon className="w-8 h-8 text-green-500" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-medium text-gray-900">
              {entry.ambience.charAt(0).toUpperCase() + entry.ambience.slice(1)}
            </span>
            <Badge className={emotionColors[entry.emotion] || 'bg-gray-100 text-gray-800'}>
              {entry.emotion}
            </Badge>
          </div>
          <p className="text-sm text-gray-600 mb-2 line-clamp-3">
            {entry.summary || entry.text.substring(0, 100) + '...'}
          </p>
          <div className="flex flex-wrap gap-1 mb-3">
            {entry.keywords.slice(0, 3).map((keyword, i) => (
              <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                {keyword}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500">
            {formatRelativeDate(entry.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JournalCard;

