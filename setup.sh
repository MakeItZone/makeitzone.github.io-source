#! /usr/bin/env sh
# One script for command line and Travis use

## NOTE: Assumes you've already set up and activated at python (3.6) virtualenv
pip install -v -r requirements.txt
cd src/pelican
python setup.py -v install
cd ../../
