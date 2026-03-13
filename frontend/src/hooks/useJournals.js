import { useState, useEffect, useCallback } from 'react';
import { journalApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const useJournals = () => {
  const [entries, setEntries] = useState([]);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userId } = useAuth();

  const fetchEntries = useCallback(async (page = 1) => {
    if (!userId) return;
    setLoading(true);
    try {
      const response = await journalApi.getEntries(userId, page);
      setEntries(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load entries');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const fetchInsights = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const response = await journalApi.getInsights(userId);
      setInsights(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load insights');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const createEntry = async (data) => {
    try {
      const response = await journalApi.createEntry(data);
      await fetchEntries(1); // Refresh
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create entry');
      throw err;
    }
  };

  useEffect(() => {
    if (userId) {
      fetchEntries();
      fetchInsights();
    }
  }, [userId, fetchEntries, fetchInsights]);

  return {
    entries,
    insights,
    loading,
    error,
    refetchEntries: fetchEntries,
    refetchInsights: fetchInsights,
    createEntry
  };
};

