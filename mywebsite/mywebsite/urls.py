from django.contrib import admin
from django.urls import path
from myapp import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path('', views.home, name='home'),
    path('english/', views.english, name='english'),
    path('prediction/', views.prediction_view, name='prediction'),
]

