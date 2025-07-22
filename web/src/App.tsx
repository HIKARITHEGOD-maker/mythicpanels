// web/src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoryList } from './components/StoryList';
import { StoryView } from './components/StoryView';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<StoryList />} />
      <Route path="/stories/:id" element={<StoryView />} />
    </Routes>
  </BrowserRouter>
);