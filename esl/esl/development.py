from esl.settings import *

DEBUG = True

SECRET_KEY = 'some_secret'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'esldb',
        'USER': 'justin',
        'PASSWORD': '',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}