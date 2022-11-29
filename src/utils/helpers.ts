import { useCallback } from 'react'

export const useClickOutside = (element: HTMLDivElement | null, onClick: () => void): any => {
  const listenOutsideClick = useCallback((event: MouseEvent): void => {
    if (element !== null && !element.contains(event.target as Node)) {
      onClick()
    }
  }, [element])

  const startListen = (): any => {
    document.addEventListener('click', listenOutsideClick)
  }

  const stopListen = (): any => {
    document.removeEventListener('click', listenOutsideClick)
  }

  return [startListen, stopListen]
}
