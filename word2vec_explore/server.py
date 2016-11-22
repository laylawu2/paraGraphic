from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash, jsonify
app = Flask(__name__)

import sys


from testFunction import crazyMakin, printSomething
from projections_with_Ashi import getPointsFromWords

@app.route('/')
def index():
	return render_template('index.html')


@app.route('/api', methods=['POST'])
def getAndSendWordData():
	data = request.get_data()
	dataToReturn = getPointsFromWords(data)
	return jsonify(dataToReturn)
	



#start server
#load model

#receive user input

#make api calls on model

#JSON per word {x: .34, y: .5672, z: .11222}