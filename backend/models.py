from datetime import datetime
from functools import partial
from json import dumps

from bson import json_util
from mongoengine import Document
from mongoengine.fields import (DateField, DateTimeField, EmailField, IntField, ObjectIdField,
                                ReferenceField, StringField)

dumps = partial(dumps, default=json_util.default)


class User(Document):
	username = StringField(regex=r'\w+', max_length=64,
	                       required=True, primary_key=True)
	password = StringField(required=True)
	email = EmailField(unique=True, required=True)
	bio = StringField(max_length=512, default=str)
	cakeday = DateField(default=datetime.utcnow)
	karma = IntField(default=lambda: 0)

	meta = {'collection': 'users'}

	def json(self):
		return dumps({
			'username': self.username,
			'email': self.email,
			'bio': self.bio,
			'cakeday': self.cakeday,
			'karma': self.karma
		})


class Cookie(Document):
	username = ReferenceField(User)
	created = DateTimeField(default=datetime.utcnow)
	meta = {
		'indexes': [{
			'fields': ['username'],
			'expireAfterSeconds': 6 * 60 * 60
		}]
	}

	meta = {'collection': 'cookies'}


class Subreddit(Document):
	name = StringField(regex=r'\w+', max_length=64, primary_key=True)
	title = StringField(max_length=256, required=True)
	createdby = ReferenceField(User)
	desc = StringField(required=True)
	createddate = DateTimeField(default=datetime.utcnow)
	rules = StringField(default=str)
	topic = StringField(default=str)

	meta = {'collection': 'subreddits'}

	def json(self):
		return dumps({
			'name': self.name,
			'title': self.title,
			'createdby': self.createdby.username,
			'desc': self.desc,
			'createddate': self.createddate,
			'rules': self.rules,
			'topic': self.topic
		})


class Post(Document):
	_id = ObjectIdField(primary_key=True)
	author = ReferenceField(User, required=True)
	title = StringField(max_length=256, required=True)
	subreddit = ReferenceField(Subreddit, required=True)
	body = StringField(default=str)
	posteddate = DateTimeField(default=datetime.utcnow)
	votecount = IntField(default=lambda: 1)
	flair = StringField()

	meta = {'collection': 'posts'}

	def json(self):
		return dumps({
			'author': self.author.username,
			'title': self.title,
			'subreddit': self.subreddit.name,
			'posteddate': self.posteddate.strftime("%d-%m-%Y %H:%M:%S"),
			'votecount': self.votecount,
			'flair': self.flair
		})


# class Vote(Document):
# 	user = ReferenceField(User, required=True)
# 	post = ReferenceField(Post, required=True)
# 	value = IntField(default=lambda: 1)

# 	meta = {'collection': 'votes'}


class Subscription(Document):
	user = ReferenceField(User, required=True)
	subreddit = ReferenceField(Subreddit, required=True, unique_with='user')

	meta = {'collection': 'subs'}

	def json(self):
		return dumps({
			'user': self.user,
			'subreddit': self.subreddit
		})
