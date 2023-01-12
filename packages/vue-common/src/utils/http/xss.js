/**
 * 防xss攻击，特殊字符拦截正则及验证
 **/
// script 标签
export const script1Reg = /<script>(.*?)<\/script>/gi
// 单个的 </script> 标签
export const script2Reg = /<\/script>/gi
// 单个的<script ...> 标签
export const script3Reg = /<script(.*?)>/gi
// javascript: 表达式
export const javascriptReg = /javascript:/
// vbscript: 表达式
export const vbscriptReg = /vbscript:/
// οnlοad= 表达式
export const onloadReg = /onload=(.*?)/
// alert表达式
export const alertReg = /alert(.*?)/
// onError表达式
export const onErrorReg = /onError=(.*?)/
// src形式的表达式
export const src1Reg = /src[\r\n]*=[\r\n]*\\\'(.*?)\\\'/
export const src2Reg = /src[\r\n]*=[\r\n]*\\\'(.*?)\\\"/
// 图片表达式
export const imgReg = /<img(.*?)>/gi

export const script1Test = (val) => {
  return script1Reg.test(val)
}
export const script2Test = (val) => {
  return script2Reg.test(val)
}
export const script3Test = (val) => {
  return script3Reg.test(val)
}
export const javascriptTest = (val) => {
  return javascriptReg.test(val)
}
export const vbscriptTest = (val) => {
  return vbscriptReg.test(val)
}
export const onloadTest = (val) => {
  return onloadReg.test(val)
}
export const alertTest = (val) => {
  return alertReg.test(val)
}
export const onErrorTest = (val) => {
  return onErrorReg.test(val)
}
export const src1Test = (val) => {
  return src1Reg.test(val)
}
export const src2Test = (val) => {
  return src2Reg.test(val)
}
export const imgTest = (val) => {
  return imgReg.test(val)
}
export const xssTest = (val) => {
  return (
    script1Test(val)
    || script2Test(val)
    || script3Test(val)
    || javascriptTest(val)
    || vbscriptTest(val)
    || onloadTest(val)
    || alertTest(val)
    || onErrorTest(val)
    || src1Test(val)
    || src2Test(val)
    || imgTest(val)
  )
}
