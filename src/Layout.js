import {Route , Switch} from 'react-router-dom';
import React from 'react';
import NavBar from './App/Shared/NavBar/NavBar';
import Home from "./App/Components/Home/Home";
import Music from './App/Components/Music/Music';
import ContactList from './App/Components/Contacts/ContactList.js';
import Profile from './App/Components/Profile/Profile.js';
import Photo from './App/Components/Photo/Photo';
import SearchContacts from './App/Components/SearchContacts/SearchContacts';
import ChatBar from './App/Shared/Chat/ChatBar';


const Layout = () => (
    <div>
    <NavBar />
    <ChatBar />
    <div>
        <Switch>
                <Route exact path ="/home" component={Home} />
                        <Route exact path ="/contacts/:name" component={SearchContacts} />
                        <Route exact path ="/contacts" component={ContactList} />
                        <Route exact path ="/music" component={Music}/>
                        <Route exact path ="/music/:userId" component={Music} />
                        <Route exact path ="/profile/:id" component={Profile} />
                        <Route exact path = "/profile" component = {Profile} />
                        <Route exact path = "/photo/:photoId" component = {Photo} />
        </Switch>
    </div>
    </div>
    
                    
);

export default Layout;