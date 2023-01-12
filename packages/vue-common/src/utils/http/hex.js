class Hex {
  encode(b, pos, len) {
    const hexCh = new Array(len * 2)
    const hexCode = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
    for (let i = pos, j = 0; i < len + pos; i++, j++) {
      hexCh[j] = hexCode[(b[i] & 0xFF) >> 4]
      hexCh[++j] = hexCode[b[i] & 0x0F]
    }

    return hexCh.join('')
  }

  decode(hex) {
    if (hex === null || hex === '')
      return null

    if (hex.length % 2 !== 0)
      return null

    const ascLen = hex.length / 2
    const hexCh = this.toCharCodeArray(hex)
    const asc = new Array(ascLen)

    for (let i = 0; i < ascLen; i++) {
      if (hexCh[2 * i] >= 0x30 && hexCh[2 * i] <= 0x39) {
        asc[i] = (hexCh[2 * i] - 0x30) << 4
      }
      else if (hexCh[2 * i] >= 0x41 && hexCh[2 * i] <= 0x46) {
        // A-F : 0x41-0x46
        asc[i] = (hexCh[2 * i] - 0x41 + 10) << 4
      }
      else if (hexCh[2 * i] >= 0x61 && hexCh[2 * i] <= 0x66) {
        // a-f  : 0x61-0x66
        asc[i] = (hexCh[2 * i] - 0x61 + 10) << 4
      }
      else {
        return null
      }
      if (hexCh[2 * i + 1] >= 0x30 && hexCh[2 * i + 1] <= 0x39)
        asc[i] = asc[i] | (hexCh[2 * i + 1] - 0x30)
      else if (hexCh[2 * i + 1] >= 0x41 && hexCh[2 * i + 1] <= 0x46)
        asc[i] = asc[i] | (hexCh[2 * i + 1] - 0x41 + 10)
      else if (hexCh[2 * i + 1] >= 0x61 && hexCh[2 * i + 1] <= 0x66)
        asc[i] = asc[i] | (hexCh[2 * i + 1] - 0x61 + 10)
      else
        return null
    }
    return asc
  }

  utf8StrToHex(utf8Str) {
    const ens = encodeURIComponent(utf8Str)
    const es = unescape(ens)
    const esLen = es.length
    // Convert
    const words = []
    for (let i = 0; i < esLen; i++)
      words[i] = es.charCodeAt(i).toString(16)

    return words.join('')
  }

  utf8StrToBytes(utf8Str) {
    const ens = encodeURIComponent(utf8Str)
    const es = unescape(ens)
    const esLen = es.length
    // Convert
    const words = []
    for (let i = 0; i < esLen; i++)
      words[i] = es.charCodeAt(i).toString()

    return words
  }

  stringToByte(str) {
    const bytes = []
    const len = str.length
    for (let i = 0; i < len; i++) {
      const c = str.charCodeAt(i)
      if (c >= 0x010000 && c <= 0x10FFFF) {
        bytes.push(((c >> 18) & 0x07) | 0xF0)
        bytes.push(((c >> 12) & 0x3F) | 0x80)
        bytes.push(((c >> 6) & 0x3F) | 0x80)
        bytes.push((c & 0x3F) | 0x80)
      }
      else if (c >= 0x000800 && c <= 0x00FFFF) {
        bytes.push(((c >> 12) & 0x0F) | 0xE0)
        bytes.push(((c >> 6) & 0x3F) | 0x80)
        bytes.push((c & 0x3F) | 0x80)
      }
      else if (c >= 0x000080 && c <= 0x0007FF) {
        bytes.push(((c >> 6) & 0x1F) | 0xC0)
        bytes.push((c & 0x3F) | 0x80)
      }
      else {
        bytes.push(c & 0xFF)
      }
    }
    return bytes
  }

  hexToUtf8Str(utf8Str) {
    const utf8Byte = this.decode(utf8Str)
    const latin1Chars = []
    for (let i = 0; i < utf8Byte.length; i++)
      latin1Chars.push(String.fromCharCode(utf8Byte[i]))

    return decodeURIComponent(escape(latin1Chars.join('')))
  }

  bytesToUtf8Str(bytesArray) {
    const utf8Byte = bytesArray
    const latin1Chars = []
    for (let i = 0; i < utf8Byte.length; i++)
      latin1Chars.push(String.fromCharCode(utf8Byte[i]))

    return decodeURIComponent(escape(latin1Chars.join('')))
  }

  toCharCodeArray(chs) {
    const chArr = new Array(chs.length)
    for (let i = 0; i < chs.length; i++)
      chArr[i] = chs.charCodeAt(i)

    return chArr
  }
}

export default Hex
