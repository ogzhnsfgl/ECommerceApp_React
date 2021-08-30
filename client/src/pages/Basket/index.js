import { useRef, useState } from "react";
import {
  Alert,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Flex,
  Button,
  Tfoot,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  useDisclosure,
  Textarea,
} from "@chakra-ui/react";

import { useBasket } from "../../context/BasketContext";
import { postOrder } from "../../api";

const Basket = ({ history }) => {
  const [address, setAddress] = useState("");
  const { items, removeFromBasket, emptyBasket } = useBasket();

  const total = items.reduce((acc, obj) => acc + obj.price, 0);

  //Modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();

  //Modal Form Submit
  const handleSubmitForm = async () => {
    const itemsIds = items.map((item) => item._id);
    const input = {
      address,
      items: JSON.stringify(itemsIds),
    };

    const response = await postOrder(input);
    emptyBasket();
    onClose();
  };

  return (
    <Flex justifyContent="center" alignContent="center" flexDirection="column">
      {items.length < 1 && (
        <Alert status="warning">You have not any items in your basket!</Alert>
      )}

      {items.length > 0 && (
        <Table variant="simple" w="80%">
          <TableCaption>Your Cart</TableCaption>
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Product Name</Th>
              <Th isNumeric>Price</Th>
              <Th>Remove</Th>
            </Tr>
          </Thead>
          <Tbody>
            {items.map((item, key) => (
              <Tr key={key}>
                <Td>{key + 1}</Td>
                <Td>{item.title}</Td>
                <Td isNumeric>{item.price}</Td>
                <Td>
                  <Button
                    marginLeft="3"
                    colorScheme="red"
                    size="xs"
                    onClick={() => {
                      removeFromBasket(item._id);
                    }}
                  >
                    X
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th></Th>
              <Th>Total Amount:</Th>
              <Th isNumeric>
                <Text fontSize="md">{total}</Text>
              </Th>
              <Th>
                <Button size="sm" colorScheme="green" onClick={onOpen}>
                  Order
                </Button>
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      )}

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Address:</FormLabel>
              <Textarea
                ref={initialRef}
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleSubmitForm}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Basket;
