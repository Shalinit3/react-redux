export default () => {
  let characters = []

  for (let i = 0; i < 26; i++) {
    characters.push({
      data: {
        value: String.fromCharCode(65 + i)
      },
      content: String.fromCharCode(65 + i)
    })
  }

  return characters
}
