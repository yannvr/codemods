#!/usr/bin/env bash
# Run all transform on a given file and fix it with ESLINT  to match your conventions
FILE=$1
HAS_ESLINT=0
HAS_JSCODESHIT=0
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
TRANSFORM_DIR="${DIR}/../transforms"

for file in `git diff --name-only --ext-diff HEAD | grep '.js$'`; do
    fix ${file}
done

exit 0
