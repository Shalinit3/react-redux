export const fetchData = async (url) => {
  const response = await fetch(url, {
    method: 'get',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  return response.json()
}
