#!/usr/bin/env bash
# Run all transform on a given file and fix it with ESLINT  to match your conventions
FILE=$1
HAS_ESLINT=0
HAS_JSCODESHIT=0
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
TRANSFORM_DIR="${DIR}/../transforms"

# Usage from https://gist.github.com/jehiah/855086#file-simple_args_parsing-sh-L26
function usage()
{
    echo "Fix your JS"
    echo ""
    echo "fix [file]"
    echo "\t-h --help"
    echo "\t--eslint: apply your eslint after transform. Default for single file."
    echo "\t--staged: apply all transformations to staged files."
    echo "\t--db-path=$DB_PATH"
    echo ""
}

while [ "$1" != "" ]; do
    PARAM=`echo $1 | awk -F= '{print $1}'`
    VALUE=`echo $1 | awk -F= '{print $2}'`
    case $PARAM in
        -h | --help)
            usage
            exit
            ;;
        --safe)
            SAFE=1
            ;;
        --no-eslint)
            NO_ESLINT=1
            ;;
    esac
    shift
done

if [ "$1" ==  "test" ]; then
        TRANSFORM_DIR="./transforms"
    else
        TRANSFORM_DIR="./node_modules/jscodemods/transforms"
fi

echo "Transforming ${FILE}..."

# Only transformations suitable for React are applied here. Other transformations
# can be destructive for React/JSX files

jscodeshift -t ${TRANSFORM_DIR}/remove-debugger.js ${FILE}
jscodeshift -t ${TRANSFORM_DIR}/remove-logs.js ${FILE}

if [ -z "${SAFE}" ]; then
    echo "ALL TRANSFORMS"
    # basic transformations
    jscodeshift -t ${TRANSFORM_DIR}/destructure-components.js ${FILE}
    # All the flavours of destructure-functions
    jscodeshift -t ${TRANSFORM_DIR}/destructure-functions.js ${FILE}
    jscodeshift -t ${TRANSFORM_DIR}/destructure-functions.js --arrow=1 --state=1 ${FILE}
    jscodeshift -t ${TRANSFORM_DIR}/destructure-functions.js --arrow=1 --state=0 ${FILE}
    jscodeshift -t ${TRANSFORM_DIR}/destructure-functions.js --state=1 ${FILE}
fi



echo "Transformations applied to ${FILE}"

type eslint > /dev/null
if [ "${NO_ESLINT}" != "1" ]; then
    echo "ESLinting..."
    npx eslint --fix ${FILE}
fi

exit 0
