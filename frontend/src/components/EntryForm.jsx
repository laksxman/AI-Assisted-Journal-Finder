import { useState } from "react";
import { journalApi } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useJournals } from "../hooks/useJournals";
import { Trees, Waves, MountainSnow } from "lucide-react";
import Button from "./ui/Button";
import Select, { SelectItem } from "./ui/Select";

const AMBIENCES = [
  { value: "forest", label: "Forest", icon: Trees },
  { value: "ocean", label: "Ocean", icon: Waves },
  { value: "mountain", label: "Mountain", icon: MountainSnow },
];

const EntryForm = () => {
  const [ambience, setAmbience] = useState("forest");
  const [text, setText] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { userId } = useAuth();
  const { createEntry, refetchEntries, refetchInsights } = useJournals();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setSubmitting(true);

    try {
      await createEntry({ userId, ambience, text });

      setText("");
      refetchEntries();
      refetchInsights();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setAnalyzing(true);

    try {
      const response = await journalApi.analyzeText(text);

      await createEntry({
        userId,
        ambience,
        text:
          text +
          "\n\nAI Analysis:\n" +
          JSON.stringify(response.data, null, 2),
      });

      setText("");
      refetchEntries();
      refetchInsights();
    } catch (error) {
      console.error(error);
    } finally {
      setAnalyzing(false);
    }
  };

  const Icon =
    AMBIENCES.find((a) => a.value === ambience)?.icon || Trees;

  return (
    <div className="card p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        ✍️ New Journal Entry
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Ambience Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ambience
          </label>

          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-green-600" />

            <Select
              value={ambience}
              onChange={(e) => setAmbience(e.target.value)}
            >
              {AMBIENCES.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>

        {/* Textarea */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your thoughts...
          </label>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Describe your experience with this ambience session..."
            rows={6}
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            disabled={submitting || !text.trim()}
            className="flex-1"
          >
            {submitting ? "Saving..." : "Save Entry"}
          </Button>

          <Button
            type="button"
            onClick={handleAnalyze}
            disabled={analyzing || !text.trim()}
            className="px-6 bg-purple-600 hover:bg-purple-700"
          >
            {analyzing ? "Analyzing..." : "AI Analyze"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EntryForm;