import graphene
from graphene.relay import Node
from graphene_mongo import MongoengineConnectionField, MongoengineObjectType

from models import Department as DepartmentModel
from models import Employee as EmployeeModel
from models import Role as RoleModel


class Department(MongoengineObjectType):

	class Meta:
		model = DepartmentModel
		interfaces = (Node,)


class Role(MongoengineObjectType):

	class Meta:
		model = RoleModel
		interfaces = (Node,)


class Employee(MongoengineObjectType):

	class Meta:
		model = EmployeeModel
		interfaces = (Node,)


class Query(graphene.ObjectType):
	node = Node.Field()
	all_employees = MongoengineConnectionField(Employee)
	all_departments = MongoengineConnectionField(Department)
	all_role = MongoengineConnectionField(Role)
	role = graphene.Field(Role)


class DepartmentInput(graphene.InputObjectType):
	id = graphene.ID()
	name = graphene.String()


class CreateDepartmentMutation(graphene.Mutation):
	dept = graphene.Field(Department)

	class Arguments:
		dept_data = DepartmentInput(required=True)

	def mutate(self, info, dept_data=None):
		dept = DepartmentModel(
			ID= dept_data.id,
			name=dept_data.name,
		)
		dept.save()

		return CreateDepartmentMutation(dept=dept)


class UpdateDepartmentMutation(graphene.Mutation):
	dept = graphene.Field(Department)

	class Arguments:
		dept_data = DepartmentInput(required=True)

	@staticmethod
	def get_object(ID):
		return DepartmentModel.objects.get(pk=ID)

	def mutate(self, info, dept_data=None):
		dept = UpdateDepartmentMutation.get_object(dept_data.id)
		if not dept_data.name:
			dept.name = "new"
		if dept_data.name:
			dept.name = dept_data.name

		dept.save()

		return UpdateDepartmentMutation(dept=dept)


class DeleteDepartmentMutation(graphene.Mutation):
	class Arguments:
		id = graphene.ID(required=True)

	success = graphene.Boolean()

	def mutate(self, info, id):
		try:
			DepartmentModel.objects.get(pk=id).delete()
			success = True
		except Exception:
			success = False
		return DeleteDepartmentMutation(success=success)


class Mutations(graphene.ObjectType):
	create_dept = CreateDepartmentMutation.Field()
	update_dept = UpdateDepartmentMutation.Field()
	delete_dept = DeleteDepartmentMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutations, types=[Department, Employee, Role])
