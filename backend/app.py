from functools import partial
from json import loads

import bcrypt
from bson import json_util
from flask import Flask
from flask_restful import Api, Resource, reqparse
from mongoengine import DoesNotExist, connect
from mongoengine.queryset.visitor import Q

from models import Cookie, Post, Subreddit, User, Subscription

# PostVote, SavedPost,
# Subscription, UserPostLink, UserSubredditLink, Vote)

loads = partial(loads, object_hook=json_util.object_hook)

app = Flask(__name__)
api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument('username', type=str)
parser.add_argument('email', type=str)
parser.add_argument('password', type=str)
parser.add_argument('bio', type=str)
parser.add_argument('name', type=str)
parser.add_argument('title', type=str)
parser.add_argument('desc', type=str)
parser.add_argument('rules', type=str)
parser.add_argument('topic', type=str)
parser.add_argument('subreddit', type=str)
parser.add_argument('flair', type=str)
parser.add_argument('body', type=str)
parser.add_argument('up', type=int)


cors = {'Access-Control-Allow-Origin': '*'}


class User_(Resource):

	def post(self):
		"""
			Login
			@param username: username or email (str)
			@param password: (str)
			@returns {'username'}
		"""
		a = parser.parse_args()
		u_username, u_password = a['username'], a['password']

		if not u_username or not u_password:
			return {
				'message': 'all fields required'
			}, 400, cors

		try:
			user = User.objects(Q(username=u_username) | Q(email=u_username)).get()
		except DoesNotExist:
			return {
				'message': 'username or email does not exist'
			}, 400, cors
		else:
			pass

		correct = bcrypt.checkpw(u_password.encode('utf-8'), user.password.encode('utf-8'))

		if not correct:
			return {
				'message': 'wrong password'
			}, 400, cors

		try:
			Cookie.objects(username=user).get()
		except DoesNotExist:
			Cookie(username=user).save()

		return {
			'username': user.username
		}, 200, cors

	def put(self):
		"""
			Signup
			@param username: (str)
			@param email: (str)
			@param password: (str)
			@optional @param bio: (str)
			@returns {'username'}
		"""
		a = parser.parse_args()
		u_username, u_password, u_email, u_bio = \
			a['username'], a['password'], a['email'], a['bio']

		if not u_username or \
			not u_password or \
			not u_email:
			return {
				'message': 'all fields required'
			}, 400, cors

		try:
			User.objects(Q(username=u_username) | Q(email=u_email)).get()
		except DoesNotExist:
			pass
		else:
			return {
				'message': 'username or email exists'
			}, 400, cors

		u_hashed = bcrypt.hashpw(u_password.encode('utf-8'), bcrypt.gensalt(12))

		User(
			username=u_username,
			password=u_hashed,
			email=u_email,
			bio=(u_bio or '')
		).save()

		return {
			'username': u_username
		}, 200, cors


class SubReddits_(Resource):
	def get(self):
		"""
			List of all subreddits
			@returns list({'name'})
		"""
		r = [loads(i.json()) for i in Subreddit.objects()]
		return [{'name': i['name']} for i in r], 200, cors


class SubReddit_(Resource):

	def put(self):
		"""
			New Subreddit
			@param name: (str)
			@param title: (str)
			@param username: creator (str)
			@param desc: (str)
			@optional @param rules: (str)
			@optional @param topic: (str)
			@returns {'name'}
		"""
		a = parser.parse_args()
		s_name, s_title, s_username, s_desc, s_rules, s_topic = \
			a['name'], a['title'], a['username'], a['desc'], a['rules'], a['topic']

		if not s_name or \
			not s_title or \
			not s_desc or \
			not s_username:
			return {
				'message': 'all fields required'
			}, 400, cors

		try:
			s_user = User.objects(username=s_username).get()
		except DoesNotExist:
			return {
				'message': 'user does not exist'
			}, 400, cors

		try:
			Subreddit.objects(name=s_name).get()
		except DoesNotExist:
			pass
		else:
			return {
				'message': 'subreddit already exists'
			}, 400, cors

		Subreddit(
			name=s_name,
			title=s_title,
			createdby=s_user,
			desc=s_desc,
			rules=(s_rules or ''),
			topic=(s_topic or '')
		).save()

		return {
			'name': s_name
		}, 200, cors


class Post_(Resource):

	def get(self):
		"""
			Get all posts or a subreddit's posts
			@optional @param subreddit: all posts if not given, else only of that subreddit
			@returns list({"author", "title", "subreddit", "posteddate", "votecount", "flair"})
		"""
		a = parser.parse_args()
		p_subreddit = a['subreddit']

		if p_subreddit:
			try:
				p_subreddit = Subreddit.objects(name=p_subreddit).get()
			except DoesNotExist:
				return {
					'message': 'user does not exist'
				}, 400, cors

			return [loads(i.json()) for i in Post.objects(subreddit=p_subreddit)], 200, cors

		return [loads(i.json()) for i in Post.objects()], 200, cors

	def post(self):
		"""
			New Post
			@param username: (str)
			@param title: (str)
			@param subreddit: (str)
			@optional @param body: (str)
			@optional @param flair: (str)
			@returns {}
		"""
		a = parser.parse_args()
		p_username, p_title, p_subreddit, p_flair, p_body = \
			a['username'], a['title'], a['subreddit'], a['flair'], a['body']
		if not p_username \
			or not p_title \
			or not p_subreddit:
			return {
				'message': 'all fields required'
			}, 400, cors

		try:
			p_user = User.objects(username=p_username).get()
		except DoesNotExist:
			return {
				'message': 'user does not exist'
			}, 400, cors

		try:
			p_subreddit = Subreddit.objects(name=p_subreddit).get()
		except DoesNotExist:
			return {
				'message': 'user does not exist'
			}, 400, cors

		new_post = Post(
			author=p_user,
			title=p_title,
			subreddit=p_subreddit,
			flair=(p_flair or ''),
			body=(p_body or '')
		).save()

		return {
			'_id': new_post._id
		}, 200, cors


class Vote(Resource):
	def get(self):
		"""
			get vote count
			@param postid: postid
			@returns int
		"""
		a = parser.parse_args()
		v_postid = a['postid']
		if not v_postid:
			return {
				'message': 'all fields required'
			}, 400, cors

		try:
			v_post = Post.objects(_id=v_postid).get()
		except DoesNotExist:
			return {
				'message': 'Post does not exist'
			}, 400, cors

		return v_post.votecount, 200, cors

	def put(self):
		"""
			Create Vote
		"""
		a = parser.parse_args()
		v_username, v_postid, v_up = \
			a['username'], a['postid'], a['up']
		if not v_username \
			or not v_postid \
			or not v_up:
			return {
				'message': 'all fields required'
			}, 400, cors

		try:
			v_post = Post.objects(_id=v_postid).get()
		except DoesNotExist:
			return {
				'message': 'Post does not exist'
			}, 400, cors

		try:
			User.objects(username=v_username).get()
		except DoesNotExist:
			return {
				'message': 'user does not exist'
			}, 400, cors

		v_post.votecount += (1 if v_up else -1)
		v_post.save()

		return {
			'votecount': v_post.votecount
		}, 200, cors


class Subscription_(Resource):
	def get(self):
		"""
			@param username: str
			@returns list({'name'})
		"""
		a = parser.parse_args()
		s_username = a['username']
		if not s_username:
			return {
				'message': 'all fields required'
			}, 400, cors

		try:
			s_user = User.objects(username=s_username).get()
		except DoesNotExist:
			return {
				'message': 'user does not exist'
			}, 400, cors

		subs = Subscription.objects(user=s_user)

		subs = [{'name': loads(i.json())['subreddit']} for i in subs]

		return subs, 200, cors

	def post(self):
		"""
			New Subscription
			@param username: str
			@param subreddit: str
			#return {}
		"""
		a = parser.parse_args()
		s_username, s_subreddit = \
			a['username'], a['subreddit']
		if not s_username \
			or not s_subreddit:
			return {
				'message': 'all fields required'
			}, 400, cors

		try:
			s_user = User.objects(username=s_username).get()
		except DoesNotExist:
			return {
				'message': 'user does not exist'
			}, 400, cors

		try:
			s_subreddit = Subreddit.objects(name=s_subreddit).get()
		except DoesNotExist:
			return {
				'message': 'user does not exist'
			}, 400, cors

		try:
			Subscription.objects(Q(user=s_user) & Q(subreddit=s_subreddit)).get()
		except DoesNotExist:
			pass
		else:
			return {
				'message': 'already subscribed'
			}, 400, cors

		Subscription(
			user=s_user,
			subreddit=s_subreddit
		).save()

		return {}, 200, cors


api.add_resource(User_, '/api/user')
api.add_resource(Post_, '/api/post')
api.add_resource(SubReddit_, '/api/subreddit')
api.add_resource(SubReddits_, '/api/subreddits')
api.add_resource(Subscription_, '/api/sub')


if __name__ == '__main__':
	connect('redditclone')
	app.run(debug=True)
