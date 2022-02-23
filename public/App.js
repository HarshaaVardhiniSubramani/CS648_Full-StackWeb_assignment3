const cNode = document.getElementById('contents');

function ProductTable(props) {
  const productRows = props.products.map(product => /*#__PURE__*/React.createElement(ProductRow, {
    key: product.id,
    product: product
  }));
  const borderedStyle = {
    border: "1px solid black",
    padding: 6
  };
  return /*#__PURE__*/React.createElement("table", {
    style: {
      borderCollapse: "collapse"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: borderedStyle
  }, "Name"), /*#__PURE__*/React.createElement("th", {
    style: borderedStyle
  }, "Price"), /*#__PURE__*/React.createElement("th", {
    style: borderedStyle
  }, "Category"), /*#__PURE__*/React.createElement("th", {
    style: borderedStyle
  }, "ImageURL"))), /*#__PURE__*/React.createElement("tbody", null, productRows));
}

class ProductAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.productAdd;
    const product = {
      name: form.name.value,
      price: form.price.value,
      category: form.category.value,
      imageURL: form.imageURL.value
    };
    this.props.createProduct(product);
    form.name.value = "";
    form.price.value = "";
    form.category.value = "";
    form.imageURL.value = "";
  }

  render() {
    return /*#__PURE__*/React.createElement("form", {
      name: "productAdd",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h2", null, "Add a new product to inventory"), /*#__PURE__*/React.createElement("div", null, "Name", /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "name"
    })), /*#__PURE__*/React.createElement("div", null, "Price", /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "price"
    })), /*#__PURE__*/React.createElement("div", null, "Category", /*#__PURE__*/React.createElement("select", {
      id: "list",
      name: "category"
    }, /*#__PURE__*/React.createElement("option", {
      value: "Shirts"
    }, "Shirts"), /*#__PURE__*/React.createElement("option", {
      value: "Jeans"
    }, "Jeans"), /*#__PURE__*/React.createElement("option", {
      value: "Jackets"
    }, "Jackets"), /*#__PURE__*/React.createElement("option", {
      value: "Sweaters"
    }, "Sweaters"), /*#__PURE__*/React.createElement("option", {
      value: "Accessories"
    }, "Accessories"))), /*#__PURE__*/React.createElement("div", null, "Image URL", /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "imageURL"
    }))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("button", null, "Add Product")));
  }

}

function ProductRow(props) {
  const borderedStyle = {
    border: "1px solid black",
    padding: 4
  };
  const product = props.product;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: borderedStyle
  }, product.name), /*#__PURE__*/React.createElement("td", {
    style: borderedStyle
  }, "$", product.price), /*#__PURE__*/React.createElement("td", {
    style: borderedStyle
  }, product.category), /*#__PURE__*/React.createElement("td", {
    style: borderedStyle
  }, /*#__PURE__*/React.createElement("a", {
    href: product.imageURL,
    target: "_blank"
  }, "View")));
}

class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
    this.createProduct = this.createProduct.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
        productlist {
          id
          name
          price
          category
          imageURL
        }
      }`;
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    });
    const body = await response.text();
    const result = JSON.parse(body);
    this.setState({
      products: result.data.productlist
    });
  }

  async createProduct(product) {
    const query = `mutation addprod($product: productInput!) {
            addprod(product: $product) {
                id
            }
          }`;
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables: {
          product
        }
      })
    });
    this.loadData();
  }

  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "My Company Inventory"), /*#__PURE__*/React.createElement("h2", null, "Showing all available products "), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(ProductTable, {
      products: this.state.products
    }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(ProductAdd, {
      createProduct: this.createProduct
    }));
  }

}

ReactDOM.render( /*#__PURE__*/React.createElement(ProductList, null), cNode);