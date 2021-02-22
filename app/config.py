import sys
import os
from dotenv import load_dotenv
load_dotenv()

class Config(object):
    ENV = os.environ.get('FLASK_ENV')
    DEBUG = True