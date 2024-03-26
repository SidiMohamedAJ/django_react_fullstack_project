from rest_framework import serializers
from .models import Categorie, Course, Courseinstructor, Courseorganization, Instructor, Instructororganization, Organization, Subcategorie

class CategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorie
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class CourseInstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courseinstructor
        fields = '__all__'

class CourseOrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courseorganization
        fields = '__all__'

class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructor
        fields = '__all__'

class InstructorOrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructororganization
        fields = '__all__'

class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = '__all__'

class SubcategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategorie
        fields = '__all__'
