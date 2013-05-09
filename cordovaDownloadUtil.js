/**
 * cordovaDownloadUtils
 *
 * Cordova helper to download and eventually unzip external files
 *
 * Usage:
 * cordovaDownloadUtil.url = "http://example.com/archive.zip";
 * cordovaDownloadUtil.unzip = true; //if true unzip and remove the downloaded file.
 * cordovaDownloadUtil.progressBar = object with a setValue method to handle progress bar
 * cordovaDownloadUtil.extractCallback = function(obj){
 *    //perform action after unzip with success (optional)
 * }
 * cordovaDownloadUtil.download()
 *
 *
 * author Luca Corbo (@lucacorbo)
 *
 * Thanks to:
 * - https://github.com/phonegap/phonegap-plugins/blob/master/iOS/ExtractZipFile/README.md
 * - http://docs.phonegap.com/en/2.7.0/cordova_file_file.md.html
 * - http://stackoverflow.com/a/9940951
 *
 */

var cordovaDownloadUtil = {
    url: '',
    unzip: false,
    extractCallback: false,
    progressBar: false,
    download: function () {
        window.requestFileSystem(
            LocalFileSystem.PERSISTENT, 0,
            function (fileSystem) {
                fileSystem.root.getFile(
                    ".tmp", {create: true, exclusive: false},
                    function (fileEntry) {
                        var rootPath = fileEntry.fullPath.replace(".tmp","");
                        fileEntry.remove();
                        var url = cordovaDownloadUtil.url;
                        var fileName = url.split('/').pop();
                        var fileTransfer = new FileTransfer();
                        fileTransfer.onprogress = function(progressEvent) {
                             if (typeof cordovaDownloadUtil.progressBar == "object") {
                                var val = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                                cordovaDownloadUtil.progressBar.setValue(val);
                             }
                        }
                        fileTransfer.download(
                            url,
                            rootPath + fileName,
                            function(entry) {
                                console.log("Download complete: " + entry.fullPath);
                                if (cordovaDownloadUtil.unzip) cordovaDownloadUtil.extract(entry, rootPath);
                            },
                            cordovaDownloadUtil.error
                        );
                    },
                    cordovaDownloadUtil.error
                );
            },
            cordovaDownloadUtil.error
        );
    },
    extract: function(entry, dest) {
        var src = entry.fullPath;

        var successCallback = function(success){
            console.log('%s extracted with success in %s', src, dest)
            if (typeof cordovaDownloadUtil.extractCallback === 'function') {
                cordovaDownloadUtil.extractCallback(this);
                entry.remove();
            }
        }

        ExtractZipFilePlugin.extractFile(
            src,
            dest,
            successCallback,
            cordovaDownloadUtil.error
        );
    },
    error: function (error) {
        console.log(JSON.stringify(error));
    }
}


