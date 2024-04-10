import React, { useState } from "react";
import { Box, Heading, Text, VStack, HStack, Image, Button, Input, Select, Stat, StatLabel, StatNumber, useToast } from "@chakra-ui/react";
import { FaRocket, FaChartLine, FaCog } from "react-icons/fa";

const Index = () => {
  const [balance, setBalance] = useState(10000);
  const [stock, setStock] = useState("AAPL");
  const [quantity, setQuantity] = useState(0);
  const toast = useToast();

  const placeOrder = () => {
    if (quantity <= 0) {
      toast({
        title: "Invalid Quantity",
        description: "Please enter a valid quantity",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Simulating order placement
    const orderAmount = quantity * 100; // Assuming each stock costs $100
    setBalance(balance - orderAmount);

    toast({
      title: "Order Placed",
      description: `You bought ${quantity} shares of ${stock}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setQuantity(0);
  };

  return (
    <Box p={8}>
      <VStack spacing={8} align="stretch">
        <HStack justify="space-between">
          <Heading size="xl">High Frequency Trading</Heading>
          <Image src="https://images.unsplash.com/photo-1560221328-12fe60f83ab8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxzdG9jayUyMG1hcmtldCUyMGNoYXJ0fGVufDB8fHx8MTcxMjc4MDk1Nnww&ixlib=rb-4.0.3&q=80&w=1080" alt="Stock Market" w={200} />
        </HStack>

        <Text fontSize="xl">Welcome to our high frequency trading platform. Execute trades at lightning speed!</Text>

        <HStack spacing={8}>
          <Stat>
            <StatLabel>Account Balance</StatLabel>
            <StatNumber>${balance.toLocaleString()}</StatNumber>
          </Stat>

          <VStack>
            <Select value={stock} onChange={(e) => setStock(e.target.value)}>
              <option value="AAPL">Apple (AAPL)</option>
              <option value="GOOGL">Google (GOOGL)</option>
              <option value="AMZN">Amazon (AMZN)</option>
              <option value="TSLA">Tesla (TSLA)</option>
            </Select>

            <Input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />

            <Button leftIcon={<FaRocket />} colorScheme="blue" onClick={placeOrder}>
              Place Order
            </Button>
          </VStack>
        </HStack>

        <HStack spacing={8}>
          <Box>
            <FaChartLine size={48} />
            <Text>Real-time Market Data</Text>
          </Box>
          <Box>
            <FaCog size={48} />
            <Text>Advanced Trading Algorithms</Text>
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Index;
