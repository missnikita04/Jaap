import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [message, setMessage] = useState("");
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        // ✅ 1. Fetch dashboard message (protected)
        const dashboardRes = await axios.get("http://localhost:5000/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage(dashboardRes.data.message);

        // ✅ 2. Fetch total count (public route)
        const countRes = await axios.get("http://localhost:5000/api/count");
        setTotal(countRes.data.totalCount);

      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white">
      <h1 className="text-2xl mb-4">{message || "Loading..."}</h1>
      <h2 className="text-xl">Total Count: {total}</h2>
    </div>
  );
};

export default Dashboard;
