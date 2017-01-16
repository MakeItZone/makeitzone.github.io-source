Title: Website Dev Environment Setup
date: 1/1/2017
tags: web, business
Series: Website Dev

[TOC]

## Setting up a local Website Dev Environment

```
git clone https://github.com/MakeItZone/makeitzone.github.io-source.git
cd makeitzone.github.io-source.git
git submodule update --init --recursive
virtualenv -p python3.6 .
source bin/activate
./setup.sh

```

You should now be able locally edit and preview.
