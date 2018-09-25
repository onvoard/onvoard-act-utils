//=========================================
// Common functions
//=========================================
const cleanText = (text) => {
  if (!text) return "";

  // remove excess whitespace and tabs (excluding line breaks)
  text = text.replace(/[ \t\f\v]+/g, " ");

  // replace 3 or more line breaks with 2 line breaks
  text = text.replace(/\n{3,}/g, '\n\n');

  // trim
  return text.trim();
}

const replaceLineBreak = (content, substr="\n") => {
  const newLineRegex = /<br\s*[\/]?>/gi;
  return content.replace(newLineRegex, substr);
}

const rmNonDigit = function(text) {
  return text.replace(/\D/g,'');
};

const stringContains = function(string, subString) {
  return string.indexOf(subString) !== -1;
}

const inArray = function(item, arrayList) {
  if (arrayList.indexOf(item) > -1) return true;
  return false;
}


//=========================================
// Window functions
//=========================================
const currentUrl = function() {
  return window.location.href;
}

const currentUrlWithoutParams = function() {
  return window.location.protocol + '//' + window.location.host + window.location.pathname;
}

const currentDomain = function() {
  return window.location.hostname;
}


//=========================================
// Node functions
//=========================================
const setupLogging = (page) => {
  page.on('console', (consoleMessageObject) => {
    if (consoleMessageObject._type === 'warning') return;
    console.log(consoleMessageObject._text);
  });
};

// Store screen from puppeteer page to Apify key-value store
const saveScreen = async (apifyInstance, page, key='debug-screen') => {
    const screenshotBuffer = await page.screenshot({ fullPage: true });
    await apifyInstance.setValue(key, screenshotBuffer, { contentType: 'image/png' });
};


//=========================================
// Exports
//=========================================
if (typeof window !== 'undefined') {
  window.cleanText = cleanText;
  window.replaceLineBreak = replaceLineBreak;
  window.rmNonDigit = rmNonDigit;
  window.stringContains = stringContains;
  window.inArray = inArray;

  window.currentUrl = currentUrl;
  window.currentUrlWithoutParams = currentUrlWithoutParams;
  window.currentDomain = currentDomain;
};

if (typeof module !== 'undefined') {
  module.exports = {};
  module.exports.cleanText = cleanText;
  module.exports.replaceLineBreak = replaceLineBreak;
  module.exports.rmNonDigit = rmNonDigit;
  module.exports.stringContains = stringContains;
  module.exports.inArray = inArray;

  module.exports.setupLogging = setupLogging;
  module.exports.saveScreen = saveScreen;
};



