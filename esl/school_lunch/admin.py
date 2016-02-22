from django.contrib import admin

from models import CoreApplication, Child, Adult
from import_export import resources, fields
from import_export.admin import ImportExportModelAdmin
from import_export.widgets import ForeignKeyWidget

class ChildResource(resources.ModelResource):
    class Meta:
        model = Child


class AdultResource(resources.ModelResource):
    class Meta:
        model = Adult

class CoreApplicationResource(resources.ModelResource):
    children = fields.Field(column_name='Children', widget=ForeignKeyWidget(Child))
    class Meta:
        model = CoreApplication


class ChildInline(admin.TabularInline):
    model = Child


class AdultInline(admin.TabularInline):
    model = Adult


class CoreApplicationAdmin(ImportExportModelAdmin):
    resource_class = CoreApplicationResource
    list_display = ('adult_name', 'created_date')
    search_fields = ('=adult_name', 'id', '=email', '=children__first_name', '=children__last_name', '=adults__first_name', '=adults__last_name')
    list_filter = ('children', 'adults',)
    inlines = [ChildInline, AdultInline]


class ChildAdmin(admin.ModelAdmin):
    list_display = ('application', 'first_name', 'last_name')
    search_fields = ('=application__adult_name', '=first_name', '=last_name')
    list_filter = ('application',)


class AdultAdmin(admin.ModelAdmin):
    list_display = ('application', 'first_name', 'last_name')
    list_filter = ('application',)
    search_fields = ('=application__adult_name', '=first_name', '=last_name')


admin.site.register(CoreApplication, CoreApplicationAdmin)
admin.site.register(Child, ChildAdmin)
admin.site.register(Adult, AdultAdmin)
