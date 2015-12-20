from django.contrib import admin

from models import CoreApplication, Child, Adult


class CoreApplicationAdmin(admin.ModelAdmin):
    list_display = ('created_date', 'adult_name')


class ChildAdmin(admin.ModelAdmin):
    list_display = ('application', 'first_name', 'last_name')


class AdultAdmin(admin.ModelAdmin):
    list_display = ('application', 'first_name', 'last_name')


admin.site.register(CoreApplication, CoreApplicationAdmin)
admin.site.register(Child, ChildAdmin)
admin.site.register(Adult, AdultAdmin)
