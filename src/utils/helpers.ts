import * as _ from "lodash"
// import UA from "ua-device"

export function isPending(state, key): boolean {
	return _.get(state, '$view.$pending') ? _.get(state, '$view.$pending')[key] : false
}

// export function isIOS() {
// 	return _.get(new UA(navigator.userAgent), 'os.name') === 'iOS'
// }

export function changeTitle(title){
  document.title = title;
  const iframe = document.createElement('iframe');
  iframe.style.cssText = 'display: none; width: 0; height: 0;';
  iframe.src = 'https://static.iqycamp.com/images/logo.png?imageslim';
  //iframe.src = require('./img/text_delete.png');
  const listener = () => {
    setTimeout(() => {
      iframe.removeEventListener('load', listener);
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 0);
    }, 0);
  };
  iframe.addEventListener('load', listener);
  document.body.appendChild(iframe);
}
