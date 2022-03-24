import React from "react";
import { Grid } from "@material-ui/core";
import Product from "./product/Product";
import useStyles from "./styles";

const products = [
  {
    id: 1,
    name: "shoes",
    description: "running Shoes",
    price: "$1",
    image:
      "https://www.rei.com/dam/content_team_010818_52427_htc_running_shoes_hero2_lg.jpg",
  },
  {
    id: 2,
    name: "macbook",
    description: "computer",
    price: "$10",
    image:
      "https://www.mobigyaan.com/wp-content/uploads/2020/03/Apple-Macbook-Air-2020-1.jpg",
  },
];

const Products = () => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
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
