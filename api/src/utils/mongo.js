function escapeSpecialChar(string = '') {
  return string.toLowerCase()
    .replace(/a|á|à|ã|â/g, '[a,á,à,ã,â]')
    .replace(/e|é|è/g, '[e,é,è]')
    .replace(/i|í|ì/g, '[i,í,ì]')
    .replace(/o|ó|ò|õ|ô/g, '[o,ó,ò,õ,ô]')
    .replace(/u|ú|ù/g, '[u,ú,ù]')
    .replace(/c|ç/g, '[c,ç]')
}

module.exports = { escapeSpecialChar }