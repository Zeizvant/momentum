import { useState, useEffect } from 'react';
import { API_ENDPOINTS } from 'src/config/api.js';

const useDepartments = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await fetch(
                    API_ENDPOINTS.დეპარტამენტი
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch departments");
                }
                const data = await response.json();
                setDepartments(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    return { departments, loading, error };
};

export default useDepartments;