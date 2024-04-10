import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";

const Portfolio = ({ portfolio, shortPositions }) => {
  return (
    <VStack spacing={4} align="stretch">
      <Box>
        <Text fontSize="xl" fontWeight="bold">
          Portfolio
        </Text>
        {Object.entries(portfolio).map(([stock, quantity]) => (
          <Text key={stock}>
            {stock}: {quantity} shares
          </Text>
        ))}
      </Box>
      <Box>
        <Text fontSize="xl" fontWeight="bold">
          Short Positions
        </Text>
        {Object.entries(shortPositions).map(([stock, quantity]) => (
          <Text key={stock}>
            {stock}: {quantity} shares
          </Text>
        ))}
      </Box>
    </VStack>
  );
};

export default Portfolio;
