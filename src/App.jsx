import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ThemeProvider } from './contexts/ThemeContext';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import LogoLoader from './components/common/LogoLoader';

const Projects = lazy(() => import('./pages/Projects'));
const Experience = lazy(() => import('./pages/Experience'));
const Education = lazy(() => import('./pages/Education'));
const Certifications = lazy(() => import('./pages/Certifications'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    if (!location.state?.scrollToSection && !location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.state, location.hash]);

  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <ScrollToTop />
          <Suspense fallback={<LogoLoader fullScreen message="Loading..." />}>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="projects" element={<Projects />} />
                <Route path="projects/:slug" element={<ProjectDetails />} />
                <Route path="project/:id" element={<Navigate to="/projects" replace />} />
                <Route path="experience" element={<Experience />} />
                <Route path="education" element={<Education />} />
                <Route path="certifications" element={<Certifications />} />
                <Route path="contact" element={<Navigate to="/#contact" replace />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
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
