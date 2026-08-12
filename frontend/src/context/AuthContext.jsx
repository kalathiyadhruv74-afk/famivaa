import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Set initial Authorization header immediately if token exists in localStorage
const storedToken = localStorage.getItem('famivaa_access_token');
if (storedToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(storedToken || null);
  const [loading, setLoading] = useState(true);

  // Setup Axios interceptor for automatic JWT refresh on 401 Unauthorized
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        // Exclude login/register requests from auto-refresh
        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          !originalRequest.url.includes('/api/auth/login/') &&
          !originalRequest.url.includes('/api/auth/register/') &&
          !originalRequest.url.includes('/api/auth/refresh/')
        ) {
          originalRequest._retry = true;
          const refreshToken = localStorage.getItem('famivaa_refresh_token');

          if (refreshToken) {
            try {
              const res = await axios.post('/api/auth/refresh/', { refresh: refreshToken });
              const newAccess = res.data.access;
              
              localStorage.setItem('famivaa_access_token', newAccess);
              axios.defaults.headers.common['Authorization'] = `Bearer ${newAccess}`;
              originalRequest.headers['Authorization'] = `Bearer ${newAccess}`;
              
              setToken(newAccess);
              return axios(originalRequest);
            } catch (refreshErr) {
              console.error('Token refresh failed:', refreshErr);
              logout();
            }
          } else {
            logout();
          }
        }
        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  // Sync token state and fetch current user profile
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('famivaa_access_token', token);
      fetchCurrentUser();
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('famivaa_access_token');
      localStorage.removeItem('famivaa_refresh_token');
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get('/api/auth/me/');
      setUser(response.data);
    } catch (err) {
      console.error('Failed to fetch user profile:', err);
      if (err.response?.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await axios.post('/api/auth/login/', { email, password });
    const { access, refresh, user: userData } = response.data;
    localStorage.setItem('famivaa_refresh_token', refresh);
    axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
    setToken(access);
    setUser(userData);
    return userData;
  };

  const register = async (formData) => {
    const response = await axios.post('/api/auth/register/', formData);
    const { access, refresh, user: userData } = response.data;
    localStorage.setItem('famivaa_refresh_token', refresh);
    axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
    setToken(access);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('famivaa_access_token');
    localStorage.removeItem('famivaa_refresh_token');
  };

  const updateProfile = async (profileData) => {
    const response = await axios.put('/api/auth/me/', profileData);
    setUser(response.data);
    return response.data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        updateProfile,
        isAdmin: user?.is_staff || user?.is_superuser || false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
