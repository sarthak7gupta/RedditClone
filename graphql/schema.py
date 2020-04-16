# # flask_graphene_mongo/schema.py
# import graphene
# from graphene.relay import Node
# from graphene_mongo import MongoengineConnectionField, MongoengineObjectType


# class Mutations(graphene.ObjectType):
#     create_bike = CreateBikeMutation.Field()
#     update_bike = UpdateBikeMutation.Field()
#     delete_bike = DeleteBikeMutation.Field()


# class Query(graphene.ObjectType):
# 	node = Node.Field()
# 	users = MongoengineConnectionField(User)
# 	user = MongoengineConnectionField(User)
# 	# user = graphene.Field(User)

# 	def resolve_users(self, filter, context, info):
# 		# query = User.get_query(context)
# 		# query = query.filter_by(**args)
# 		# return query.all()
# 		print(self)
# 		print(filter)
# 		print(context)
# 		print(info)
# 		return 'Hi!'


# schema = graphene.Schema(query=Query, types=[User])
