"use client";
import { useState } from 'react';
import { FiHome, FiBookOpen, FiFileText, FiCode, FiFile, FiExternalLink, FiUser, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Overview', href: '/dashboard', icon: FiHome },
  { name: 'Research Assistant', href: '#', icon: FiBookOpen },
  { name: 'Research Reports', href: '#', icon: FiFileText },
  { name: 'API Playground', href: '/playground', icon: FiCode },
  { name: 'Invoices', href: '#', icon: FiFile },
  { name: 'Documentation', href: 'https://docs.example.com', icon: FiExternalLink, external: true },
];

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  return (
    <aside className={`relative flex flex-col h-screen bg-white dark:bg-[#f8fafc] border-r border-gray-100 dark:border-gray-800 shadow-sm rounded-none p-6 transition-all duration-300 ${open ? 'w-64' : 'w-16 px-2'}`}>
      {/* Toggle button always visible at top right */}
      <button
        className="absolute top-4 right-4 z-20 bg-white border border-gray-200 rounded-full p-1 shadow hover:bg-gray-100 transition cursor-pointer"
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
        type="button"
      >
        {open ? <FiChevronLeft className="w-5 h-5" /> : <FiChevronRight className="w-5 h-5" />}
      </button>
      {/* Logo/Title */}
      <div className={`mb-10 mt-2 flex items-center gap-2 select-none transition-all duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none h-0 mb-0'}`}
        style={{ minHeight: open ? 'auto' : 0 }}
      >
        <span className="text-2xl font-extrabold tracking-tight text-gray-900">Tavily <span className="font-light">AI</span></span>
      </div>
      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-1">
          {navItems.map((item, idx) => {
            const isActive = !item.external && pathname === item.href;
            return (
              <li key={item.name}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-200/60 transition font-medium group cursor-pointer ${open ? 'px-3' : 'justify-center'}`}
                  >
                    <item.icon className="w-5 h-5 text-gray-400 group-hover:text-primary" />
                    {open && <span>{item.name}</span>}
                    {open && <FiExternalLink className="w-4 h-4 ml-auto text-gray-300" />}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className={`block rounded-lg transition font-medium group cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-200/60 ${isActive ? 'bg-gray-100 text-primary font-bold' : 'text-gray-700'}`}
                  >
                    <div className={`flex items-center gap-3 py-2 w-full ${open ? 'px-3' : 'justify-center'}`}>
                      <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-gray-400'} group-hover:text-primary`} />
                      {open && <span>{item.name}</span>}
                    </div>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      {/* User info at bottom */}
      <div className={`mt-auto flex items-center gap-3 pt-8 transition-all duration-300 ${open ? '' : 'justify-center'}`}>
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl">
          <FiUser />
        </div>
        {open && (
          <div>
            <div className="font-semibold text-gray-900 text-sm">Eden Marco</div>
            <div className="text-xs text-gray-400">User</div>
          </div>
        )}
      </div>
    </aside>
  );
} 