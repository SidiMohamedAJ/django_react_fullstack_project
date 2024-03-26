from django.db import models


class Categorie(models.Model):
    id = models.CharField(primary_key=True, max_length=255)
    name = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    link = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'categorie'


class Course(models.Model):
    id = models.CharField(primary_key=True, max_length=255)
    title = models.TextField(blank=True, null=True)
    url = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    img_url = models.TextField(blank=True, null=True)
    rating = models.CharField(max_length=255, blank=True, null=True)
    num_reviews = models.CharField(max_length=255, blank=True, null=True)
    duration = models.CharField(max_length=255, blank=True, null=True)
    price = models.CharField(max_length=255, blank=True, null=True)
    level = models.CharField(max_length=255, blank=True, null=True)
    type = models.CharField(max_length=255, blank=True, null=True)
    sub_categorie = models.ForeignKey('Subcategorie', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'course'


class Courseinstructor(models.Model):
    course = models.OneToOneField(Course, models.DO_NOTHING, primary_key=True)  # The composite primary key (course_id, instructor_id) found, that is not supported. The first column is selected.
    instructor = models.ForeignKey('Instructor', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'courseinstructor'
        unique_together = (('course', 'instructor'),)


class Courseorganization(models.Model):
    course = models.OneToOneField(Course, models.DO_NOTHING, primary_key=True)  # The composite primary key (course_id, organization_id) found, that is not supported. The first column is selected.
    organization = models.ForeignKey('Organization', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'courseorganization'
        unique_together = (('course', 'organization'),)


class Instructor(models.Model):
    id = models.CharField(primary_key=True, max_length=255)
    name = models.TextField(blank=True, null=True)
    url = models.TextField(blank=True, null=True)
    image_url = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'instructor'


class Instructororganization(models.Model):
    instructor = models.OneToOneField(Instructor, models.DO_NOTHING, primary_key=True)  # The composite primary key (instructor_id, organization_id) found, that is not supported. The first column is selected.
    organization = models.ForeignKey('Organization', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'instructororganization'
        unique_together = (('instructor', 'organization'),)


class Organization(models.Model):
    id = models.CharField(primary_key=True, max_length=255)
    name = models.TextField(blank=True, null=True)
    contact_url = models.TextField(blank=True, null=True)
    img_url = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    phone = models.TextField(blank=True, null=True)
    e_mail = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'organization'


class Subcategorie(models.Model):
    id = models.CharField(primary_key=True, max_length=255)
    name = models.CharField(max_length=255, blank=True, null=True)
    link = models.TextField(blank=True, null=True)
    categorie = models.ForeignKey(Categorie, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'subcategorie'
