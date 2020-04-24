#!/bin/bash
yarnversion=0.27.5; if ! yarn --version | grep -q $yarnversion ; then echo 'yarn version is not '$yarnversion; exit 1; fi
