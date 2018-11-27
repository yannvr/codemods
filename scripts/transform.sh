

#!/usr/bin/env bash
# Run all transform on a given file and fix it with ESLINT  to match your conventions
FILE=$1
ESLINT_CONFIG=$2
HAS_ESLINT=0
HAS_JSCODESHIT=0
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
TRANSFORM_DIR="${DIR}/../transforms"

if [ -z ${FILE} ]; then
    echo "error: enter filename to transform"
    exit 1
fi

## Make sure jscodeshift and eslint are installed globally
#for transform in `ls ${TRANSFORM_DIR}/*.js`; do
#    echo ${transform}
#    jscodeshift -t ${transform} ${FILE}
#
#    if [ $? -ne 0 ]; then
#        exit 1
#    fi
#done

# All the flavours of destructure-functions
#jscodeshift -t ./transforms/destructure-functions.js --decl=1 ${FILE}
#jscodeshift -t ./transforms/destructure-functions.js --decl=1 --state=1 ${FILE}
#jscodeshift -t ./transforms/destructure-functions.js --arrow=1 --state=1 ${FILE}
#jscodeshift -t ./transforms/destructure-functions.js --arrow=1 --state=0 ${FILE}

type eslint > /dev/null
if [ $? -eq 0 ]; then
    if [ ! -z ${ESLINT_CONFIG} ]; then
            eslint -c ${ESLINT_CONFIG} --fix ${FILE}
        else
            eslint --fix ${FILE}
    fi
fi


exit 0
