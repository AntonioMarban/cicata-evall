import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useSessionTimeout(timeoutDuration = 30 * 60 * 1000) { 
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      alert("Sesión expirada debido a inactividad. Por favor inicie sesión nuevamente.");
      localStorage.clear();
      navigate('/');
    }, timeoutDuration);
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      clearTimeout(timeoutRef.current);
    };
  }, []);
}