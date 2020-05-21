import React, { Component, Fragment } from 'react';
import axios from "axios";
//import Product from './Product';

// userquery is used to display the database items to viewable format
import Userquery from './Userquery';

const config = require('../config.json');

export default class ContactUsUpdate extends Component {

  state = {
    newproduct: {
        "email_id": "",
      "user_name": "", 
      "user_query": ""
    },
    products: []
  }
/*
  handleAddProduct = async (email_id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway add product endpoint here
    try {
      const params = {
        "email_id": email_id,
        "user_name": this.state.newproduct.user_name,
        "user_query":this.state.newproduct.user_query
      };
      await axios.post(`${config.api.invokeUrl}/contactus/${email_id}`, params);
      this.setState({ products: [...this.state.products, this.state.newproduct] });
      this.setState({ newproduct: { "email_id":"", "user_name": "", "user_query": "" }});
     console.log("Thanks for your Query");
    }catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }
*/
  handleUpdateProduct = async (email_id, user_name, user_query) => {
    // add call to AWS API Gateway update product endpoint here
    try {
      const params = {
        "email_id": email_id,
        "user_name": user_name,
        "user_query": user_query
      };
      //console.log("sending patch request");
      //console.log(email_id);
      await axios.patch(`${config.api.invokeUrl}/contactus/${email_id}`, params);
      //console.log("declaring const variable");

      const productToUpdate = [...this.state.products].find(product => product.email_id === email_id);
      const updatedProducts = [...this.state.products].filter(product => product.email_id !== email_id);
      productToUpdate.user_name = user_name;
     // console.log(user_name);
      productToUpdate.user_query = user_query;
      updatedProducts.push(productToUpdate);
      this.setState({products: updatedProducts});
    }catch (err) {
      console.log(`Error updating product: ${err}`);
    }
  }

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

fetchProducts = async () => {
    // add call to AWS API Gateway to fetch products here
    // then set them in state
    try {
      const res = await axios.get(`${config.api.invokeUrl}/contactus`);
      //const products = res.data;
      this.setState({ products: res.data });
      //console.log(this.state.products.length);
    } catch (error) {
      console.log(`An error has occurred: ${error}`);
    }
  }


  onAddProductNameChange = event => this.setState({ newproduct: { ...this.state.newproduct, "user_name": event.target.value } });
  onAddProductIdChange = event => this.setState({ newproduct: { ...this.state.newproduct, "email_id": event.target.value } });
  onAddProductQueryChange = event => this.setState({ newproduct: { ...this.state.newproduct, "user_query": event.target.value } });

  componentDidMount = () => {
    this.fetchProducts();
  }


  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Contact Us Update</h1>
            <p className="subtitle is-5">Open Queries:</p>
            <br />
            
            
            <div className="columns">
              <div className="column is-one-third">
                {/*
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
                */}
              </div>
              

              <div className="column is-two-thirds">
                <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">
                    { 
                      this.state.products.map((product, index) => 
                        <Userquery 
                          isAdmin={true}
                          handleUpdateProduct={this.handleUpdateProduct}
                          //handleDeleteProduct={this.handleDeleteProduct} 
                          user_name={product.user_name} 
                          user_query={product.user_query}
                          email_id={product.email_id}
                         key={product.email_id}
                        />)
                    }
                  </div>
                </div>
              </div>

              </div>
          </div>
        </section>
      </Fragment>
    )
  }
}
