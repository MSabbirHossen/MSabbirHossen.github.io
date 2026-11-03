import { lazy, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

import Header from '../components/layout/Header';
import Footer from '../components/footer/Footer';
import useAIChat from '../hooks/useAIChat';
import AIChatButton from '../components/common/AIChatButton';
import PortfolioGuideModal from '../components/guide/PortfolioGuideModal';
import { EASINGS } from '../lib/motion';
import { useTranslation } from '../i18n';

const AIChatModal = lazy(() => import('../components/common/AIChatModal'));

export default function MainLayout() {
  const { t } = useTranslation();
  const chat = useAIChat();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 rtl:focus:right-4 rtl:focus:left-auto focus:z-[100] focus:rounded-xl focus:bg-accent-primary focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-light-bg dark:focus-visible:ring-offset-dark-bg"
      >
        {t('common.skipToContent', {}, 'Skip to main content')}
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} className="grow pt-24 outline-none">
        <motion.div
          key={location.pathname}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.22,
            ease: EASINGS.smooth,
          }}
        >
          <Outlet />
        </motion.div>
      </main>
      <Footer />
      <PortfolioGuideModal />
      <AIChatButton onClick={chat.toggleChat} isOpen={chat.isOpen} />
      {chat.isOpen && (
        <Suspense fallback={null}>
          <AIChatModal
            isOpen={chat.isOpen}
            messages={chat.messages}
            input={chat.input}
            isTyping={chat.isTyping}
            quickPrompts={chat.quickPrompts}
            featuredProjectHighlights={chat.featuredProjectHighlights}
            recentWorkHighlights={chat.recentWorkHighlights}
            hasConversation={chat.hasConversation}
            announcement={chat.announcement}
            onClose={chat.closeChat}
            onNewChat={chat.startNewChat}
            onChange={chat.setInput}
            onSend={chat.sendMessage}
            onAction={chat.triggerAction}
          />
        </Suspense>
      )}
    </div>
  );
}
