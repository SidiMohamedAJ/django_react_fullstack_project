from rest_framework.views import APIView
from rest_framework.response import Response
from .models import (Categorie, Course, Instructor,
                     Organization, Subcategorie,
                     Courseinstructor,Courseorganization,
                     Instructororganization)
from .serializers import (
    CategorieSerializer, CourseSerializer, InstructorSerializer,
    OrganizationSerializer, SubcategorieSerializer, CourseOrganizationSerializer,
    CourseInstructorSerializer, InstructorOrganizationSerializer
)

class CategorieListAPIView(APIView):
    def get(self, request):
        categories = Categorie.objects.all()
        serializer = CategorieSerializer(categories, many=True)
        return Response(serializer.data)


class CourseListAPIView(APIView):
    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

#Un sérialiseur qui filtre les cours par l'identifiant de la sous-catégorie
class CourseListBySubCategAPIView(APIView):
    def get(self, request, subcategory_id):
        # Filtrer les cours par l'identifiant de la sous-catégorie
        courses = Course.objects.filter(sub_categorie=subcategory_id)
        # Sérialiser les cours filtrés
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

class InstructorListAPIView(APIView):
    def get(self, request):
        instructors = Instructor.objects.all()
        serializer = InstructorSerializer(instructors, many=True)
        return Response(serializer.data)

class OrganizationListAPIView(APIView):
    def get(self, request):
        organizations = Organization.objects.all()
        serializer = OrganizationSerializer(organizations, many=True)
        return Response(serializer.data)

class SubcategorieListAPIView(APIView):
    def get(self, request):
        # Récupérer toutes les catégories
        categories = Categorie.objects.all()
        categorie_serializer = CategorieSerializer(categories, many=True)
        categorie_data = categorie_serializer.data

        # Créer une liste pour stocker les éléments de menu
        menuItems = []

        # Parcourir chaque catégorie
        for categorie in categorie_data:
            # Récupérer les sous-catégories de cette catégorie
            subcategories = Subcategorie.objects.filter(categorie=categorie['id'])
            subcategorie_serializer = SubcategorieSerializer(subcategories, many=True)
            subcategorie_data = subcategorie_serializer.data

            # Créer un élément de menu pour cette catégorie
            menuItem = {
                'title': categorie['name'],
                'submenu': [{'title': subcategorie['name'], 'id': subcategorie['id']} for subcategorie in subcategorie_data]
            }

            # Ajouter l'élément de menu à la liste
            menuItems.append(menuItem)

        return Response(menuItems)
    
class Details_CourseAPIView(APIView):
    def get(self, request, course_id):
        try:
            # Retrieve the course based on the provided ID
            course = Course.objects.get(id=course_id)
        except Course.DoesNotExist:
            return Response({"message": "The specified course does not exist"}, status=404)
        
        # Serialize the course data
        course_serializer = CourseSerializer(course)
        course_data = course_serializer.data
        
        # Retrieve instructors for the course
        course_instructors = Courseinstructor.objects.filter(course=course)
        instructor_ids = [ci.instructor_id for ci in course_instructors]
        instructors = Instructor.objects.filter(id__in=instructor_ids)
        instructor_serializer = InstructorSerializer(instructors, many=True)
        instructor_data = instructor_serializer.data
        
        # Retrieve organizations for the course
        course_organizations = Courseorganization.objects.filter(course=course)
        organization_ids = [co.organization_id for co in course_organizations]
        organizations = Organization.objects.filter(id__in=organization_ids)
        organization_serializer = OrganizationSerializer(organizations, many=True)
        organization_data = organization_serializer.data
        
        # Construct the response data
        response_data = {
            "course": course_data,
            "instructors": instructor_data,
            "organizations": organization_data
        }
        
        return Response(response_data)



class CourseorganizationListAPIView(APIView):
    def get(self, request):
        course_organizations = Courseorganization.objects.all()
        serializer = CourseOrganizationSerializer(course_organizations, many=True)
        return Response(serializer.data)

class CourseinstructorListAPIView(APIView):
    def get(self, request):
        course_instructors = Courseinstructor.objects.all()
        serializer = CourseInstructorSerializer(course_instructors, many=True)
        return Response(serializer.data)

class InstructororganizationListAPIView(APIView):
    def get(self, request):
        instructor_organizations = Instructororganization.objects.all()
        serializer = InstructorOrganizationSerializer(instructor_organizations, many=True)
        return Response(serializer.data)


class Details_Categories(APIView):
    def get(self, request, category_id):
        try:
            # Récupérer la catégorie correspondant à l'ID fourni
            category = Categorie.objects.get(id=category_id)
        except Categorie.DoesNotExist:
            return Response({"message": "La catégorie spécifiée n'existe pas"}, status=404)
        
        # Récupérer les sous-catégories correspondantes à la catégorie
        subcategories = Subcategorie.objects.filter(categorie=category)
        subcategories_data = SubcategorieSerializer(subcategories, many=True).data
        
        # # Récupérer les IDs des sous-catégories
        # subcategories_ids = subcategories.values_list('id', flat=True)
        
        # # Récupérer les cours correspondants à la catégorie
        # courses = Course.objects.filter(sub_categorie__in=subcategories_ids)
        # courses_data = CourseSerializer(courses, many=True).data
        
        # # Récupérer les instructeurs correspondants aux cours de la catégorie
        # instructors = Instructor.objects.filter(courses__sub_categorie__categorie=category)
        # instructors_data = InstructorSerializer(instructors, many=True).data
        
        # # Récupérer les organisations correspondantes aux cours de la catégorie
        # organizations = Organization.objects.filter(courses__sub_categorie__categorie=category)
        # organizations_data = OrganizationSerializer(organizations, many=True).data
        
        # Retourner les données sous forme de réponse JSON
        return Response({
            "category": {
                "id": CategorieSerializer(category).data,
                "name": category.name,
                "description": category.description,
                "link": category.link,
            },
            "subcategories": subcategories_data,
        })
    


from django.db.models import Q

class SearchAPIView(APIView):
    def get(self, request):
        search_term = request.query_params.get('q', '')

        # Recherche dans toutes les colonnes de chaque modèle
        categories = Categorie.objects.filter(
            Q(id__icontains=search_term) | Q(name__icontains=search_term) | Q(description__icontains=search_term) | Q(link__icontains=search_term)
        )
        courses = Course.objects.filter(
            Q(id__icontains=search_term) | Q(title__icontains=search_term) | Q(url__icontains=search_term) | Q(description__icontains=search_term) | Q(img_url__icontains=search_term) | Q(rating__icontains=search_term) | Q(num_reviews__icontains=search_term) | Q(duration__icontains=search_term) | Q(price__icontains=search_term) | Q(level__icontains=search_term) | Q(type__icontains=search_term) | Q(sub_categorie__name__icontains=search_term)
        )
        instructors = Instructor.objects.filter(
            Q(id__icontains=search_term) | Q(name__icontains=search_term) | Q(url__icontains=search_term) | Q(image_url__icontains=search_term) | Q(description__icontains=search_term)
        )
        organizations = Organization.objects.filter(
            Q(id__icontains=search_term) | Q(name__icontains=search_term) | Q(contact_url__icontains=search_term) | Q(img_url__icontains=search_term) | Q(description__icontains=search_term) | Q(phone__icontains=search_term) | Q(e_mail__icontains=search_term)
        )
        subcategories = Subcategorie.objects.filter(
            Q(id__icontains=search_term) | Q(name__icontains=search_term) | Q(link__icontains=search_term) | Q(categorie__name__icontains=search_term)
        )
        course_instructors = Courseinstructor.objects.filter(
            Q(course__title__icontains=search_term) | Q(instructor__name__icontains=search_term)
        )
        course_organizations = Courseorganization.objects.filter(
            Q(course__title__icontains=search_term) | Q(organization__name__icontains=search_term)
        )
        instructor_organizations = Instructororganization.objects.filter(
            Q(instructor__name__icontains=search_term) | Q(organization__name__icontains=search_term)
        )

        # Sérialiser les résultats de la recherche
        category_data = CategorieSerializer(categories, many=True).data
        course_data = CourseSerializer(courses, many=True).data
        instructor_data = InstructorSerializer(instructors, many=True).data
        organization_data = OrganizationSerializer(organizations, many=True).data
        subcategory_data = SubcategorieSerializer(subcategories, many=True).data
        course_instructor_data = CourseInstructorSerializer(course_instructors, many=True).data
        course_organization_data = CourseOrganizationSerializer(course_organizations, many=True).data
        instructor_organization_data = InstructorOrganizationSerializer(instructor_organizations, many=True).data

        # Retourner les résultats de la recherche sous forme de réponse JSON
        return Response({
            'categories': category_data,
            'courses': course_data,
            'instructors': instructor_data,
            'organizations': organization_data,
            'subcategories': subcategory_data,
            'course_instructors': course_instructor_data,
            'course_organizations': course_organization_data,
            'instructor_organizations': instructor_organization_data
        })


class TopRatedCoursesAPIView(APIView):
    def get(self, request):
        # Récupérer les 20 premiers cours triés par rating en ordre décroissant
        courses = Course.objects.order_by('rating')[:20]
        # Sérialiser les cours
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)
