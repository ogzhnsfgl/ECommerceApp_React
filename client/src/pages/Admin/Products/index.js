import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchProductList, deleteProduct } from "../../../api";
import { Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { Popconfirm, message } from "antd";

const Products = () => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(
    "admin:products",
    fetchProductList
  );

  const deleteMutation = useMutation(deleteProduct, {
    onSuccess: () => queryClient.invalidateQueries("admin:products"),
  });

  const columns = useMemo(() => {
    return [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
      },
      {
        title: "Action",
        key: "createdAt",
        render: (text, record) => (
          <>
            <Link to={`/admin/products/${record._id}`}>
              <Button size="xs" colorScheme="orange" marginRight="2">
                Edit
              </Button>
            </Link>
            <Button size="xs" colorScheme="red">
              <Popconfirm
                title="Are you sure to delete this product?"
                onConfirm={() => {
                  deleteMutation.mutate(record._id, {
                    onSuccess: () => {
                      message.success("Product deleted!");
                    },
                  });
                }}
                onCancel={() => {}}
                okText="Yes"
                cancelText="No"
              >
                <a href="/#">Delete</a>
              </Popconfirm>
            </Button>
          </>
        ),
      },
    ];
  });

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

  console.log(data);

  return (
    <Flex
      justifyContent="center"
      alignContent="center"
      flexDirection="column"
      width="100%"
      textAlign="center"
    >
      <Flex justifyContent="space-around" alignItems="center">
        <Text fontSize="22">Products</Text>
        <Link to="/admin/products/new">
          <Button alignSelf="flex-end" colorScheme="orange" variant="outline">
            New Product
          </Button>
        </Link>
      </Flex>
      <Table dataSource={data} columns={columns} rowKey="_id" size="large" />
    </Flex>
  );
};

export default Products;
