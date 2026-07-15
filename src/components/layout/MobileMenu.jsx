import { AnimatePresence, motion } from 'framer-motion';

import React from 'react';
import NavLinks from './NavLinks';
import { forwardRef } from 'react';
import Button from '../common/Button';
import { FaFileAlt } from 'react-icons/fa';

const MobileMenu = forwardRef(function MobileMenu({ isOpen, activeSection, onNavigate }, ref) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-navigation"
          ref={ref}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="glass absolute left-0 top-full w-full border-t border-slate-200 px-6 py-6 shadow-xl dark:border-slate-800 md:hidden"
        >
          <div className="flex flex-col space-y-4">
            <NavLinks mobile activeSection={activeSection} onNavigate={onNavigate} />
            <Button
              as="a"
              href="/resume/Md_Sabbir_Hossen_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              variant="primary"
            >
              <FaFileAlt className="h-4 w-4" />
              Resume
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default MobileMenu;
