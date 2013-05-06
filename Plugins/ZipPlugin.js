/**
 * ZipPlugin.js
 *
 * Based on Phonegap Extract Zip File plugin
 * @see https://github.com/phonegap/phonegap-plugins/tree/master/iOS/ExtractZipFile
 *
 */

var ExtractZipFilePlugin = {
    extractFile: function (file, destination, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "ExtractZipFilePlugin", "extract", [file, destination]);
    }
}