import React, { Component } from "react";
import axios from "axios";
import { Modal} from "antd";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      visible: false,
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:3001/products')
      .then((res) => {
        this.setState({products:res.data})
      })


  }

  info(data) {
    Modal.info({
      title: "Product Detail",
      content: (
        <div>
          <img className="small" src={data.image} alt={data.name} />
          <p>{data.name}</p>
          <p>{data.detail}</p>
        </div>
      ),
      onOk() {},
    });
  }

  render() {
    const { onAdd } = this.props
    console.log(onAdd)
        return (
      <main className="block">
        <h2>Products</h2>
        <div
          className="row"
          style={{ display: "flex", flexWrap: "wrap", width: "1000px" }}
        >
          {this.state.products && this.state.products.map((product) => (
            <div className="col-3" style={{ width: "300px" }}>
            <img className="small" src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <div>Rp{product.price}</div>
            <div>
              <button onClick={() => this.info(product) }>Detail</button>
              <button onClick={() => onAdd(product)}>Add To Cart</button>
            </div>
          </div>
          ))}
        </div>
      </main>
    );
  }
}
