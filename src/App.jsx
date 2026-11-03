import { lazy, Suspense, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ThemeProvider } from './contexts/ThemeContext';
import { PortfolioGuideProvider } from './contexts/PortfolioGuideContext';
import { LanguageProvider, useLanguage } from './i18n';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import LogoLoader from './components/common/LogoLoader';

const Projects = lazy(() => import('./pages/Projects'));
const Experience = lazy(() => import('./pages/Experience'));
const Education = lazy(() => import('./pages/Education'));
const Certifications = lazy(() => import('./pages/Certifications'));
const Developer = lazy(() => import('./pages/Developer'));
const Guide = lazy(() => import('./pages/Guide'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const Recruiter = lazy(() => import('./pages/Recruiter'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const location = useLocation();
  const prevPathname = useRef(location.pathname);

  useEffect(() => {
    const isNewPathname = prevPathname.current !== location.pathname;
    prevPathname.current = location.pathname;

    if (isNewPathname && !location.state?.scrollToSection && !location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.state, location.hash]);

  return null;
}

function LocalizedToastContainer() {
  const { isRTL } = useLanguage();

  return (
    <ToastContainer
      position={isRTL ? 'bottom-left' : 'bottom-right'}
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={isRTL}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <ThemeProvider>
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <PortfolioGuideProvider>
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
                    <Route path="recruiter" element={<Recruiter />} />
                    <Route path="recruiter-view" element={<Navigate to="/recruiter" replace />} />
                    <Route path="quick-scan" element={<Navigate to="/recruiter" replace />} />
                    <Route path="developer" element={<Developer />} />
                    <Route path="developer-info" element={<Navigate to="/developer" replace />} />
                    <Route path="guide" element={<Guide />} />
                    <Route path="portfolio-guide" element={<Navigate to="/guide" replace />} />
                    <Route path="contact" element={<Navigate to="/#contact" replace />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </Suspense>
            </PortfolioGuideProvider>
          </BrowserRouter>
          <LocalizedToastContainer />
        </ThemeProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
}
