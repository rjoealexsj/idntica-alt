import React, { Component, Fragment }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class ContactusupdateNew extends Component {

  state = {
    isEditMode: false,
    updatedname: this.props.query_followup,
    updatedquery: this.props.query_status
  }

  handleProductEdit = event => {
    event.preventDefault();
    this.setState({ isEditMode: true });
  }

  handleEditSave = event => {
    event.preventDefault();
    this.setState({ isEditMode: false });
    this.props.handleUpdateProduct(this.props.query_id, this.state.updatedname, this.state.updatedquery);
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
              <p>Enter Follow up Comments</p>
              <input 
                className="input is-medium"
                type="text" 
                placeholder="Update name"
                value={this.state.updatedname}
                onChange={this.onAddProductNameChange}
              />

              <p>Enter Status</p>
              <input 
                className="input is-medium"
                type="text" 
                placeholder="Update Query"
                value={this.state.updatedquery}
                onChange={this.onAddProductQueryChange}
              />

              <p className="product-id">id: { this.props.query_id }</p>
              <button type="submit" 
                className="button is-info is-small"
                onClick={ this.handleEditSave }
              >save</button>
            </div>
          : <div>
              <p className="product-title">User Name: {this.props.query_name }</p>
              <p className="product-id">Email ID:{ this.props.query_email}</p>
              
              <p className="product-id">Query: { this.props.query_id }</p>
            </div>
        }
      </div>
    )
  }
}
