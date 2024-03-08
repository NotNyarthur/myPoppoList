import { useState, useEffect } from "react";
import axios from "axios";

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

export const deleteProduct = (id) => {
  return axios
    .delete(`${import.meta.env.VITE_ENDPOINT_BASE}/anime/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateProduct = (id, updatedFields) => {
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
