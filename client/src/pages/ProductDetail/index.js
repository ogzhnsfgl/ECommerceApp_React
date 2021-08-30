import React from "react";

import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../api";

import { Box, Text, Button, Flex } from "@chakra-ui/react";
import moment from "moment";
import ImageGallery from "react-image-gallery";

import { useBasket } from "../../context/BasketContext";

function ProductDetail() {
  const { product_id } = useParams();
  const { addToBasket, items } = useBasket();

  const { isLoading, error, data } = useQuery(["product", product_id], () =>
    fetchProduct(product_id)
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const images = data.photos.map((url) => ({ original: url }));

  const findBasketItem = items.find((item) => item._id === product_id);

  return (
    <Flex justifyContent="space-around" alignItems="center" height="100vh">
      <Box margin="10px" width="700px">
        <ImageGallery items={images} useTranslate3D></ImageGallery>
      </Box>
      <Box width="40%">
        <Text as="h2" fontSize="3xl" fontWeight="bold" my={2}>
          {data.title}
        </Text>
        <Text my={2}>
          <small>
            Created At:{moment(data.createdAt).format("DD/MM/YYYY")}
          </small>
        </Text>
        <Box border="1px solid pink" p={2}>
          <Text my={2}>Item description:</Text>
          <Text my={2}>{data.description}</Text>
        </Box>
        <Button
          colorScheme={findBasketItem ? "red" : "pink"}
          onClick={() => addToBasket(data, findBasketItem)}
          mt={3}
          variant="outline"
        >
          {findBasketItem ? "Remove from basket" : "Add to Basket"}
        </Button>
      </Box>
    </Flex>
  );
}

export default ProductDetail;
