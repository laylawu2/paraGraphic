# paraGraphic[paraGraphic.us](paraGraphic.us)
#### Elaine Chang([ljc391](https://github.com/ljc391)), Tiffany Liu([jiayuliu27](https://github.com/jiayuliu27)), Cara Weber([CaraWeber](https://github.com/CaraWeber)), Layla Wu([laylawu2](https://github.com/laylawu2))

paraGraphic is a visual text analysis tool that renders a 3D model of relationships between words.  Drawing on machine learning and statistical analysis, paraGraphic determines the three ideas that make the most difference to the text, and then plots each word in relation to those ideas.  

paraGraphic is built with React and Redux on the front end in order to centralize information about the state of our app. We created our visualizations with three js, a powerful library for 3D renderings.  Firebase provides an efficient way to store user-generated data, and to update our projects page in real time.  Our back end is written in python to access machine learning and statistical analysis libraries that aren’t available in javascript. We used word2vec to learn about word relationships and PCA for statistical analysis of the results from word2vec.

We designed paraGraphic because we were interested in exploring machine learning in relation to language analysis.  


To analyze your own text, simply locate the input form inside the drawer, and paste your text and title and hit submit.

After a few seconds, you will see the visualization of your text as well as the 3 key ideas from your text represented as x, y, and z axes(information will be in input form).
