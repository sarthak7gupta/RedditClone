from datetime import datetime

from mongoengine import Document
from mongoengine.fields import (DateTimeField, ObjectIdField, ReferenceField,
                                StringField)

# from mongoengine.fields import IntField


class Department(Document):
	meta = {'collection': 'department'}
	ID = ObjectIdField(primary_key=True)
	name = StringField()


class Role(Document):
	meta = {'collection': 'role'}
	ID = ObjectIdField(primary_key=True)
	name = StringField()


class Employee(Document):
	meta = {'collection': 'employee'}
	ID = ObjectIdField(primary_key=True)
	name = StringField()
	hired_on = DateTimeField(default=datetime.now)
	department = ReferenceField(Department)
	role = ReferenceField(Role)
