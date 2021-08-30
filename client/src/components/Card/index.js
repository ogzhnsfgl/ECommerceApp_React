import { Box, Button, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import moment from "moment";
import React from "react";
import { useBasket } from "../../context/BasketContext";

function Card({ item }) {
  const { addToBasket, items } = useBasket();
  const findBasketItem = items.find(
    (basket_item) => basket_item._id === item._id
  );

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="3px">
      <Link to={`product/${item._id}`}>
        <Image
          w="100%"
          height="350px"
          minHeight="180px"
          objectFit="cover"
          src={item.photos[0]}
          alt="product"
          loading="lazy"
        />

        <Box p="6px">
          <Box d="flex" alignItems="baseline">
            {" "}
            <small>{moment(item.createdAt).format("DD/MM/YYYY")}</small>
          </Box>
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tall">
            {item.title}
          </Box>
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tall">
            {item.decription}
          </Box>
          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tall">
            {item.price}
          </Box>
        </Box>
      </Link>
      <Button
        onClick={() => addToBasket(item, findBasketItem)}
        colorScheme={findBasketItem ? "red" : "pink"}
        w="100%"
      >
        {findBasketItem ? "Remove from basket" : "Add to basket"}
      </Button>
    </Box>
  );
}

export default Card;
