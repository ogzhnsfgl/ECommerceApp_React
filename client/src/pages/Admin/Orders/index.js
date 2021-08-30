import React from "react";
import { useQuery } from "react-query";
import { fetchOrders } from "../../../api";
import {
  Flex,
  Spinner,
  Alert,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Tfoot,
  Text,
} from "@chakra-ui/react";
import moment from "moment";

const Orders = () => {
  const { isLoading, error, data } = useQuery("admin:orders", () =>
    fetchOrders()
  );

  if (isLoading)
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner
          thickness="4px"
          speed=".65s"
          emptyColor="gray.200"
          size="xl"
          color="pink.500"
        ></Spinner>
      </Flex>
    );

  if (error) return "An error has occurred: " + error.message;
  return (
    <Flex justifyContent="center" alignContent="center" flexDirection="column">
      {data.length < 1 && (
        <Alert status="warning">There is not any order.</Alert>
      )}

      {data.length > 0 && (
        <Table w="100%" variant="striped" colorScheme="blackAlpha">
          <TableCaption placement="top">
            <Text fontSize="2xl">Orders</Text>
          </TableCaption>
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Order Date</Th>
              <Th>User</Th>
              <Th>Address</Th>
              <Th isNumeric>Items Qty</Th>
              <Th isNumeric>Total Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((data, key) => (
              <Tr key={key}>
                <Td>{key + 1}</Td>
                <Td>{moment(data.createdAt).format("DD-MM-YYYY HH:mm")}</Td>
                <Td>
                  {data.user.email}-<small>({data.user._id})</small>
                </Td>
                <Td>{data.adress}</Td>
                <Td isNumeric>{data.items.length}</Td>
                <Td isNumeric>
                  {data.items.reduce((acc, obj) => obj.price + acc, 0)}
                </Td>
                <Td>
                  {/* <Button
                    marginLeft="3"
                    colorScheme="red"
                    size="xs"
                    onClick={() => {
                      removeFromBasket(item._id);
                    }}
                  >
                    X
                  </Button> */}
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Total Order: {data.length}</Th>
              <Th isNumeric>
                <Text fontSize="md"></Text>
              </Th>
              <Th></Th>
              <Th></Th>

              <Th>
                {/* <Button size="sm" colorScheme="green" onClick={onOpen}>
                  Order
                </Button> */}
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      )}
    </Flex>
  );
};

export default Orders;
