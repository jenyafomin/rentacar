// dictionary-provider.tsx
'use client'

import React from "react"
import { getDictionary } from "./getDictionary"

type Dictionary = Awaited<ReturnType<typeof getDictionary>>

export const DictionaryContext = React.createContext<Dictionary | null>(null)

export default function DictionaryProvider({
  dictionary,
  children,
}: {
  dictionary: Dictionary
  children: React.ReactNode
}) {
  return (
    <DictionaryContext.Provider value={dictionary}>
      {children}
    </DictionaryContext.Provider>
  )
}