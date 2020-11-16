import { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web'

import NewsCards from './components/NewsCards/NewsCards';

import './App.css';

const alanKey = '4a1bded9861c4658b20ce269679007fa2e956eca572e1d8b807a3e2338fdd0dc/stage';

function App() {
  const [newsArticles, setNewsArticles] = useState([]);

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles }) => {
        if(command === 'newHeadlines') {
          setNewsArticles(articles)
        }
      }
    })
  }, []);

  return (
    <div className="App">
      <NewsCards articles={newsArticles} />
    </div>
  );
}

export default App;
