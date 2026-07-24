import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ThemeProvider } from './contexts/ThemeContext';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import GitHubStats from './components/github/GitHubStats';
import Skills from './components/skills/Skills';
import About from './components/about/About';
import Certifications from './components/sections/Certifications';
import Education from './components/sections/Education';
import Projects from './components/projects/Projects';
import Contact from './components/sections/Contact';

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:slug" element={<ProjectDetails />} />
              <Route path="project/:id" element={<Navigate to="/" replace />} />
              <Route path="skills" element={<Skills />} />
              <Route path="contact" element={<Contact />} />

              <Route path="education" element={<Education />} />
              <Route path="github-stats" element={<GitHubStats />} />
              <Route path="certifications" element={<Certifications />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer
          position="bottom-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </ThemeProvider>
    </HelmetProvider>
  );
}
