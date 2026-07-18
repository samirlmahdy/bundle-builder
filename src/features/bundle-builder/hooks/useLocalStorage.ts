import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'

type InitialValue<T> = T | (() => T)
type Deserialize<T> = (storedValue: string) => T

const deserializeJson = <T>(storedValue: string) => JSON.parse(storedValue) as T

function resolveInitialValue<T>(initialValue: InitialValue<T>) {
  return initialValue instanceof Function ? initialValue() : initialValue
}

export function useLocalStorage<T>(
  key: string,
  initialValue: InitialValue<T>,
  deserialize: Deserialize<T> = deserializeJson,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const fallback = resolveInitialValue(initialValue)

    if (typeof window === 'undefined') return fallback

    try {
      const storedValue = window.localStorage.getItem(key)
      return storedValue === null ? fallback : deserialize(storedValue)
    } catch {
      return fallback
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Keep in-memory state usable when storage is unavailable or full.
    }
  }, [key, value])

  return [value, setValue]
}
