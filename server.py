from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash
app = Flask(__name__)

import sys


from projections_with_Ashi import text_to_words


@app.route('/', methods=['POST'])
def sendBackData():
	data = request.get_data()
	print text_to_words
	return data


#start server
#load model

#receive user input

#make api calls on model

#JSON per word {x: .34, y: .5672, z: .11222}