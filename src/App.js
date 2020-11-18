import { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web'

import wordsToNumbers from 'words-to-numbers';

import NewsCards from './components/NewsCards/NewsCards';

import useStyles from './styles.js';
import './App.css';

const alanKey = '4a1bded9861c4658b20ce269679007fa2e956eca572e1d8b807a3e2338fdd0dc/stage';

function App() {
  const classes = useStyles();
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if(command === 'newHeadlines') {
          setNewsArticles(articles)
          setActiveArticle(-1)
        } else if(command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1)
        } else if(command === 'open') {
          const parseNumber = number.length > 2 ? wordsToNumbers(number, {fuzzy: true}) : number;
          const article = articles[parseNumber -1];
          console.log(parseNumber)
          if(parseNumber > 20) {
            alanBtn().playText('Please try that again.');
          } else if(article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          }
        }
      }
    })
  }, []);

  return (
    <div className="App">
      <div className={classes.logoContainer}>
        <img src="https://alan.app/voice/images/previews/preview.jpg" className={classes.alanLogo} alt="alan logo" />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
}

export default App;
