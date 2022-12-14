/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const {CATEGORIES, PRODUCTS} = require("./data");

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

app.get('/categories', function(req, res) {
  // Fetch products
  res.status(200).json({message: 'categories fetched', data: CATEGORIES});
});

app.get('/products', function(req, res) {
  // Fetch products
  // If search is specified, upload it
  let data = [];
  if (req.params.search) {
    /**
     * Searching is done by displaying the items that match the search query by name
     * Then we display the items that match the search query in description
     *
     */
    const search$ = new RegExp(value, 'ig');

    data = [
      ...PRODUCTS.filter(product => product.name.search(search$) > -1),
      ...PRODUCTS.filter(product => product.description.search(search$) > -1)
    ];
  } else {
    data = PRODUCTS.slice(12);
  }
  res.status(200).json({message: 'Products fetched', data});
});

app.get('/products/:id', function(req, res) {
  // Get product by Id
  const product = PRODUCTS.find(p => p.id === req.params.id);
  // If product was not found, return 404
  if (!product) {
    res.status(404).json({message: 'The product was either deleted or does not exist'});
    return;
  }
  res.status(200).json({message: 'Product fetched', data: product});
});

app.post('/orders', (req, res) => {
  // Add orders,
  const data = req.body;
  // validation
  if (!data) return res.status(400).json({message: 'The order data is required'})
  /**
   * Ideally, we will save this data to a database
   * */
  const order = JSON.stringify(data);

  res.status(201).json({message: 'Order created'});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
