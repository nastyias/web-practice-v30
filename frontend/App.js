import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [releases, setReleases] = useState([]);
  const [version, setVersion] = useState('');
  const [status, setStatus] = useState('Success');

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5005/api/releases');
      setReleases(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5005/api/releases', { version, status });
      setVersion('');
      fetchData();
    } catch (error) {
      alert("Error: " + (error.response?.data?.error || "Server error"));
    }
  };

  return (
    <div className="App">
      <h1>Статус деплою: Лог релізів</h1>
      
      <form onSubmit={handleSubmit} className="release-form">
        <input 
          type="text" 
          placeholder="Версія" 
          value={version} 
          onChange={(e) => setVersion(e.target.value)} 
          required 
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Success">Success</option>
          <option value="Fail">Fail</option>
        </select>
        <button type="submit">Зберегти деплой</button>
      </form>

      <div className="list-container">
        {releases.map((item) => (
          <div key={item.id} className={`release-item ${item.status.toLowerCase()}`}>
            <span>Версія: <strong>{item.version}</strong></span>
            <span className="badge">{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
