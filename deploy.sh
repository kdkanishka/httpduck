#!/bin/bash

#prepare deployment
mkdir httpduck
cp app.js package.json httpduck/
cp -r config helpers models public routes views httpduck/

#Upload
scp -r httpduck/ kanishkapagero@ssh-kanishkapagero.alwaysdata.net:

#cleanup
rm -rf httpduck
