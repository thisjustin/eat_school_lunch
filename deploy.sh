#!/bin/bash

# go to project directory
cd /home/ubuntu/www/eat/eat_school_lunch/esl

# activate python environment
source /home/ubuntu/.virtualenvs/esl/bin/activate

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
honcho run ./manage.py migrate
honcho run ./manage.py collectstatic --noinput

# restart gunicorn
echo "Restarting gunicorn"
if pgrep "gunicorn" > /dev/null
then
    # using stop instead of reload
    # because reload starts a new master process
    # but doesn't kill the previous master process
    # causing the two master processes to conflict.
    stop esl-gunicorn
fi
start esl-gunicorn