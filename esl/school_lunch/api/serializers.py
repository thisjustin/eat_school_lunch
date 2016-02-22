from rest_framework import serializers
from school_lunch.models import CoreApplication, Child, Adult


class ChildSerializer(serializers.ModelSerializer):
    class Meta:
        model = Child
        exclude = ('application',)


class AdultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Adult
        exclude = ('application',)

class CoreApplicationSerializer(serializers.ModelSerializer):
    # nested objects in DRF     http://www.django-rest-framework.org/api-guide/relations/
    children = ChildSerializer(many=True)
    adults = AdultSerializer(many=True, required=False)

    class Meta:
        model = CoreApplication
        fields = ('__all__')
        depth = 1

    def create(self, validated_data):
        child_data = validated_data.pop('children')
        adult_data = validated_data.pop('adults') if validated_data.get('adults') else []

        core_app = CoreApplication.objects.create(**validated_data)

        for child in child_data:
            Child.objects.create(application=core_app, **child)

        for adult in adult_data:
            Adult.objects.create(application=core_app, **adult)

        return core_app