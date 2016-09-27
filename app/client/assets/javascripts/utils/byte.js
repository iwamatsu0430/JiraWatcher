class ByteUtils {

  toBase64(byteArray) {
    const str = String.fromCharCode.apply(null, byteArray)
    return btoa(str).replace(/.{76}(?=.)/g,'$&\n')
  }
}

module.exports = new ByteUtils()
