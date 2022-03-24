import React from "react";
import { Grid } from "@material-ui/core";
import Product from "./product/Product";
const products = [
  {
    id: 1,
    name: "Shoes",
    description: "Running Shoes",
    price: "$100",
    image:
      "https://s7d4.scene7.com/is/image/WolverineWorldWide/S20688-45_1?wid=826&hei=685&resMode=bilin&op_usm=0.5,1.0,8,0&iccEmbed=0&printRes=72",
  },
  {
    id: 2,
    name: "Macbook",
    description: "Macbook",
    price: "$500",
    image:
      "https://www.bhphotovideo.com/cdn-cgi/image/format=auto,fit=scale-down,width=500,quality=95/https://www.bhphotovideo.com/images/images500x500/apple_mbp_14_sg_04_14_2_macbook_pro_with_1634580931_1668205.jpg",
  },
];

const Products = () => {
  return (
    <main>
      <Grid container justifyContent="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
