import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import WebSearch from './pages/WebSearch';
import Tasks from './pages/Tasks';
import Projects from './pages/Projects';
import Workspace from './pages/Workspace';
import Calendar from './pages/Calendar';
import Meetings from './pages/Meetings';
import Teams from './pages/Teams';
import TeamWorkspace from './pages/TeamWorkspace';
import AIAssistant from './pages/AIAssistant';
import Notebooks from './pages/Notebooks';
import NovaApps from './pages/Apps';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/web-search" element={<WebSearch />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/team-workspace" element={<TeamWorkspace />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
        <Route path="/notebooks" element={<Notebooks />} />
        <Route path="/apps" element={<NovaApps />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
