import { AnimatePresence, motion } from 'framer-motion';

import React from 'react';
import NavLinks from './NavLinks';

const MobileMenu = ({ isOpen, activeSection, onNavigate }) => {
  return (
    <div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="glass absolute left-0 top-full w-full border-t border-slate-200 px-6 py-6 shadow-xl dark:border-slate-800 md:hidden"
          >
            <div className="flex flex-col space-y-4">
              <NavLinks mobile activeSection={activeSection} onNavigate={onNavigate} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
