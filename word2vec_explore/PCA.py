from flask import Response
import numpy as np
import json
import pandas as pd
from bs4 import BeautifulSoup
import re
from nltk.corpus import stopwords
from gensim.models import word2vec
from sklearn.decomposition import PCA

# function main takes in the request object (sent from the frontend via the express server) and calls
# the other functions in this file to eventually return the processed text data

def main(request):
	print 'Performing PCA...'
	userInput = request.json['input']
	textwords = text_to_words(userInput['text'], news)
	textvecs = getWordVecs(textwords, news)
	result = pcaTransform(textwords, textvecs, news)

	return Response(json.dumps(result), content_type='application/json')

# takes in a long text string, removes markup, removes non-alphanumeric characters, splits into words
# eliminates stopwords ("a", "and", "the", etc.) and words not in model (to avoid errors)
def text_to_words(textfield, model):
 textblock = BeautifulSoup(textfield, 'html.parser').get_text()
 textblock = re.sub("[^a-zA-Z]", " ", textblock)
 words = textblock.lower().split()
 stops = set(stopwords.words("english"))
 words = [w for w in words if w in model and not w in stops]
 return words


# turns a list of words into a list of 300-dimensional vectors per the GoogleNews-trained word2vec model
def getWordVecs(words, model):
 wvecs = []
 for word in words:
 	wvecs.append(model[word])
 return wvecs

# takes the list of 300d vectors and uses principal component analysis to reduce it to 3 dimensions
# organized along axes of greatest variation

def pcaTransform(words, wvecs, model):
	axis1 = []
	axis2 = []
	axis3 = []

	wvecsArray = np.asarray(wvecs)   			# turns vector list into math-appropriate array
	pca = PCA(n_components=3)					# defines the PCA to return 3 components
	wvecs3d = pca.fit_transform(wvecsArray)		# calls the PCA on our text (now an ndarray)

	w = {}
	for i in range(0, len(wvecs3d) - 1):
		w[words[i]] = wvecs3d[i].tolist()



	for item in model.most_similar([pca.components_[0]]):     #finds the words that correspond most
		axis1.append(item[0])								  #closely to the axes of the 3 principal
	for item in model.most_similar([pca.components_[1]]):	  #components
		axis2.append(item[0])
	for item in model.most_similar([pca.components_[2]]):
		axis3.append(item[0])

	axis1 = axis1[0:3]
	axis2 = axis2[0:3]
	axis3 = axis3[0:3]

	textData = {'words': {'text1': w}, 'axis1': axis1, 'axis2': axis2, 'axis3': axis3}
	return textData











