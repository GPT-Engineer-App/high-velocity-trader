import React, { useState, useEffect } from "react";
import { Box, Heading, Text, VStack, HStack, Image, Button, Input, Select, Stat, StatLabel, StatNumber, useToast, Radio, RadioGroup } from "@chakra-ui/react";
import { FaRocket, FaChartLine, FaCog } from "react-icons/fa";
import Portfolio from "../components/Portfolio";

const stockPrices = {
  AAPL: 100,
  GOOGL: 200,
  AMZN: 150,
  TSLA: 300,
};

const Index = () => {
  const [balance, setBalance] = useState(10000);
  const [stock, setStock] = useState("AAPL");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(stockPrices[stock]);
  const [orderType, setOrderType] = useState("buy");
  const [portfolio, setPortfolio] = useState({});
  const toast = useToast();

  useEffect(() => {
    const interval = setInterval(updateStockPrices, 3000);
    return () => clearInterval(interval);
  }, []);

  const updateStockPrices = () => {
    for (const stock in stockPrices) {
      const delta = Math.random() * 20 - 10;
      stockPrices[stock] = Math.max(stockPrices[stock] + delta, 10);
    }
    setPrice(stockPrices[stock]);
  };

  const placeOrder = () => {
    if (quantity === 0) {
      toast({
        title: "Invalid Quantity",
        description: "Please enter a valid quantity",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const orderAmount = quantity * stockPrices[stock];

    const positionChange = orderType === "buy" ? quantity : -quantity;
    setBalance(balance - orderAmount * (orderType === "buy" ? 1 : -1));
    setPortfolio({ ...portfolio, [stock]: (portfolio[stock] || 0) + positionChange });

    toast({
      title: "Order Placed",
      description: `You ${orderType === "buy" ? "bought" : "shorted"} ${quantity} shares of ${stock}`,
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
            <Select
              value={stock}
              onChange={(e) => {
                setStock(e.target.value);
                setPrice(stockPrices[e.target.value]);
              }}
            >
              <option value="AAPL">Apple (AAPL)</option>
              <option value="GOOGL">Google (GOOGL)</option>
              <option value="AMZN">Amazon (AMZN)</option>
              <option value="TSLA">Tesla (TSLA)</option>
            </Select>

            <Input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />

            <RadioGroup onChange={setOrderType} value={orderType}>
              <HStack>
                <Radio value="buy">Buy</Radio>
                <Radio value="short">Short</Radio>
              </HStack>
            </RadioGroup>

            <Button leftIcon={<FaRocket />} colorScheme="blue" onClick={placeOrder}>
              Place Order
            </Button>
          </VStack>

          <Box>
            <Text fontSize="2xl" fontWeight="bold">
              Current {stock} Price: ${price.toFixed(2)}
            </Text>
          </Box>
        </HStack>

        <Portfolio portfolio={portfolio} />

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
