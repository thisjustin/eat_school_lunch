# Eat School Lunch Challenge
Entry by Justin & Emily McCammon

[EatSchoolLunch.com](http://eatschoollunch.com)


## Running the Project for Development
(assumes OSX environment)

1. Install [Homebrew](http://brew.sh/) - we'll use this to easily install some other dependencies

1. Install the latest 2.7.X release of python `brew install python`

1. Install Postgres `brew install postgresql`

	1. Set up a new DB for the project. `createdb -h localhost -p 5432 -U <your mac user> <name of db>`
	2. Note the port, username and DB name (password is empty string by default) as we'll need that later for our `development.py` settings file

1. Install GNU gettext (used in Django's i18n library) `brew install gettext`

	1. Then symlink gettext so django can find it `brew link gettext --force`


1. Clone the repo to your desired location `git clone <path to this repo>`

1. Activate your virualenvironment (or create one per below instructions) `workon eat`

1. From the top level of the project, install the project's dependencies `pip install -r requirements.txt`

1. Install the frontend dependencies `npm install`

1. Build the frontend `gulp` (this kicks off the default build tasks and starts watching your frontend source files)

1. Create a development settings file at `esl/esl/development.py` filling in your DB details as shown below in example.

1. Run the initial Django migrations `python ./esl/manage.py migrate`
1. Create a superuser so you can get into the admin `python ./esl/manage.py createsuperuser`
1. Set your local environment variable so django knows what settings to use `export DJANGO_SETTINGS_MODULE=esl.development`
1. Run the server! `python ./esl/manage.py runserver 0.0.0.0:8000`
1. Visit `localhost:8000` and `localhost:8000/admin/` to view the form and admin, respectively

Example `development.py` file

```
from esl.settings import *

DEBUG = True

SECRET_KEY = 'some_secret'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': '',
        'USER': '',
        'PASSWORD': '',
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}
```




## Deploy The Project
Follow the instructions in `deploy.sh`

Modify as needed for your server setup so you can eventually just run the script.

## Server Setup

These steps were used to setup an instance on AWS running Ubuntu 14.04 - your particular setup may require some modifications depending on your environment.

**Install Packages**

```
sudo apt-get update
sudo apt-get upgrade

sudo apt-get install software-properties-common python-software-properties unzip git python-pip build-essential python-dev nginx

sudo pip install virtualenvwrapper libpq-dev
```

**Setup Virtualenv**

add the following to ~/.bashrc

`export WORKON_HOME=$HOME/.virtualenvs`

`source /usr/local/bin/virtualenvwrapper.sh`

Reload bashrc

`source ~/.bashrc`

**Make Virtualenv**

`mkvirtualenv eat`

`workon eat`

**Install Node.js (for frontend builds)**

Install NVM (node version manager)
Instructions at: [https://github.com/creationix/nvm](https://github.com/creationix/nvm)

After install:

```
source ~/.bashrc
nvm install 4.2.4
nvm use 4.2.4
nvm alias default node
```

**Configure Nginx**

`sudo service nginx start`
(we should now see “Welcome to nginx” message at site URL)

`sudo service nginx stop`
(so we can configure it)
Edit nginx conf files as desired

Your particular details may vary, here's an example of our config file from `/etc/nginx/sites-enabled/` (you'll need to create the upstream server config in your `nginx.conf` file as well as referenced by `proxy_pass http://esl_server;`)

See the [Nginx](http://nginx.org/en/docs/) site for details.

```
server {
        listen 80;
        server_name eatschoollunch.com;

        location / {
                proxy_redirect off;
                proxy_set_header   X-Real-IP            $remote_addr;
                proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
                proxy_set_header   X-Forwarded-Proto $scheme;
                proxy_set_header   Host                   $http_host;
                proxy_set_header   X-NginX-Proxy    true;
                proxy_set_header   Connection "";
                proxy_http_version 1.1;
                proxy_pass         http://esl_server;
        }

        location /static {
                alias /srv/www/eat/eat_school_lunch/esl/static;
        }
}
```

**Configure Gunicorn**

Your particular setup will vary but the config file should be located in `/etc/init/esl-gunicorn.conf`
See the [Gunicorn Site](http://gunicorn.org/) for details

Here's an example
```
description "esl gunicorn"

start on (filesystem)
stop on runlevel [016]

respawn
setuid root
setgid root
chdir /srv/www/eat/eat_school_lunch/esl

exec /srv/www/eat/bin/honcho run /srv/www/eat/bin/gunicorn --bind=127.0.0.1:8000 --access-logfile=/var/log/gunicorn/access.log --error-logfile=/var/log/gunicorn/error.log --log-level=info esl.wsgi:application
```


**Clone git repo to desired location**

`git clone <path to this repo>`

(add SSH keys to your git account as needed: [https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/#platform-linux](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/#platform-linux))

Follow steps in `deploy.sh` to fetch and run code (and adjust to match your local settings)


**Create a .env File**

[Honcho](https://honcho.readthedocs.org/en/latest/) will load environment variables if present in a `.env` file in the directory where honcho is run from. Here's an example with the actual values removed for security.

```
DJANGO_SETTINGS_MODULE=esl.production
DB_HOST=
DB_PASS=
DB_NAME=
DB_USER=
ESL_ENV=prod
SECRET_KEY=
```