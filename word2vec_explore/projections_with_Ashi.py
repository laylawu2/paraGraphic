import numpy as np
import pandas as pd
from bs4 import BeautifulSoup
import re
from nltk.corpus import stopwords
from gensim.models import word2vec

#/Users/caraweber/Documents/capstone/capstone/word2vec_explore/

news = word2vec.Word2Vec.load_word2vec_format('bigFiles/GoogleNews-vectors-negative300.bin', binary=True)
#news = word2vec.Word2Vec.load_word2vec_format('300features_40minwords_10context', binary=False)

class MockModel(object):
	def __contains__ (self, word):
		return True

	def __getitem__ (self, word):
		return np.random.rand(500).astype(np.float64)

#news = MockModel()

def get_model():
	return news

def text_to_words(textfield, model):
	textblock = BeautifulSoup(textfield, 'html.parser').get_text()
	textblock = re.sub("[^a-zA-Z]", " ", textblock)
	words = textblock.lower().split()
	stops = set(stopwords.words("english"))
	words = [w for w in words if w in model and not w in stops]
	return words



def EDITproject3D(model, xmin, xmax, ymin, ymax, zmin, zmax, words):
	wordCoordinates={}

	xminVec, xmaxVec = model[xmin], model[xmax]
	xaxis = xmaxVec - xminVec

	yminVec, ymaxVec = model[ymin], model[ymax]
	yaxis = ymaxVec - yminVec

	zminVec, zmaxVec = model[zmin], model[zmax]
	zaxis = zmaxVec - zminVec

	xdenom = np.dot(xaxis, xaxis)
	ydenom = np.dot(yaxis, yaxis)
	zdenom = np.dot(zaxis, zaxis)


	for word in words:
		coords = []
		coords.append(np.dot(model[word] - xminVec, xaxis) / xdenom)
		coords.append(np.dot(model[word] - yminVec, yaxis) / ydenom)
		coords.append(np.dot(model[word] - zminVec, zaxis) / zdenom)
		wordCoordinates[word] = coords

# calculate the dot products for denominator of fractions ONCE (outside of loop)
# use a list comprehension instead of 3 different coords.append things in loop
# value, loop condition for value, filter (optional)

	return wordCoordinates




def project3D(model, xmin, xmax, ymin, ymax, zmin, zmax, words):
	wordCoordinates={}

	xminVec, xmaxVec = model[xmin], model[xmax]
	xaxis = xmaxVec - xminVec

	yminVec, ymaxVec = model[ymin], model[ymax]
	yaxis = ymaxVec - yminVec

	zminVec, zmaxVec = model[zmin], model[zmax]
	zaxis = zmaxVec - zminVec

	for word in words:
		coords = []
		coords.append(np.asscalar(np.dot(model[word] - xminVec, xaxis) / np.dot(xaxis, xaxis)))
		coords.append(np.asscalar(np.dot(model[word] - yminVec, yaxis) / np.dot(yaxis, yaxis)))
		coords.append(np.asscalar(np.dot(model[word] - zminVec, zaxis) / np.dot(zaxis, zaxis)))
		wordCoordinates[word] = coords

# calculate the dot products for denominator of fractions ONCE (outside of loop)
# use a list comprehension instead of 3 different coords.append things in loop
# value, loop condition for value, filter (optional)

	return wordCoordinates



def getPointsFromWords(userInputObj):

	textfield = userInputObj['text']
	wordsToPlot = text_to_words(textfield, news)

	xmin = userInputObj['x'][0]
	xmax = userInputObj['x'][1]

	ymin = userInputObj['y'][0]
	ymax = userInputObj['y'][1]

	zmin = userInputObj['z'][0]
	zmax = userInputObj['z'][1]

	words_with_coords = project3D(news, xmin, xmax, ymin, ymax, zmin, zmax, wordsToPlot)
	return words_with_coords


# for a request object with the following structure:  
# 	{x: ['one', 'two'],
#  	 y: ['another', 'pair'],
#  	 z: ['third', 'set'],
#  	 text: 'article entered as string'}

# grab those values, perform vector projections for each WORD in text field, send back (x,y,z)
# coords. for every word.  









# #NEED TO IMPORT A BUNCH MORE STUFF gensim, scipy, 

# news = word2vec.Word2Vec.load_word2vec_format('GoogleNews-vectors-negative300.bin', binary=True)

# def project(model, min, max, *words):
#     minVec, maxVec = model[min], model[max]
#     axis = maxVec - minVec
#     return [(word, np.dot(model[word] - minVec, axis) / np.dot(axis, axis)) for word in words]

# from scipy import spatial
# #spatial.distance.cosine(
# #    news['Albany'] - news['New_York'],
# #    news['Sacramento'] - news['California'])