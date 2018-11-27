#!/usr/bin/env bash
cp ./transforms/__testfixtures__/all-transforms.input.js /tmp/all-transforms.output.js
./scripts/transform.sh /tmp/all-transforms.output.js
diff /tmp/all-transforms.output.js ./transforms/__testfixtures__/all-transforms.output.js

if [ -z $? ]; then
    echo "All transformation applied"
fi
