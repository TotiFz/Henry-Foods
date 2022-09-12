import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/index';
import landing from './components/LandingPage/LandingPage';
import details from './components/Details/index';
import Create from './components/CreateRecipe/index';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path= '/' component = {landing}/>
          <Route path='/'>
          <NavBar/>
          <Route path= '/home' component = {Home}/>
          <Route exact path= '/recipe/:id' component = {details}/>
          <Route exact path= '/create' component = {Create}/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
