from django.contrib import admin

from models import CoreApplication, Child, Adult
from import_export import resources, fields
from import_export.admin import ImportExportModelAdmin
from import_export.widgets import ManyToManyWidget


class ChildResource(resources.ModelResource):
    class Meta:
        model = Child


class AdultResource(resources.ModelResource):
    class Meta:
        model = Adult


class CoreApplicationResource(resources.ModelResource):
    # way to include foreign key fields via django_import_export, see export @property on model to adjust output
    children = fields.Field(column_name='Children', attribute='children', widget=ManyToManyWidget(Child, separator=',', field='export'))
    adults = fields.Field(column_name='Adults', attribute='adults', widget=ManyToManyWidget(Adult, separator=',', field='export'))
    class Meta:
        model = CoreApplication


class ChildInline(admin.TabularInline):
    model = Child


class AdultInline(admin.TabularInline):
    model = Adult


class CoreApplicationAdmin(ImportExportModelAdmin):
    resource_class = CoreApplicationResource
    list_display = ('adult_name', 'created_date', 'approved_date')
    search_fields = ('=adult_name', 'id', '=email', '=children__first_name', '=children__last_name', '=adults__first_name', '=adults__last_name')
    list_filter = ('assistance_type',)
    inlines = [ChildInline, AdultInline]


class ChildAdmin(ImportExportModelAdmin):
    resource_class = ChildResource
    list_display = ('application', 'first_name', 'last_name')
    search_fields = ('=application__adult_name', '=first_name', '=last_name')
    list_filter = ('application',)


class AdultAdmin(ImportExportModelAdmin):
    resource_class = AdultResource
    list_display = ('application', 'first_name', 'last_name')
    list_filter = ('application',)
    search_fields = ('=application__adult_name', '=first_name', '=last_name')


admin.site.register(CoreApplication, CoreApplicationAdmin)
admin.site.register(Child, ChildAdmin)
admin.site.register(Adult, AdultAdmin)
