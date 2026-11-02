import { lazy, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

import Header from '../components/layout/Header';
import Footer from '../components/footer/Footer';
import useAIChat from '../hooks/useAIChat';
import AIChatButton from '../components/common/AIChatButton';
import { EASINGS } from '../lib/motion';

const AIChatModal = lazy(() => import('../components/common/AIChatModal'));

export default function MainLayout() {
  const chat = useAIChat();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300">
      <Header />
      <main className="grow pt-24">
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
