from flask import Flask, request, Response, session, g, redirect, url_for, abort, \
     render_template, flash, jsonify
import json
app = Flask(__name__)

# import our nice vector functions from other file

from projections_with_Ashi import getPointsFromWords


# load index.html on get request to localhost:5000 - OR NOT -
#			maybe we'll just have to deal with having an express server and a python/flask server

# @app.route('/')
# def index():
# 	print 'in get route'
# 	return app.send_static_file('index.html')



# *where the magic happens*
# takes user input sent from front end as object, passes to lovely vector function imported line 7
# formats the result of getPointsFromWords as json and sends back to front end


@app.route('/api', methods=['POST'])
def getAndSendWordData():
	data = request.json
	dataToReturn = getPointsFromWords(data)
 	return Response(json.dumps(dataToReturn), content_type='application/json')
 	

	
