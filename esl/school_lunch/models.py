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
    child_income = models.IntegerField(null=True, blank=True)
    child_income_frequency = models.CharField(max_length=15, choices=INCOME_FREQ_CHOICES, null=True, blank=True)
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

    street_address = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    state = models.CharField(max_length=2, null=True, blank=True)
    zip_code = models.CharField(max_length=10, null=True, blank=True)
    phone_number = models.CharField(max_length=12, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    adult_name = models.CharField(max_length=255)
    is_signed = models.BooleanField(default=False)
    signed_date = models.DateTimeField()

    def __unicode__(self):
        return '{0}-{1}'.format(self.pk, self.adult_name)

    class Meta:
        ordering = ('created_date',)
        verbose_name = 'Application'

    def clean(self):
        # TODO add custom validation to account for various paths
        pass

    def save(self, *args, **kwargs):
        super(CoreApplication, self).save(*args, **kwargs)


class Child(models.Model):
    application = models.ForeignKey(CoreApplication, related_name='children')
    first_name = models.CharField(max_length=255)
    middle_initial = models.CharField(max_length=1, null=True, blank=True)
    last_name = models.CharField(max_length=255)
    is_student = models.BooleanField(default=False)
    is_foster = models.BooleanField(default=False)
    is_head_start = models.BooleanField(default=False)
    is_homeless_migrant_runaway = models.BooleanField(default=False)

    @property
    def export(self):
        # for use in csv export
        return '[id:{id}, name:{name}]'.format(
            id=self.pk,
            name='{0} {1}'.format(self.first_name, self.last_name)
        )

    class Meta:
        verbose_name_plural = 'children'

    def __unicode__(self):
        return 'id:{id} {name}'.format(
            id=self.pk,
            name='{0} {1}'.format(self.first_name, self.last_name)
        )


class Adult(models.Model):
    application = models.ForeignKey(CoreApplication, related_name='adults')
    first_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255, null=True, blank=True)
    work_income = models.IntegerField(null=True, blank=True)
    work_income_frequency = models.CharField(max_length=15, choices=INCOME_FREQ_CHOICES, null=True, blank=True)
    public_income = models.IntegerField(null=True, blank=True)
    public_income_frequency = models.CharField(max_length=15, choices=INCOME_FREQ_CHOICES, null=True, blank=True)
    other_income = models.IntegerField(null=True, blank=True)
    other_income_frequency = models.CharField(max_length=15, choices=INCOME_FREQ_CHOICES, null=True, blank=True)
    is_signer = models.BooleanField(default=False)

    @property
    def export(self):
        # for use in csv export
        return '[id:{id}, name:{name}]'.format(
            id=self.pk,
            name='{0} {1}'.format(self.first_name, self.last_name)
        )

    def __unicode__(self):
        return 'id:{id} {name}'.format(
            id=self.pk,
            name='{0} {1}'.format(self.first_name, self.last_name)
        )

