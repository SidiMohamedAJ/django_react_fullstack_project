from django.urls import path
from .views import (
    CategorieListAPIView, CourseListAPIView,
    InstructorListAPIView, OrganizationListAPIView,
    SubcategorieListAPIView, CourseorganizationListAPIView,
    CourseinstructorListAPIView, InstructororganizationListAPIView, SearchAPIView, Details_Categories,
    CourseListBySubCategAPIView, TopRatedCoursesAPIView, Details_CourseAPIView
)

urlpatterns = [
    path('categories/', CategorieListAPIView.as_view(), name='categorie-list'),
    path('courses/', CourseListAPIView.as_view(), name='course-list'),
    path('instructors/', InstructorListAPIView.as_view(), name='instructor-list'),
    path('organizations/', OrganizationListAPIView.as_view(), name='organization-list'),
    path('subcategories/', SubcategorieListAPIView.as_view(), name='subcategorie-list'),
    path('courseorganizations/', CourseorganizationListAPIView.as_view(), name='courseorganization-list'),
    path('courseinstructors/', CourseinstructorListAPIView.as_view(), name='courseinstructor-list'),
    path('instructororganizations/', InstructororganizationListAPIView.as_view(), name='instructororganization-list'),
    path('search/', SearchAPIView.as_view(), name='search'),
    path('details_categorie/<str:category_id>/', Details_Categories.as_view(), name='details'),

    path('coursesby_subcategory/<str:subcategory_id>/', CourseListBySubCategAPIView.as_view(), name='courses_by_subcategory'),

    path('top_rated_courses/', TopRatedCoursesAPIView.as_view()),

    path('detail_courses/<str:course_id>/', Details_CourseAPIView.as_view()),
    
]
