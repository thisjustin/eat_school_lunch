from __future__ import unicode_literals

from django.db import models

INCOME_FREQ_CHOICES = (
    ('Weekly', 'weekly'),
    ('Bi-Weekly', 'bi-weekly'),
    ('Twice Monthly', 'twice monthly'),
    ('Monthly', 'monthly')
)

# Create your models here.
class CoreApplication(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    last_modified_date = models.DateTimeField(auto_now=True)
    approved_date = models.DateTimeField()

    assistance_case_number = models.CharField(max_length=255)
    child_income = models.IntegerField()
    child_income_frequency = models.CharField(max_length=15, choices=INCOME_FREQ_CHOICES)
    total_household_members = models.IntegerField()
    ssn_primary_earner = models.IntegerField()
    no_ssn = models.BooleanField()

    street_address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=2)
    zip_code = models.IntegerField()
    phone_number = models.CharField(max_length=12)
    email = models.EmailField()
    adult_name = models.CharField(max_length=255)
    is_signed = models.BooleanField()
    signed_date = models.DateTimeField()


class Child(models.Model):
    application = models.ForeignKey(CoreApplication)
    first_name = models.CharField(max_length=255)
    middle_initial = models.CharField(max_length=1)
    last_name = models.CharField(max_length=255)
    is_student = models.BooleanField()
    is_foster = models.BooleanField()
    is_homeless_migrant_runaway = models.BooleanField()


class Adult(models.Model):
    application = models.ForeignKey(CoreApplication)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    work_income = models.IntegerField()
    work_income_frequency = models.CharField(max_length=15, choices=INCOME_FREQ_CHOICES)
    public_income = models.IntegerField()
    public_income_frequency = models.CharField(max_length=15, choices=INCOME_FREQ_CHOICES)
    other_income = models.IntegerField()
    other_income_frequency = models.CharField(max_length=15, choices=INCOME_FREQ_CHOICES)

