
function loadGoogleAnalytics() {
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'G-HM1ESVJ0D1', 'auto'); // G tag
  ga('send', 'pageview');
}

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

function acceptCookies() {
  setCookie('gdpr_consent', 'true', 365);
  loadGoogleAnalytics();
  document.getElementById('cookieConsentBanner').remove();
  console.log('acceptCookies')
}

function denyCookies() {
  setCookie('gdpr_consent', 'false', 365);
  document.getElementById('cookieConsentBanner').remove();
  console.log('denyCookies')
}

function injectConsentForm() {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
      if (this.status === 200) {
          document.body.insertAdjacentHTML('beforeend', this.responseText);
          document.getElementById('cookieConsentBanner').style.display = 'block';
          document.getElementById('acceptCookies').addEventListener('click', acceptCookies);
          document.getElementById('denyCookies').addEventListener('click', denyCookies);
      }
  };
  xhr.open('GET', 'technical/consent-form.html', true); // pass to concent form
  xhr.send();
}

window.onload = function() {
  var consent = getCookie('gdpr_consent');
  if (consent === 'true') {
      loadGoogleAnalytics();
  } else if (consent === null) {
      injectConsentForm();
  }
};
