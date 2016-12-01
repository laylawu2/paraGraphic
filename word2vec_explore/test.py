from flask import Response
import numpy as np
import json





def main():
	return Response(json.dumps(news['hello'].tolist()), content_type='application/json')
