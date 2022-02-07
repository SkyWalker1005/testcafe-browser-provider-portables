import path from 'path';
import browserTools from 'testcafe-browser-tools';

function _findMatch (string, re) {
    const match = string.match(re);

    return match ? match[1].trim() : '';
}

export default {
    // Multiple browsers support
    isMultiBrowser: true,


    // Required - must be implemented
    // Browser control
    async openBrowser (id, pageUrl, browserName) {
        var browserInfo = {};

        const browser = _findMatch(browserName, /([^@:]+)/);
        const version = _findMatch(browserName, /@([^:]+)/);

        switch (browserName) {
            case 'firefox':
                browserInfo.path = path.join(process.env.PORTABLE_BROWSERS_PATH, 'Mozilla Firefox/firefox.exe');
                browserInfo.cmd  = '-new-window';
                break;
            case 'chrome':
                browserInfo.path = path.join(process.env.PORTABLE_BROWSERS_PATH, 'Google/Chrome/Application/chrome.exe');
                browserInfo.cmd  = '--new-window';
                break;
            case browser + '@' + version:
                switch(browser) {
                    case 'chrome':
                        browserInfo.path = path.join(process.env.COMMON_RESOURCES_PATH, '/ChromeVersions/Chrome'+version+'/chrome.exe');
                        browserInfo.cmd  = '--new-window';
                        break;
                    case 'firefox':
                        browserInfo.path = path.join(process.env.COMMON_RESOURCES_PATH, '/MozillaVersions/Mozilla Firefox'+version+'/firefox.exe');
                        browserInfo.cmd  = '-new-window';
                        break;
                }
            default:
                throw new Error('Unsupported browser!');
        }

        await browserTools.open(browserInfo, pageUrl);

        await this.waitForConnectionReady(id);
    },

    async closeBrowser (id) {
        await browserTools.close(id);
    },

    
    // Browser names handling
    async getBrowserList () {
        return ['firefox', 'chrome'];
    },

    async isValidBrowserName (browserName) {
        var browserList = await this.getBrowserList();

        return browserList.indexOf(browserName) > -1;
    },
    

    // Extra methods
    async maximizeWindow (id) {
        await browserTools.maximize(id);
    },

    async takeScreenshot (/* id, screenshotPath, pageWidth, pageHeight */) {
        this.reportWarning('The screenshot functionality is not supported by the "portables" browser provider.');
    }
};
