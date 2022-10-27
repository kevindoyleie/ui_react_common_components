set HTTP_PROXY=http://127.0.0.1:3128
set HTTPS_PROXY=%HTTP_PROXY%

set TMP_DIR=%CD%\tmp
set ZIP_FILE="%TMP_DIR%\tokens-style-dictionary.zip"

set TOKENS_URL=https://vhi.invisionapp.com/dsm-export/vhi-healthcare/jellyfish/tokens-style-dictionary.zip?snapshotId=628deb0ab3506b73abe15929
set API_KEY=40e713e66d45c5ab901bfa752dcf66d0

REM Create temporary dir and cd to it.
md %TMP_DIR%

REM Download and unzip property files.
curl -H "X-API-KEY: %API_KEY%" %TOKENS_URL% --output %ZIP_FILE%

7z x -o%TMP_DIR% %ZIP_FILE%

REM Create styles.
npx style-dictionary build --config config.json

REM Clean up temporary dir.
rmdir /s /q %TMP_DIR%

