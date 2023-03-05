import { useEffect, useState } from "react"


export function useFetch<S>(url: string, options?: RequestInit) {
  const [fetchData, setData] = useState<S>()
  
  async function setFetchData() {
    const res = await fetch(url, options)
    const data = await res.json()
    setData(data)
  } 

  useEffect(() => {
    setFetchData()
  }, [])

  return {
    fetchData,
    setFetchData
  }
}

