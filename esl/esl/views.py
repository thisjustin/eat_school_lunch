from django.views.generic import TemplateView

class HomeView(TemplateView):
    template_name = 'home.html'

class ApplyView(TemplateView):
    template_name = 'apply.html'

class SuccessView(TemplateView):
    template_name = 'success.html'