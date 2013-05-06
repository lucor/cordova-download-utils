var cordovaDownloadUtil = {
    url: '',
    unzip: false,
    extractCallback: false,

    download: function () {
        window.requestFileSystem(
            LocalFileSystem.PERSISTENT, 0,
            function (fileSystem) {
                fileSystem.root.getFile(
                    ".tmp", {create: true, exclusive: false},
                    function (fileEntry) {
                        var rootPath = fileEntry.fullPath.replace(".tmp","");
                        var url = cordovaDownloadUtil.url;
                        var fileName = url.split('/').pop();
                        var fileTransfer = new FileTransfer();
                        fileEntry.remove();
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


