#!/usr/bin/env bash

set -e

rm -rf ./node_modules/

cd ../metaport/
yarn run build
cd ../metaport-integration-demo
yarn install
yarn start
