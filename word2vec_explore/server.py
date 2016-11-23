from flask import Flask, request, Response, session, g, redirect, url_for, abort, \
     render_template, flash, jsonify
import json
app = Flask(__name__)

# import our nice vector functions from other file
from projections_with_Ashi import getPointsFromWords


# load index.html on get request to localhost:5000
@app.route('/')
def index():
	return render_template('index.html')



# *where the magic happens*
# takes user input sent from front end as object, passes to lovely vector function imported line 7
# formats the result of getPointsFromWords as json and sends back to front end

@app.route('/api', methods=['POST'])
def getAndSendWordData():
	data = request.json
	#get_data returns data as string.  Form should return parsed data if type is recognized. try running this!
	dataToReturn = getPointsFromWords(data)
 	return Response(json.dumps(dataToReturn), content_type='application/json')
 	

	
