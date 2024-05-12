import './App.css';
import React, { useState } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const pageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState('');
  const history = useHistory();

  const handleRouteChange = () => {
    // Reset the searchKeyword state when navigating to a different route
    setSearchKeyword('');
  };

  return (
    <div>
      <Router>
        <NavBar setSearchKeyword={setSearchKeyword} />
        <LoadingBar height={3} color='#f11946' progress={progress} />
        <Switch>
          <Route exact path="/">
            <News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" searchKeyword={searchKeyword} />
          </Route>
          <Route exact path="/business">
            <News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business" searchKeyword={searchKeyword} />
          </Route>
          <Route exact path="/entertainment">
            <News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment" searchKeyword={searchKeyword} />
          </Route>
          <Route exact path="/general">
            <News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" searchKeyword={searchKeyword} />
          </Route>
          <Route exact path="/health">
            <News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health" searchKeyword={searchKeyword} />
          </Route>
          <Route exact path="/science">
            <News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science" searchKeyword={searchKeyword} />
          </Route>
          <Route exact path="/sports">
            <News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports" searchKeyword={searchKeyword} />
          </Route>
          <Route exact path="/technology">
            <News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology" searchKeyword={searchKeyword} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
