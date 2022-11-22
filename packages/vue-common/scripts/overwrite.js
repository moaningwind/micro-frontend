const fs = require('fs')

function overwriteFile(form, to) {
  const data = fs.readFileSync(form).toString()
  fs.writeFileSync(to, data)
  console.log(`${to} file was overwritten successfully`)
}

/**
 * echarts parseGeoJson.js 文件覆盖
 */
overwriteFile('patch_node_modules/echarts/parseGeoJson.js', 'node_modules/echarts/lib/coord/geo/parseGeoJson.js')
