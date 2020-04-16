from mongoengine import connect

from models import Department, Employee, Role

# You can connect to a real mongo server instance by your own.
connect('graphene-mongo-test', host='127.0.0.1:27017', alias='default')


def init_db():
	# Create the fixtures
	engineering = Department(ID="507f1f77bcf86cd799439011", name='Engineering')
	engineering.save()

	hr = Department(ID="507f1f77bcf86cd799439012", name='Human Resources')
	hr.save()

	manager = Role(ID="407f1f77bcf86cd799439011", name='manager')
	manager.save()

	engineer = Role(ID="407f1f77bcf86cd799439012", name='engineer')
	engineer.save()

	pete = Employee(ID="307f1f77bcf86cd799439011", name='Peter', department=engineering, role=engineer)
	pete.save()

	roy = Employee(ID="307f1f77bcf86cd799439012", name='Roy', department=engineering, role=engineer)
	roy.save()

	tracy = Employee(ID="307f1f77bcf86cd799439013", name='Tracy', department=hr, role=manager)
	tracy.save()
