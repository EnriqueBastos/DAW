import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route , Switch} from 'react-router-dom';
import Login from './App/Components/Login/Login';
import Layout from './Layout';


        class App extends React.Component{
                render (){
                        return(
                                        <BrowserRouter>
                                                <Switch>
                                                        <Route exact path ="/" component={Login} />
                                                        <Route component ={Layout} />
                                                </Switch>
                                        </BrowserRouter>
                                
                                
                        );
                }
        }
        

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

