from models import User, Subreddit, Post

from names
import random
from faker import Faker

from mongoengine import connect

fake = Faker('fr_FR')

if __name__ == 'main':
	connect('redditclone')

	sarthak = User(
		username='sarthak7gupta',
		password='hello1234'
		email='rsarthakgupta@gmail.com'
		bio='StringField(max_length=512, default=str)'
		cakeday=datetime.utcnow
		karma=0)
	sarthak.save()

