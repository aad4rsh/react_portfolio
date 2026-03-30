import React from 'react';
import SearchBar from './components/molecules/SearchBar';
import './App.css';

function App() {
  const handleSearch = () => {
    alert('Searching...');
  };

  return (
    <div className="container">
      <header className="hero-section">
        <h1 className="hero-title">Welcome to Your Portfolio</h1>
        <p className="hero-subtitle">Bringing Atomic Design to life, one component at a time.</p>
        
        <div className="search-container">
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      <main className="content">
        <div className="card-grid">
          {/* Organisms will go here later */}
          <p className="placeholder-text">Structure is set! Time to build your organisms.</p>
        </div>
      </main>
    </div>
  );
}

export default App;
