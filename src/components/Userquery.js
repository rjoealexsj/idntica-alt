// not needed for this project - new updated one is userquerynew.js

import React, { Component, Fragment }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class ContactUsUpdate extends Component {

  state = {
    isEditMode: false,
    updatedname: this.props.user_name,
    updatedquery: this.props.user_query
  }

  handleProductEdit = event => {
    event.preventDefault();
    this.setState({ isEditMode: true });
  }

  handleEditSave = event => {
    event.preventDefault();
    this.setState({ isEditMode: false });
    this.props.handleUpdateProduct(this.props.email_id, this.state.updatedname, this.state.updatedquery);
  }

  onAddProductNameChange = event => this.setState({ "updatedname": event.target.value });
  onAddProductQueryChange = event => this.setState({ "updatedquery": event.target.value });

  render() {
    return (
      <div className="tile is-child box notification is-success">
        {
          this.props.isAdmin && 
          <Fragment>
            <a href="/" onClick={this.handleProductEdit} className="product-edit-icon">
              <FontAwesomeIcon icon="edit" />
            </a>
            <button onClick={event => this.props.handleDeleteProduct(this.props.email_id, event)} className="delete"></button>
          </Fragment>
        }
        {
          this.state.isEditMode 
          ? <div>
              <p>Update User name</p>
              <input 
                className="input is-medium"
                type="text" 
                placeholder="Update name"
                value={this.state.updatedname}
                onChange={this.onAddProductNameChange}
              />

              <p>Update Query</p>
              <input 
                className="input is-medium"
                type="text" 
                placeholder="Update Query"
                value={this.state.updatedquery}
                onChange={this.onAddProductQueryChange}
              />

              <p className="product-id">id: { this.props.email_id }</p>
              <button type="submit" 
                className="button is-info is-small"
                onClick={ this.handleEditSave }
              >save</button>
            </div>
          : <div>
              <p className="product-title">User Name: {this.props.user_name }</p>
              <p className="product-id">Email ID:{ this.props.email_id }</p>
              
              <p className="product-id">Query: { this.props.user_query }</p>
            </div>
        }
      </div>
    )
  }
}
