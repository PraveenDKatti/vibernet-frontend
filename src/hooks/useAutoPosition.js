
import { useEffect } from 'react';

export default function useAutoPosition(menuRef, isOpen) {
  useEffect(() => {
    if (!isOpen) return;

    const menu = menuRef?.current
    if (!menu) return;

    menu.style.removeProperty('left');
    menu.style.removeProperty('right');
    menu.style.removeProperty('top');
    menu.style.removeProperty('bottom');

    const rect = menu.getBoundingClientRect()
    const viewportWidth = document.documentElement.clientWidth
    const viewportHeight = document.documentElement.clientHeight

    if (rect.right > viewportWidth) {
      menu.style.setProperty('left', 'auto');
      menu.style.setProperty('right', '100%');
    } else if (rect.left < 0) {
      menu.style.setProperty('right', 'auto');
      menu.style.setProperty('left', '100%');
    }

    if (rect.bottom > viewportHeight) {
      menu.style.setProperty('top', 'auto');
      menu.style.setProperty('bottom', '100%');
    } else if (rect.top < 0) {
      menu.style.setProperty('bottom', 'auto');
      menu.style.setProperty('top', '100%');
    }
  }, [menuRef, isOpen]);
}
