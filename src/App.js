import './App.css';
import React, { useState } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import Footer from './components/Footer';

const App = () => {
  const pageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState('');
  const history = useHistory();
  const [country, setCountry] = useState('in');

  const handleRouteChange = () => {
    // Reset the searchKeyword state when navigating to a different route
    setSearchKeyword('');
  };

  return (
    <>
    <div>
      <Router>
        <NavBar setSearchKeyword={setSearchKeyword} setCountry={setCountry}/>
        <LoadingBar height={3} color='#f11946' progress={progress} />
        
        <Switch>
          <Route exact path="/">
            <News setProgress={setProgress} apiKey={apiKey} key={"general"} pageSize={pageSize} country={country} category="general" searchKeyword={searchKeyword} />
          </Route>
          <Route exact path="/business">
            <News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country={country} category="business" searchKeyword={searchKeyword} />
          </Route>
          <Route exact path="/entertainment">
            <News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country={country} category="entertainment" searchKeyword={searchKeyword} />
          </Route>
          <Route exact path="/general">
            <News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country={country} category="general" searchKeyword={searchKeyword} />
          </Route>
          <Route exact path="/health">
            <News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country={country} category="health" searchKeyword={searchKeyword} />
          </Route>
          <Route exact path="/science">
            <News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country={country} category="science" searchKeyword={searchKeyword} />
          </Route>
          <Route exact path="/sports">
            <News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country={country} category="sports" searchKeyword={searchKeyword} />
          </Route>
          <Route exact path="/technology">
            <News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country={country} category="technology" searchKeyword={searchKeyword} />
          </Route>
        </Switch>
        <Footer/>
      </Router>
    </div>
      </>
  );
};

export default App;
