import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToTarget } from './smooth';

// Scroll to a section on the home page, routing there first when needed.
export function useSectionNav() {
  const location = useLocation();
  const navigate = useNavigate();
  return useCallback(
    (id) => {
      if (location.pathname === '/') scrollToTarget(`#${id}`);
      else navigate(`/#${id}`);
    },
    [location.pathname, navigate]
  );
}

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'ask', label: 'Ask' },
  { id: 'contact', label: 'Contact' },
];
