# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2016-02-07 00:27
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('school_lunch', '0002_auto_20160207_0026'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coreapplication',
            name='no_ssn',
            field=models.BooleanField(default=False),
        ),
    ]
