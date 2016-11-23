from flask import Flask, request, Response, session, g, redirect, url_for, abort, \
     render_template, flash, jsonify
import json
app = Flask(__name__)

#import sys

from projections_with_Ashi import getPointsFromWords

@app.route('/')
def index():
	return render_template('index.html')


# @app.route('/')
# def printsomething():
# 	return 'adklfj'


@app.route('/api', methods=['POST'])
def getAndSendWordData():
	print 'hello'
	data = request.json
	#get_data returns data as string.  Form should return parsed data if type is recognized. try running this!
	dataToReturn = getPointsFromWords(data)
 	return Response(json.dumps(dataToReturn), content_type='application/json')
 	

	



#start server
#load model

#receive user input

#make api calls on model

#JSON per word {x: .34, y: .5672, z: .11222}