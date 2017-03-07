#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'MakeItZone'
SITENAME = 'MakeItZone'
SITEURL = ''

PATH = 'content'

TIMEZONE = 'America/Vancouver'

DEFAULT_LANG = 'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

#READERS = {'panDoc': None}


# tuples of ('slug', 'font-awesome-icon') in order of appearance
NAVBARPAGES = ( 
                ('classes', 'graduation-cap'),
                ('tools', 'wrench'),
                ('services', 'cogs'),
                ('membership', 'user'),                    
                ('contact', 'phone'),
              )
NAVBARMENUPAGES = (
                    ('schedule', 'calendar'),
                    ('about', 'info-circle'),
                    ('vision', 'eye'),
                    ('feedback', 'comment'),
                  )

# SIDEBARPAGES = NAVBARPAGES
# SIDEBARMENUPAGES = NAVBARMENUPAGES

LINKS = ( 
          ('Our Forums', 'https://forum.makeit.zone', 'comment-o'),
          ('Our Slack', 'https://makeitzone.slack.com', 'slack'),
          ('patreon', 'https://www.patreon.com/MakeItZone', 'thumbs-o-up'),
          ('linkedin', 'https://www.linkedin.com/in/julianrendell'),
          ("3DHubs", 'https://www.3dhubs.com/service/makeitzone', 'print'),
          ("adafruit", "http://adafruit.com", "asterisk"),
          ("sparkfun", "https://www.sparkfun.com", "fire"),
          ("MadeInYQQ", "http://madeinyqq.ca", "wrench"),
        )

# Social widget
# SOCIAL = (('twitter', 'http://twitter.com/_makeitzone_'),
#           ('linkedin', 'http://www.linkedin.com/in/danieldebie'),)

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True

# ------ User added ------

MARKUP = ('md', 'ipynb')

PLUGIN_PATHS = ["plugins", "src/pelican-plugins"]
PLUGINS = ["related_posts", 
           "series", 
           "assets", 
##           "liquid_tags", 
           "sitemap",
           "tag_cloud", 
           "tipue_search", 
           "bootstrapify",
           "extract_toc",
           "figure-ref", 
           "gallery", 
           "image_process",
#           "optimize_images", 
#           "pdf-img",
#           "pdf", # incompatible with python 3
#           "pelican_vimeo", 
           "pelican_javascript",
#           "pelicanfly", 
           "photos", 
           #"render_math", 
           "sub_parts", 
           "thumbnailer",
           "i18n_subsites", # needed for i18n of Bootstrap3 theme
           "ace_editor",
           "plantuml",
           'pelican-ipynb.markup',
           'liquid_tags.img', 'liquid_tags.video',
           'liquid_tags.youtube', 'liquid_tags.vimeo',
           'liquid_tags.include_code',
           'pelican_git',

]

ACE_EDITOR_PLUGIN = {
  'ACE_EDITOR_THEME': 'monokai',
  'ACE_EDITOR_READONLY': False,

}

# See the docs! You've got to manually add the default extensions if you set this


MARKDOWN = {
    'extension_configs': {
        'markdown.extensions.codehilite': {'css_class': 'highlight',
                                           'linenums': False,
                                           'use_pygments': False},
        'markdown.extensions.extra': {},
        'markdown.extensions.meta': {},
        'markdown.extensions.toc' : {}, 
        'plantuml.plantuml_md': {'classes': 'center-block'},
    },
    'output_format': 'html5',
}

SITEMAP = {'format':'xml'}

TYPOGRIFY = True
INDEX_SAVE_AS = 'blog_index.html'

THEME = 'src/pelican-themes/pelican-bootstrap3'
JINJA_ENVIRONMENT = { 'extensions': ['jinja2.ext.i18n']}
BOOTSTRAP_THEME = 'readable'
SITELOGO = 'images/Sam head.png'
SITELOGO_SIZE = 48
HIDE_SITENAME = False
ARCHIVES_URL = 'blog_index.html'
RESPONSIVE_IMAGES = True

# Puts it on the blog index only, or all pages; not a specific page(s)
# And I've created a static page as index.html; the generated index now goes to "blog_index.html"
# BANNER='images/Burst Logo.png'
# BANNER_ALL_PAGES = False

# TO DO - CREATE FAVICON!!!
# FAVICON = "images/favicon.png"


# tell pelican where your custom.css file is in your content folder
STATIC_PATHS = ['images', 'turtleblocksjs', 'extras/custom.css', 'extras/CNAME']

# tell pelican where it should copy that file to in your output folder
EXTRA_PATH_METADATA = {
'extras/custom.css': {'path': 'static/custom.css'},
'extras/CNAME': {'path': 'CNAME'}
}

# tell the pelican-bootstrap-3 theme where to find the custom.css file in your output folder
CUSTOM_CSS = 'static/custom.css'


DISPLAY_PAGES_ON_MENU = False
DISPLAY_CATEGORIES_ON_MENU = False

DISPLAY_SERIES_ON_SIDEBAR = True
SHOW_SERIES = True

# The underlying pdf libs aren't python 3 compatible.
# PDF_PROCESSOR = True

#LINKS = True
SHOW_ARTICLE_AUTHOR = True
SHOW_ARTICLE_CATEGORY = True
SHOW_DATE_MODIFIED = True
BOOTSTRAP_FLUID = True
DISPLAY_BREADCRUMBS = True
DISPLAY_CATEGORY_IN_BREADCRUMBS = True
BOOTSTRAP_NAVBAR_INVERSE = False
DISPLAY_ARTICLE_INFO_ON_INDEX = True
DISPLAY_TAGS_ON_SIDEBAR = False
DISPLAY_TAGS_INLINE = True
TAGS_URL = "tags.html"
DISPLAY_CATEGORIES_ON_SIDEBAR = False
CATEGORIES_URL = "categories.html"
DISPLAY_RECENT_POSTS_ON_SIDEBAR = True
RECENT_POST_COUNT = 5
TWITTER_CARDS = True
USE_OPEN_GRAPH = True
TWITTER_USERNAME = "_MakeItZone_"
# TWITTER_WIDGET_ID = 698784884727283712
ADDTHIS_PROFILE = "ra-56f06bf667497568"
SHARIFF = False
CC_LICENSE = "CC-BY-NC-SA"
DIRECT_TEMPLATES = ('index', 'categories', 'tags', 'authors', 'archives', 'search')
PAGINATED_DIRECT_TEMPLATES = ['index']

# Note - actual Facebook page URL is hardcoded in 'facebook_iframe.html'
# Would be nice to have it here...
FACEBOOK_PAGE = True
GOOGLE_ANALYTICS_UNIVERSAL = "UA-75488656-1"
YOUTUBE_CHANNEL = "http://www.youtube.com/embed/videoseries?list=UU02mFeDpicLQRXi12_cMexA&rel=0"
SMOOCH_TOKEN = '6fjv1bklfefnwedeooh1wx91k'
USERREPORT_TOKEN = 'fc6fed16-1f42-4935-ba53-e8aa8a138e1f'
SCROLLMAGIC = True

