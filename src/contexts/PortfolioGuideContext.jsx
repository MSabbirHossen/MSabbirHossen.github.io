import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PortfolioGuideContext = createContext(null);

const STORAGE_KEY = 'portfolio-guide-completed';

const parseSearchForGuide = (search) => {
  if (typeof window === 'undefined' || !search) return { isOpen: false, step: 0 };
  const params = new window.URLSearchParams(search);
  if (params.get('guide') === 'true' || params.get('tour') === 'true') {
    const stepParam = parseInt(params.get('step') || '0', 10);
    const validStep = !isNaN(stepParam) && stepParam >= 0 && stepParam <= 7 ? stepParam : 0;
    return { isOpen: true, step: validStep };
  }
  return { isOpen: false, step: 0 };
};

export function PortfolioGuideProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(() => parseSearchForGuide(location.search).isOpen);
  const [currentStep, setCurrentStep] = useState(() => parseSearchForGuide(location.search).step);
  const [direction, setDirection] = useState(1);

  const [hasCompleted, setHasCompleted] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(STORAGE_KEY) === 'true';
  });

  const openGuide = useCallback((stepIndex = 0) => {
    setCurrentStep(Math.max(0, Math.min(stepIndex, 7)));
    setDirection(1);
    setIsOpen(true);
  }, []);

  const closeGuide = useCallback(() => {
    setIsOpen(false);
  }, []);

  const nextStep = useCallback(() => {
    setDirection(1);
    setCurrentStep((prev) => Math.min(prev + 1, 7));
  }, []);

  const prevStep = useCallback(() => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToStep = useCallback((stepIndex) => {
    setCurrentStep((prev) => {
      setDirection(stepIndex > prev ? 1 : -1);
      return Math.max(0, Math.min(stepIndex, 7));
    });
  }, []);

  const restartGuide = useCallback(() => {
    setDirection(-1);
    setCurrentStep(0);
  }, []);

  const finishGuide = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, 'true');
    }
    setHasCompleted(true);
    setIsOpen(false);
  }, []);

  const navigateToDestination = useCallback(
    (to, shouldClose = true) => {
      if (shouldClose) {
        setIsOpen(false);
      }
      navigate(to);
    },
    [navigate]
  );

  const value = useMemo(
    () => ({
      isOpen,
      currentStep,
      direction,
      hasCompleted,
      openGuide,
      closeGuide,
      nextStep,
      prevStep,
      goToStep,
      restartGuide,
      finishGuide,
      navigateToDestination,
    }),
    [
      isOpen,
      currentStep,
      direction,
      hasCompleted,
      openGuide,
      closeGuide,
      nextStep,
      prevStep,
      goToStep,
      restartGuide,
      finishGuide,
      navigateToDestination,
    ]
  );

  return <PortfolioGuideContext.Provider value={value}>{children}</PortfolioGuideContext.Provider>;
}

export function usePortfolioGuide() {
  const context = useContext(PortfolioGuideContext);
  if (!context) {
    throw new Error('usePortfolioGuide must be used within a PortfolioGuideProvider');
  }
  return context;
}
