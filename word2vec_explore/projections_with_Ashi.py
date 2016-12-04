import numpy as np
import pandas as pd
from bs4 import BeautifulSoup
import re
from nltk.corpus import stopwords
from gensim.models import word2vec
from sklearn.decomposition import PCA

# loads the pre-trained Google News model

news = word2vec.Word2Vec.load_word2vec_format('bigFiles/GoogleNews-vectors-negative300.bin', binary=True)





# the rest of the code in this file was used in earlier versions of the application and 
# testing out the functionality of the Google News model and word2vec -- it is NOT used in the 
# finalized app


# takes in a long text string, removes markup, removes non-alphanumeric characters, splits into words
# eliminates stopwords ("a", "and", "the", etc.) and words not in model (to avoid errors)
def text_to_words(textfield, model):
    textblock = BeautifulSoup(textfield, 'html.parser').get_text()
    textblock = re.sub("[^a-zA-Z]", " ", textblock)
    words = textblock.lower().split()
    stops = set(stopwords.words("english"))
    words = [w for w in words if w in model and not w in stops]
    return words


def project3D(model, xmax, ymax, zmax, words, words2 = None):
    wordCoordinates={}
    wordCoordinates2={}

    for word in words:
        coords = []
        coords.append(np.asscalar(np.linalg.norm(np.subtract(model[word], xmax))))
        coords.append(np.asscalar(np.linalg.norm(np.subtract(model[word], ymax))))
        coords.append(np.asscalar(np.linalg.norm(np.subtract(model[word], zmax))))
        # coords.append(np.asscalar(np.dot(model[word], xmax)/np.linalg.norm(xmax)))
        # coords.append(np.asscalar(np.dot(model[word], ymax)/np.linalg.norm(ymax)))
        # coords.append(np.asscalar(np.dot(model[word], zmax)/np.linalg.norm(zmax)))
        wordCoordinates[word] = coords

    if words2 != None:
        for word in words2:
            coords = []
            coords.append(np.asscalar(np.linalg.norm(np.subtract(model[word], xmax))))
            coords.append(np.asscalar(np.linalg.norm(np.subtract(model[word], ymax))))
            coords.append(np.asscalar(np.linalg.norm(np.subtract(model[word], zmax))))
            # coords.append(np.asscalar(np.dot(model[word], xmax)/np.linalg.norm(xmax)))
            # coords.append(np.asscalar(np.dot(model[word], ymax)/np.linalg.norm(ymax)))
            # coords.append(np.asscalar(np.dot(model[word], zmax)/np.linalg.norm(zmax)))
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

    xmax = avgWordVec(userInputObj['x'][0])
    ymax = avgWordVec(userInputObj['y'][0])
    zmax = avgWordVec(userInputObj['z'][0])

    
    words_with_coords = project3D(news, xmax, ymax, zmax, *wordsToPlot)
    return words_with_coords


# overview of how getPointsFromWords works:

# for a request object with the following structure:  

# for a request object with the following structure:  
#   {x: ['one','three','five'],
#    y: ['another', 'silly', 'pair'], 
#    z: ['third', 'set', 'of'],
#    text: 'article entered as string',
#    text2: 'might exist as another string, might be blank'}


# grab those values, perform vector projections for each WORD in text field, send back (x,y,z)
# coords. for every word.  








