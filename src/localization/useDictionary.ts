import React from "react"
import { DictionaryContext } from "./dictionaryProvider"

export function useDictionary() {
    const dictionary = React.useContext(DictionaryContext)
    if (dictionary === null) {
      throw new Error('useDictionary hook must be used within DictionaryProvider')
    }
  
    return dictionary
  }