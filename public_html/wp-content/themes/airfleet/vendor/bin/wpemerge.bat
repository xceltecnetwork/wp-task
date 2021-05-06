@ECHO OFF
setlocal DISABLEDELAYEDEXPANSION
SET BIN_TARGET=%~dp0/../htmlburger/wpemerge-cli/bin/wpemerge
php "%BIN_TARGET%" %*
