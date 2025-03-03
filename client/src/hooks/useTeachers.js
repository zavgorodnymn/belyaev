import { useState, useEffect, useCallback } from 'react';
import { userService } from '../services/userService';

export const useTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTeachers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await userService.getAllTeachers();
      setTeachers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  return { teachers, loading, error, refetch: fetchTeachers };
}; 