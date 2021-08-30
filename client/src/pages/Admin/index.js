import React from "react";

import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import { Stack, Button, Flex, Box } from "@chakra-ui/react";
import Home from "./Home";
import Products from "./Products";
import Orders from "./Orders";
import ProductDetail from "./ProductDetail";
import newProduct from "./Products/new";

const Admin = () => {
  const { path, url } = useRouteMatch();

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <Stack
        direction={["column", "row"]}
        spacing="24px"
        d="flex"
        justifyContent="center"
        w="100%"
      >
        <Link to={url}>
          <Button bg="orange.200">Home</Button>
        </Link>
        <Link to={`${url}/orders`}>
          <Button bg="orange.200">Orders</Button>
        </Link>
        <Link to={`${url}/products`}>
          <Button bg="orange.200">Products</Button>
        </Link>
      </Stack>

      <Box mt={10}>
        <Switch>
          <Route exact path={path} component={Home} />
          <Route path={`${path}/orders`} component={Orders} />
          <Route exact path={`${path}/products/`} component={Products} />
          <Route exact path={`${path}/products/new`} component={newProduct} />
          <Route
            path={`${path}/products/:product_id`}
            component={ProductDetail}
          />
        </Switch>
      </Box>
    </Flex>
  );
};

export default Admin;
