const georgianLan = (text: string, key: string) => {
  const geoRegex = /[\u10A0-\u10FF]/
  const word = text.replace(/\s/g, '')

  for (let i = 0; i < word.length; i++) {
    const char = word[i]
    const isGeorgian = geoRegex.test(char)

    if (key !== 'biography' && !isGeorgian) {
      return false
    }

    if (
      !isGeorgian &&
      !/[-!$%^&*()_+|~=`{}[\]:";'<>?,./]/.test(char) &&
      !+char
    ) {
      return false
    }
  }

  return true
}

export default georgianLan
