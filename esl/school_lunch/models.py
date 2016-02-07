from __future__ import unicode_literals

from django.db import models

INCOME_FREQ_CHOICES = (
    ('weekly', 'weekly'),
    ('biweekly', 'biweekly'),
    ('twice-monthly', 'twice-monthly'),
    ('monthly', 'monthly')
)

ASSISTANCE_CHOICES = (
    ('SNAP', 'SNAP'),
    ('FDPIR', 'FDPIR'),
    ('TANF', 'TANF')
)


class CoreApplication(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    last_modified_date = models.DateTimeField(auto_now=True)
    approved_date = models.DateTimeField(null=True, blank=True)

    assistance_type = models.CharField(max_length=10, choices=ASSISTANCE_CHOICES, null=True)
    assistance_case_number = models.CharField(max_length=255, null=True, blank=True)
    child_income = models.IntegerField()
    child_income_frequency = models.CharField(max_length=15, choices=INCOME_FREQ_CHOICES)
    # total_household_members = models.IntegerField()
    ssn_signer = models.IntegerField(null=True, blank=True)
    no_ssn = models.BooleanField(default=False)

    children_are_hispanic = models.BooleanField(default=False)
    children_not_hispanic = models.BooleanField(default=False)
    children_are_american_indian = models.BooleanField(default=False)
    children_are_asian = models.BooleanField(default=False)
    children_are_black = models.BooleanField(default=False)
    children_are_pacific_islander = models.BooleanField(default=False)
    children_are_white = models.BooleanField(default=False)

    street_address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=2)
    zip_code = models.IntegerField()
    phone_number = models.CharField(max_length=12)
    email = models.EmailField()
    adult_name = models.CharField(max_length=255)
    is_signed = models.BooleanField()
    signed_date = models.DateTimeField()

    class Meta:
        ordering = ('created_date',)

    def save(self, *args, **kwargs):
        super(CoreApplication, self).save(*args, **kwargs)


class Child(models.Model):
    application = models.ForeignKey(CoreApplication, related_name='children')
    first_name = models.CharField(max_length=255)
    middle_initial = models.CharField(max_length=1)
    last_name = models.CharField(max_length=255)
    is_student = models.BooleanField()
    is_foster = models.BooleanField()
    is_homeless_migrant_runaway = models.BooleanField()


class Adult(models.Model):
    application = models.ForeignKey(CoreApplication, related_name='adults')
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    work_income = models.IntegerField()
    work_income_frequency = models.CharField(max_length=15, choices=INCOME_FREQ_CHOICES)
    public_income = models.IntegerField()
    public_income_frequency = models.CharField(max_length=15, choices=INCOME_FREQ_CHOICES)
    other_income = models.IntegerField()
    other_income_frequency = models.CharField(max_length=15, choices=INCOME_FREQ_CHOICES)
    is_signer = models.BooleanField(default=False)

