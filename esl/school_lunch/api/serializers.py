from rest_framework import serializers
from school_lunch.models import CoreApplication, Child, Adult


class ChildSerializer(serializers.ModelSerializer):
    class Meta:
        model = Child
        # fields = ('__all__')
        exclude = ('application',)


class AdultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Adult
        # fields = ('__all__')
        exclude = ('application',)

class CoreApplicationSerializer(serializers.ModelSerializer):
    # nested objects in DRF     http://www.django-rest-framework.org/api-guide/relations/
    children = ChildSerializer(many=True)
    adults = AdultSerializer(many=True)

    class Meta:
        model = CoreApplication
        fields = ('__all__')
        depth = 1

    def create(self, validated_data):
        child_data = validated_data.pop('children')
        adult_data = validated_data.pop('adults')

        core_app = CoreApplication.objects.create(**validated_data)
        print '\n core app: ', core_app.__dict__
        for child in child_data:
            Child.objects.create(application=core_app, **child)

        for adult in adult_data:
            Adult.objects.create(application=core_app, **adult)

        return core_app