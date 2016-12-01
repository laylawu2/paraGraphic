import numpy as np
import pandas as pd
from bs4 import BeautifulSoup
import re
from nltk.corpus import stopwords
from gensim.models import word2vec

# loads the pre-trained Google News model

news = word2vec.Word2Vec.load_word2vec_format('bigFiles/GoogleNews-vectors-negative300.bin', binary=True)


# following class and function used for testing purposes only; do not run in actual app
class MockModel(object):
	def __contains__ (self, word):
		return True

	def __getitem__ (self, word):
		return np.random.rand(500).astype(np.float64)

def get_model():
	return news

#news = MockModel()

# takes in a long text string, removes markup, removes non-alphanumeric characters, splits into words
# eliminates stopwords ("a", "and", "the", etc.) and words not in model (to avoid errors)
def text_to_words(textfield, model):
	textblock = BeautifulSoup(textfield, 'html.parser').get_text()
	textblock = re.sub("[^a-zA-Z]", " ", textblock)
	words = textblock.lower().split()
	stops = set(stopwords.words("english"))
	words = [w for w in words if w in model and not w in stops]
	return words



# project3D: 
# takes in the trained model, user-defined axis endpoints, and the list of words returned above
# returns a large object where each key is a word (from the text entered by user) and each value is 
# an array containing the x,y,z coordinates for that word 
# 
# example:  {'dark': [0.61010414, 0.46065113, 0.49404886],
#            'despair': [0.61152101, 0.42039439, 0.38471106],
#            'even': [0.51923549, 0.48055968, 0.68398511]}

#
# calculation is done by calculating the scalar projection of the target word vector along the axis
# vector defined by the axis endpoint words (e.g. x-axis vector is defined by xmin and xmax)

# see wikipedia on vector projections for better explanation of math involved

# note: np.asscalar (lines 73-75) converts the number format of vector calculation result into something
# regular python can parse


# def OLDproject3D(model, xmin, xmax, ymin, ymax, zmin, zmax, words, words2 = None):
# 	wordCoordinates={}
# 	wordCoordinates2={}

# 	xminVec, xmaxVec = xmin, xmax
# 	xaxis = xmaxVec - xminVec

# 	yminVec, ymaxVec = ymin, ymax
# 	yaxis = ymaxVec - yminVec

# 	zminVec, zmaxVec = zmin, zmax
# 	zaxis = zmaxVec - zminVec

# 	xdenom = np.dot(xaxis, xaxis)
# 	ydenom = np.dot(yaxis, yaxis)
# 	zdenom = np.dot(zaxis, zaxis)

# 	for word in words:
# 		coords = []
# 		coords.append(np.asscalar(np.dot(model[word] - xminVec, xaxis) / xdenom))
# 		coords.append(np.asscalar(np.dot(model[word] - yminVec, yaxis) / ydenom))
# 		coords.append(np.asscalar(np.dot(model[word] - zminVec, zaxis) / zdenom))
# 		wordCoordinates[word] = coords

# 	if 'words2' in locals() and words2 != None:
# 		for word in words2:
# 			coords = []
# 			coords.append(np.asscalar(np.dot(model[word] - xminVec, xaxis) / xdenom))
# 			coords.append(np.asscalar(np.dot(model[word] - yminVec, yaxis) / ydenom))
# 			coords.append(np.asscalar(np.dot(model[word] - zminVec, zaxis) / zdenom))
# 			wordCoordinates2[word] = coords

# 	return {'text1': wordCoordinates, 'text2': wordCoordinates2}



def project3D(model, xmax, ymax, zmax, words, words2 = None):
    wordCoordinates={}
    wordCoordinates2={}

    for word in words:
        coords = []
        coords.append(np.asscalar(np.dot(model[word], xmax)/np.linalg.norm(xmax)))
        coords.append(np.asscalar(np.dot(model[word], ymax)/np.linalg.norm(ymax)))
        coords.append(np.asscalar(np.dot(model[word], zmax)/np.linalg.norm(zmax)))
        wordCoordinates[word] = coords

    if words2 != None:
        for word in words2:
            coords = []
            coords.append(np.asscalar(np.dot(model[word], xmax)/np.linalg.norm(xmax)))
            coords.append(np.asscalar(np.dot(model[word], ymax)/np.linalg.norm(ymax)))
            coords.append(np.asscalar(np.dot(model[word], zmax)/np.linalg.norm(zmax)))
            wordCoordinates2[word] = coords

    return {'text1': wordCoordinates, 'text2': wordCoordinates2}



# avgWordVec takes in an array of words and finds the average of the vectors for those words
# used so that user can enter a group of related words for axis endpoint labels rather than just 
# one word


def avgWordVec(arrayOfStrings):
    vecs = [news[w] for w in arrayOfStrings if w in news]
    return reduce(lambda sum, word: sum + word, vecs, np.zeros(news.vector_size))/len(vecs)



# uses functions defined above to transform user input into set of words and coordinates
def getPoints(userInputObj):

	textfield = userInputObj['text']
	wordsToPlot = [text_to_words(textfield, news)]

	if 'text2' in userInputObj:
		textfield2 = userInputObj['text2']
		wordsToPlot.append(text_to_words(textfield2, news))

	#xmin = avgWordVec(userInputObj['x'][0])
	xmax = avgWordVec(userInputObj['x'][1])

	#ymin = avgWordVec(userInputObj['y'][0])
	ymax = avgWordVec(userInputObj['y'][1])

	#zmin = avgWordVec(userInputObj['z'][0])
	zmax = avgWordVec(userInputObj['z'][1])

	
	words_with_coords = project3D(news, xmax, ymax, zmax, *wordsToPlot)
	return words_with_coords


# overview of how getPointsFromWords works:

# for a request object with the following structure:  

# for a request object with the following structure:  
# 	{x: [['one','three','five'], ['two','four','six','eight']],
#  	 y: [['another', 'silly', 'pair'], ['of','so','many','words']],
#  	 z: [['third', 'set', 'of'],['words','as','string','to','average']]
#  	 text: 'article entered as string'}


# grab those values, perform vector projections for each WORD in text field, send back (x,y,z)
# coords. for every word.  








