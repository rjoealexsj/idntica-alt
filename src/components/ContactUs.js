import React, { Component, Fragment } from 'react';
import axios from "axios";
//import UserQuery from './UserQuery';

const config = require('../config.json');

export default class ContactUs extends Component {

  state = {
    newproduct: { 
        "email_id": "",
      "name": "", 
      "query": ""
    },
    products: []
  }

  handleAddProduct = async (email_id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway add product endpoint here
    try {
      const params = {
        "email_id": email_id,
        "name": this.state.newproduct.name,
        "query":this.state.newproduct.query
      };
      await axios.post(`${config.api.invokeUrl}/contactus/${email_id}`, params);
      this.setState({ products: [...this.state.products, this.state.newproduct] });
      this.setState({ newproduct: { "email_id":"", "name": "", "query": "" }});
      postMessage("Thnaks for your Query");
    }catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }
/*
  handleUpdateProduct = async (id, name) => {
    // add call to AWS API Gateway update product endpoint here
    try {
      const params = {
        "id": id,
        "productname": name
      };
      await axios.patch(`${config.api.invokeUrl}/products/${id}`, params);
      const productToUpdate = [...this.state.products].find(product => product.id === id);
      const updatedProducts = [...this.state.products].filter(product => product.id !== id);
      productToUpdate.productname = name;
      updatedProducts.push(productToUpdate);
      this.setState({products: updatedProducts});
    }catch (err) {
      console.log(`Error updating product: ${err}`);
    }
  }
*/
/*
  handleDeleteProduct = async (id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway delete product endpoint here
    try {
      await axios.delete(`${config.api.invokeUrl}/products/${id}`);
      const updatedProducts = [...this.state.products].filter(product => product.id !== id);
      this.setState({products: updatedProducts});
    }catch (err) {
      console.log(`Unable to delete product: ${err}`);
    }
  }
*/
/*
  fetchProducts = async () => {
    // add call to AWS API Gateway to fetch products here
    // then set them in state
    try {
      const res = await axios.get(`${config.api.invokeUrl}/contactus`);
      const products = res.data;
      this.setState({ products: products });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }
*/
  onAddProductNameChange = event => this.setState({ newproduct: { ...this.state.newproduct, "name": event.target.value } });
  onAddProductIdChange = event => this.setState({ newproduct: { ...this.state.newproduct, "email_id": event.target.value } });
  onAddProductQueryChange = event => this.setState({ newproduct: { ...this.state.newproduct, "query": event.target.value } });
/*
  componentDidMount = () => {
    this.fetchProducts();
  }
*/
  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Contact Us</h1>
            <p className="subtitle is-5">Enter your Query and Contact details below:</p>
            <br />
            <div className="columns">
              <div className="column is-one-third">
                <form onSubmit={event => this.handleAddProduct(this.state.newproduct.email_id, event)}>
                  <div className="field has-addons">
                    <div className="control">
                      <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Enter name"
                        value={this.state.newproduct.name}
                        onChange={this.onAddProductNameChange}
                      />
                    </div>
                    <div className="control">
                      <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Enter Email Address"
                        value={this.state.newproduct.email_id}
                        onChange={this.onAddProductIdChange}
                      />
                    </div>
                    <div className="control">
                      <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Query"
                        value={this.state.newproduct.query}
                        onChange={this.onAddProductQueryChange}
                      />
                    </div>
                   
                    <div className="control">
                      <button type="submit" className="button is-primary is-medium">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              

              </div>
          </div>
        </section>
      </Fragment>
    )
  }
}
