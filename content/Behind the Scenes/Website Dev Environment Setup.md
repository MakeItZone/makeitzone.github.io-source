Title: Website Dev Environment Setup
date: 1/1/2017
tags: web, business
Series: Website Dev

## Setting up a local Website Dev Environment

```bash
git clone https://github.com/MakeItZone/makeitzone.github.io-source.git
cd makeitzone.github.io-source.git
git submodule update --init --recursive
virtualenv -p python3.6 .
source bin/activate
./setup.sh

```

You should now be able locally edit and preview.

First, activate the `virtualenv`: 

```
cd makeitzone.github.io-source
. bin/activate.sh
```

Now run `make`. It will output a bunch of helpful targets. E.g. `make devserver`.

