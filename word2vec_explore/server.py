from flask import Flask, request, Response, session, g, redirect, url_for, abort, \
     render_template, flash, jsonify
import json
app = Flask(__name__)

# import Google-News-trained word2vec model

from projections_with_Ashi import news


# code below configures server to receive python code from a file and execute that code

# this was necessary during development because loading the model takes a few minutes and thus
# restarting the server for every code change was highly inefficient

# code that python server runs is located in PCA.py file

from types import ModuleType
import sys
import traceback

@app.route('/eval', methods=['POST'])
def runCode():
	code = request.json['code']
	try:
		pyc = compile(code, 'dynamic_code', 'exec')
		module = ModuleType('dynamic_module')
		module.__dict__['news'] = news
		exec(pyc, module.__dict__)
		return module.main(request)
	except:
		(kind, value, trace) = sys.exc_info()
		print traceback.format_exc()
		return "\n".join((str(value), traceback.format_exc())), 400