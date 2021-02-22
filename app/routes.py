from app import app
from flask import render_template, request, json
import requests
import os

@app.route('/', methods=['GET'])
def index():
  return render_template('index.html')

@app.route('/form', methods=['GET'])
def form():
  return render_template('form.html')

@app.route('/secure', methods=['POST'])
def secure():
  aliased_data = request.get_json(force=True)
  print(aliased_data)
  return render_template('secure.html')

@app.route('/outbound', methods=['GET'])
def outbound():
  return render_template('outbound.html')

@app.route('/reveal', methods=['POST'])
def reveal():
  UN = os.environ.get('USERNAME')
  PW = os.environ.get('PASSWORD')
  VI = os.environ.get('VAULT_ID')

  n = request.form['card_number']
  c = request.form['card_cvv']
  e = request.form['card_exp']

  os.environ['HTTPS_PROXY'] = 'http://' + UN + ':' + PW + '@' + VI +'.sandbox.verygoodproxy.com:8080'

  res = requests.post('https://echo.apps.verygood.systems/post',
                         json = {
                           'card_number': n,
                           'card_cvv': c,
                           'card_exp': e
                         },
                         verify = 'path/to/sandbox.pem') #replace with correct path

  d = json.loads(res.json()['data'])

  return render_template('reveal.html', num=d['card_number'], exp=d['card_exp'], cvv=d['card_cvv'])
