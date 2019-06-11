import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';

import NavBar from './App/Shared/NavBar/NavBar';
import Login from './App/Components/Login/Login';
import Home from "./App/Components/Home/Home";
import Music from './App/Components/Music/Music';
import ContactList from './App/Components/Contacts/ContactList.js';
import Profile from './App/Components/Profile/Profile.js';
import PhotoInfo from './App/Components/Photo/PhotoInfo';
import SearchContacts from './App/Components/SearchContacts/SearchContacts';


const App = () =>(
            
            <div>
                <BrowserRouter>
                <div>
                        <Route exact path ="/" component={Login} />
                        <Route exact path ="/home" component={Home} />
                        <Route exact path ="/contacts/:name" component={SearchContacts} />
                        <Route exact path ="/contacts" component={ContactList} />
                        <Route exact path ="/music" component={Music}/>
                        <Route exact path ="/music/:userId" component={Music} />
                        <Route exact path ="/profile/:id" component={Profile} />
                        <Route exact path = "/profile" component = {Profile} />
                        <Route exact path = "/photo/:photoId" component = {PhotoInfo} />
                </div>
                </BrowserRouter>
            </div>
                
               
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

