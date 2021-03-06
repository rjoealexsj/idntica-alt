import React, { Component } from 'react';
import { Auth } from 'aws-amplify';


export default class Navbar extends Component {
  //handle logout
  handleLogOut = async event => {
    event.preventDefault();
    try{
      Auth.signOut();
      this.props.auth.setAuthStatus(false);
      this.props.auth.setUser(null);
      console.log(this);
      //Add home page redirection command
    }catch(error){
      console.log(error.message);
    }
  }

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src="logoidntica1.png" width="112" height="28" alt="Idntica logo" />
          </a>
        </div>


        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
          {!this.props.auth.isAuthenticated && (
            <div className="navbar-item">
            <a href="/" className="navbar-item">
              Home
            </a>
            <a href="/contactus" className="navbar-item">
                  ContactUs
          </a>
          <a href="/contactusnew" className="navbar-item">
                  ContactUsNew
          </a>
          <a href="/contactusupdate" className="navbar-item">
                  ContactUsUpdate
          </a> 
          <a href="/contactusupdatenew" className="navbar-item">
                  ContactUsUpdateNew
          </a> 
          <a href="/userqueries" className="navbar-item">
                  UserQueries
          </a>

          <a href="/userqueriesnew" className="navbar-item">
                  UserQueriesNew
          </a>
          
            </div>
          )}
          {this.props.auth.isAuthenticated && (
          <div className="navbar-item">
          <a href="/" className="navbar-item">
              Home
          </a>  
          <a href="/products" className="navbar-item">
                  Products
          </a> 
          <a href="/admin" className="navbar-item">
                Admin
          </a> 
          </div>  
          )}
        </div>


          <div className="navbar-end">
            <div className="navbar-item">
              {this.props.auth.isAuthenticated && this.props.auth.user && (
                <p>
                  Hello {this.props.auth.user.username}
                </p>
              )}
              <div className="buttons">
                {!this.props.auth.isAuthenticated && (
                  <div>
                  <a href="/register" className="button is-primary">
                  <strong>Register</strong>
                  </a>
                  <a href="/login" className="button is-light">
                    Log in
                  </a>  
                  </div>  
                )}
                {this.props.auth.isAuthenticated && (
                  <a href="/" onClick={this.handleLogOut} className="button is-light">
                    Log Out
                  </a>  
                )}
                
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
