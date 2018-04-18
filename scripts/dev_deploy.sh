#!/bin/bash

# This script runs from CircleCI's deployment

set -x

pwd
date=`date +%Y%m%d`
datestamp=`date +%Y%m%d%H%M`

# remove folders we don't need and zip it up for transfer
yarn clean && rm -rf node_modules
cd ../
tar -czf RepairClinic_web.0.1.1-$datestamp.tar -C project .
cp RepairClinic_web.0.1.1-$datestamp.tar /tmp/artifact/RepairClinic_web.0.1.1-$datestamp.tar
curl -X POST http://octopusfp.repairclinic.com:8815/api/packages/raw -H "X-Octopus-ApiKey: $OCTOPUS_API_KEY" -F "data=@RepairClinic_web.0.1.1-$datestamp.tar"
