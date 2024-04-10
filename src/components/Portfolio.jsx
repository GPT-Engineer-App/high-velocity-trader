import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";

const Portfolio = ({ portfolio }) => {
  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold">
        Portfolio
      </Text>
      {Object.entries(portfolio).map(([stock, quantity]) => (
        <Text key={stock}>
          {stock}: {Math.abs(quantity)} shares ({quantity >= 0 ? "Long" : "Short"})
        </Text>
      ))}
    </Box>
  );
};

export default Portfolio;
