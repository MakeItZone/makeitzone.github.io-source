Title:	Creating Pelican Extensions
date:	17/1/2017
tags:	web
Series:	Website Dev

Quick notes for future projects...

## Pelican Plugins Repo ##
[Pelican Plugins](https://github.com/getpelican/pelican-plugins) is a little bit of a mess. Some of the plugins are setup/expected to be installed via `pip`. This is contrary to the suggestion to `git clone` the repo and change the `PYTHON PATH`. 

If you're using the plugins from source and see a `setup.py` in a plugin you want to use, you will probably have to:

- copy the source code tree from it's sub-directory to the top level directory for that plugin
- tweak the imports, e.g. adding `.` before `from`/`import` to look in the current directory
- tweak (or remove) `setup.py` and it's helper files

## Extending Pelican ##

Look at other plugins; the [documentation](http://docs.getpelican.com/en/3.7.1/plugins.html) is pretty sparse.

Hooking onto `article_generator_finalized` will give you the final content after going through any of the markup processors.

### Markdown Extensions ###

Not sure what the correct way is for Pelican extension to register a Markdown extension.

`BlockProcessors` are managed in an ordered dictionary.

Default `BlockProcessors` are here: <https://github.com/waylan/Python-Markdown/blob/master/markdown/blockprocessors.py>

It looks something like:

```python
    parser.blockprocessors['empty'] = EmptyBlockProcessor(parser)
    parser.blockprocessors['indent'] = ListIndentProcessor(parser)
    parser.blockprocessors['code'] = CodeBlockProcessor(parser)
    parser.blockprocessors['hashheader'] = HashHeaderProcessor(parser)
    parser.blockprocessors['setextheader'] = SetextHeaderProcessor(parser)
    parser.blockprocessors['hr'] = HRProcessor(parser)
    parser.blockprocessors['olist'] = OListProcessor(parser)
    parser.blockprocessors['ulist'] = UListProcessor(parser)
    parser.blockprocessors['quote'] = BlockQuoteProcessor(parser)
    parser.blockprocessors['paragraph'] = ParagraphProcessor(parser)
```

A Markdown extension will often have a line like:
```python
md.parser.blockprocessors.add('name', blockprocessor, 'location')
```

`name` is the key in the ordered dictionary.

`location` determines where it's inserted in the order of `BlockProcessors`.

Question: does the entire document get feed through each of the `BlockProcessors`?

i.e. can an earlier `BlockProcessor` generate MarkDown that will be expanded by latter `BlockProcessors`?

 