export function is_neizhi() {
  const ua = navigator.userAgent.toLowerCase();
  const isQQ = /qq/i.test(ua)
  const isWeixin = /MicroMessenger/i.test(ua)
  const alipay = /Alipay/i.test(ua)
  if (isQQ || isWeixin || alipay) return true
  else return
  // if (ua.match(/MicroMessenger/i) == "micromessenger") {
  //   return "weixin";
  // } else if (ua.match(/QQ/i) == "qq") {
  //   return "QQ";
  // } else if (ua.match(/Alipay/i) == "alipay" && payway == 2) {
  //   return "alipay";
  // }
  // return false;
}