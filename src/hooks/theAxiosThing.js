import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  }
);

export const saveAnime = (anime) => {
  return axios
    .post(`${import.meta.env.VITE_ENDPOINT_BASE}/anime`, anime)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const deleteAnime = (id) => {
  return axios
    .delete(`${import.meta.env.VITE_ENDPOINT_BASE}/anime/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateAnime = (id, updatedFields) => {
  return axios
    .put(`${import.meta.env.VITE_ENDPOINT_BASE}/anime/${id}`, updatedFields)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const useData = (url, options = { method: "get", data: null }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios({ url, ...options });
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      fetchData();
    };
    getData();
  }, [url, options.method, options.data]);

  const refetch = () => {
    fetchData();
  };

  return { data, error, loading, refetch };
};

// export default { getAnimes, useData };

export const getAnimeData = async () => {
  try {
    const response = await api.get("/api/animes/all");
    return response.data;
  } catch (error) {
    console.error("Fetch error: ", error);
    return null;
  }
};
