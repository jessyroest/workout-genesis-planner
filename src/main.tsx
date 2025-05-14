
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Preload audio files
const preloadAudio = (url: string) => {
  const audio = new Audio();
  audio.src = url;
};

preloadAudio("/audio/lightweight-baby.mp3");
preloadAudio("/audio/you-gotta-lift-heavy-bro.mp3");

// Add noise texture to body
document.body.classList.add('noise-bg');

createRoot(document.getElementById("root")!).render(<App />);
