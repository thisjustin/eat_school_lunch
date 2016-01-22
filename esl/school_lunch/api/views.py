from school_lunch.models import CoreApplication
from school_lunch.api.serializers import CoreApplicationSerializer
from rest_framework import viewsets

# class CoreApplicationListView(generics.ListCreateAPIView):
#     queryset = CoreApplication.objects.all()
#     serializer_class = CoreApplicationSerializer
#
#
# class CoreApplicationDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = CoreApplication.objects.all()
#     serializer_class = CoreApplicationSerializer

class CoreApplicationViewSet(viewsets.ModelViewSet):
    queryset = CoreApplication.objects.all()
    serializer_class = CoreApplicationSerializer

    def perform_create(self, serializer):
        serializer.save()