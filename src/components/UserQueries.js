import React, { Component, Fragment } from 'react';
import Userquery from './Userquery';
//import Product from './Product';

import axios from "axios";
const config = require('../config.json');

export default class UserQueries extends Component {

  state = {
    newproduct: null,
     products: []
  }

  fetchProducts = async () => {
    // add call to AWS API Gateway to fetch products here
    // then set them in state
    try {
      const res = await axios.get(`${config.api.invokeUrl}/contactus`);
      //const products = res.data;
      this.setState({ products: res.data });
      const now=new Date();
      console.log(now);
    } catch (error) {
      console.log(`An error has occurred: ${error}`);
    }
  }

  componentDidMount = () => {
    this.fetchProducts();
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>User Queries</h1>

            <p className="subtitle is-5">Open User Queries :</p>
            <br />
            <div className="columns">
              <div className="column">

                <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">
                    { 
                      this.state.products && this.state.products.length > 0
                      ? this.state.products.map(product => <Userquery user_query= {product.user_query} user_name={product.user_name} email_id={product.email_id} key={product.email_id} />)
                      : <div className="tile notification is-warning">No Open User Queries</div>
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
