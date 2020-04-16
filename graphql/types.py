# from graphene.relay import Node
# from graphene_mongo import MongoengineObjectType

# from models import Comment as CommentModel
# from models import CommentVote as CommentVoteModel
# from models import ImagePost as ImagePostModel
# from models import LinkPost as LinkPostModel
# from models import Post as PostModel
# from models import PostVote as PostVoteModel
# from models import SavedComment as SavedCommentModel
# from models import SavedPost as SavedPostModel
# from models import Subreddit as SubredditModel
# from models import Subscription as SubscriptionModel
# from models import TextPost as TextPostModel
# from models import Topic as TopicModel
# from models import User as UserModel
# from models import Vote as VoteModel


# class User(MongoengineObjectType):
# 	class Meta:
# 		model = UserModel
# 		interfaces = (Node,)


# class Topic(MongoengineObjectType):
# 	class Meta:
# 		model = TopicModel
# 		interfaces = (Node,)


# class Subreddit(MongoengineObjectType):
# 	class Meta:
# 		model = SubredditModel
# 		interfaces = (Node,)


# class Post(MongoengineObjectType):
# 	class Meta:
# 		model = PostModel
# 		interfaces = (Node,)


# class Comment(MongoengineObjectType):
# 	class Meta:
# 		model = CommentModel
# 		interfaces = (Node,)


# class Vote(MongoengineObjectType):
# 	class Meta:
# 		model = VoteModel
# 		interfaces = (Node,)


# class PostVote(MongoengineObjectType):
# 	class Meta:
# 		model = PostVoteModel
# 		interfaces = (Node,)


# class CommentVote(MongoengineObjectType):
# 	class Meta:
# 		model = CommentVoteModel
# 		interfaces = (Node,)


# class Subscription(MongoengineObjectType):
# 	class Meta:
# 		model = SubscriptionModel
# 		interfaces = (Node,)


# class SavedPost(MongoengineObjectType):
# 	class Meta:
# 		model = SavedPostModel
# 		interfaces = (Node,)


# class SavedComment(MongoengineObjectType):
# 	class Meta:
# 		model = SavedCommentModel
# 		interfaces = (Node,)


# class TextPost(MongoengineObjectType):
# 	class Meta:
# 		model = TextPostModel
# 		interfaces = (Node,)


# class ImagePost(MongoengineObjectType):
# 	class Meta:
# 		model = ImagePostModel
# 		interfaces = (Node,)


# class LinkPost(MongoengineObjectType):
# 	class Meta:
# 		model = LinkPostModel
# 		interfaces = (Node,)
