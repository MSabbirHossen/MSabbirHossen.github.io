import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import AIChatButton from '../components/common/AIChatButton';
import Header from '../components/layout/Header';
import Footer from '../components/footer/Footer';
import useAIChat from '../hooks/useAIChat';

const AIChatModal = lazy(() => import('../components/common/AIChatModal'));

export default function MainLayout() {
  const chat = useAIChat();

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300">
      <Header />
      <main className="grow pt-24">
        <Outlet />
      </main>
      <Footer />
      {/* <AIChatButton onClick={chat.toggleChat} isOpen={chat.isOpen} /> */}
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
          onChange={chat.setInput}
          onSend={chat.sendMessage}
          onAction={chat.triggerAction}
        />
      </Suspense>
    </div>
  );
}
