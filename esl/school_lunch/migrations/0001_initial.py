# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2015-12-20 00:28
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Adult',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=255)),
                ('last_name', models.CharField(max_length=255)),
                ('work_income', models.IntegerField()),
                ('work_income_frequency', models.CharField(choices=[('Weekly', 'weekly'), ('Bi-Weekly', 'bi-weekly'), ('Twice Monthly', 'twice monthly'), ('Monthly', 'monthly')], max_length=15)),
                ('public_income', models.IntegerField()),
                ('public_income_frequency', models.CharField(choices=[('Weekly', 'weekly'), ('Bi-Weekly', 'bi-weekly'), ('Twice Monthly', 'twice monthly'), ('Monthly', 'monthly')], max_length=15)),
                ('other_income', models.IntegerField()),
                ('other_income_frequency', models.CharField(choices=[('Weekly', 'weekly'), ('Bi-Weekly', 'bi-weekly'), ('Twice Monthly', 'twice monthly'), ('Monthly', 'monthly')], max_length=15)),
            ],
        ),
        migrations.CreateModel(
            name='Child',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=255)),
                ('middle_initial', models.CharField(max_length=1)),
                ('last_name', models.CharField(max_length=255)),
                ('is_student', models.BooleanField()),
                ('is_foster', models.BooleanField()),
                ('is_homeless_migrant_runaway', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='CoreApplication',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('last_modified_date', models.DateTimeField(auto_now=True)),
                ('approved_date', models.DateTimeField()),
                ('assistance_case_number', models.CharField(max_length=255)),
                ('child_income', models.IntegerField()),
                ('child_income_frequency', models.CharField(choices=[('Weekly', 'weekly'), ('Bi-Weekly', 'bi-weekly'), ('Twice Monthly', 'twice monthly'), ('Monthly', 'monthly')], max_length=15)),
                ('total_household_members', models.IntegerField()),
                ('ssn_primary_earner', models.IntegerField()),
                ('no_ssn', models.BooleanField()),
                ('street_address', models.CharField(max_length=255)),
                ('city', models.CharField(max_length=255)),
                ('state', models.CharField(max_length=2)),
                ('zip_code', models.IntegerField()),
                ('phone_number', models.CharField(max_length=12)),
                ('email', models.EmailField(max_length=254)),
                ('adult_name', models.CharField(max_length=255)),
                ('is_signed', models.BooleanField()),
                ('signed_date', models.DateTimeField()),
            ],
        ),
        migrations.AddField(
            model_name='child',
            name='application',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='school_lunch.CoreApplication'),
        ),
        migrations.AddField(
            model_name='adult',
            name='application',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='school_lunch.CoreApplication'),
        ),
    ]
