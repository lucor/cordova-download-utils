cordova-download-utils
======================

Cordova helper to download and eventually unzip external files


Setup
-----

- Configure the ExtractZipFilePlugin phonegap plugin as usual
- Copy cordovaDownloadUtil.js in www and link in index.html

Usage
-----
    cordovaDownloadUtil.url = "http://example.com/archive.zip";
    cordovaDownloadUtil.unzip = true; //if true unzip and remove the downloaded file.
    cordovaDownloadUtil.extractCallback = function(obj){
        //perform action after unzip with success (optional)
    }
    cordovaDownloadUtil.download()

Tested with cordova 2.7.0

License
-------
Apache License, Version 2.0.
