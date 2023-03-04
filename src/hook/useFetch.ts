import { useEffect, useState } from "react"

export function useFetch<S>(url: string) {
  const [data, setData] = useState<S>()

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then((res) => {
        setData(res)
      })
  }, [])
  return {
    data
  }
}