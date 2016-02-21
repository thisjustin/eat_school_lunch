#!/bin/bash

# go to project directory
cd /srv/www/eat/eat_school_lunch/esl

# activate python environment
source /srv/www/eat/bin/activate

DEPLOY_ENV="$(honcho run printenv DJANGO_SETTINGS_MODULE)"
while true; do
    read -p "Deploy to ${DEPLOY_ENV}?" yn
    case $yn in
        [Yy]* ) break;;
        [Nn]* ) exit;;
        * ) echo "Yes or No please.";;
    esac
done
echo "deploying ${DEPLOY_ENV}\n"

# pull changes, install dependencies, and build assets
git fetch origin && git reset --hard origin/master
pip install -r ../requirements.txt
npm install
honcho run ESL_ENV=prod && gulp prod

# migrate pending database migrations and collect all static files
honcho run python ./manage.py migrate
honcho run python ./manage.py collectstatic --noinput

# restart gunicorn
echo "Restarting gunicorn"
if pgrep "gunicorn" > /dev/null
then
    # using stop instead of reload
    # because reload starts a new master process
    # but doesn't kill the previous master process
    # causing the two master processes to conflict.
    sudo stop esl-gunicorn
fi
sudo start esl-gunicorn