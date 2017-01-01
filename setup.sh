#! /usr/bin/env sh
# One script for command line and Travis use

## NOTE: Assumes you've already set up and activated at python (3.6) virtualenv

echo "====== Installing Pip requirements ======"

pip install -r requirements.txt

echo "====== Installing Pelican from Source ======"
cd src/pelican
python setup.py install
cd ../../
