import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SessionList from './containers/SessionList';
import SessionDetail from './containers/SessionDetail';

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <header>
          <h2>Event Viewer</h2>
        </header>
        <section>
          <Route path="/" exact component={SessionList} />
          <Route path="/session/list" component={SessionList} />
          <Route path="/session/:id/" component={SessionDetail} />
        </section>
      </Router>
    </div>
  );
}

export default App;
