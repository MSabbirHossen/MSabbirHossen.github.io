import { AnimatePresence, motion } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';

import React from 'react';
import NavLinks from './NavLinks';
import { forwardRef } from 'react';
import Button from '../common/Button';
import { FaFileAlt } from 'react-icons/fa';
import { HiX } from 'react-icons/hi';

const { personalInfo } = portfolioData;
const { name } = personalInfo;

const MobileMenu = forwardRef(function MobileMenu(
  { isOpen, setIsOpen, activeSection, onNavigate },
  ref
) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            id="mobile-navigation"
            ref={ref}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              type: 'spring',
              stiffness: 350,
              damping: 32,
            }}

            className="
fixed right-0 top-0
h-screen
w-[80%]
max-w-sm
z-50
bg-slate-900/95
backdrop-blur-xl
border-l border-slate-800
shadow-2xl
md:hidden
"
          >
            <div className="flex h-full flex-col gap-6 p-6">
              <header className="flex items-center justify-between border-b border-cyan-800 pb-4">
                <h2 className="text-xl font-semibold text-slate-100">{name}</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-md p-2 text-slate-400 hover:bg-slate-700"
                >
                  <HiX className="h-6 w-6" />
                </button>
              </header>
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
          <motion.aside
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          ></motion.aside>
        </>
      )}
    </AnimatePresence>
  );
});

export default MobileMenu;
