import React from 'react';
import { createRoot } from 'react-dom/client';
import TopTrumpsGame from '../ai_vendors_top_trumps_fixed';
import './index.css';

const root = document.getElementById('root')!;
createRoot(root).render(
  <React.StrictMode>
    <TopTrumpsGame />
  </React.StrictMode>
);
