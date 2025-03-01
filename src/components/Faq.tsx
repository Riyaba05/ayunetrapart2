import React from "react";
import {
  Box,
  chakra,
  Container,
  Link,
  Text,
  HStack,
  VStack,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";

const articles = [
  {
    id: 1,
    title: "What is Ayunetra?",
    content: `Ayunetra is an intelligent healthcare assistant that provides personalized recommendations for common day-to-day health concerns. Powered by advanced AI technology, it helps users manage and find relief from various common ailments such as cough, fever, sneezing, acidity, and more.`,
  },
  {
    id: 2,
    title: "What health conditions does Ayunetra help with?",
    content: `Ayunetra provides assistance for common daily health issues including fever, cough, sneezing, acidity, and many other common conditions. The system is available 24/7 and offers personalized health recommendations based on your specific symptoms.`,
  },
  {
    id: 3,
    title: "Is Ayunetra a replacement for professional medical advice?",
    content: `No, Ayunetra is designed to provide general guidance for common, non-severe health conditions. It is not a replacement for professional medical advice. Always consult a healthcare provider for serious medical conditions.`,
  },
  {
    id: 4,
    title: "What technologies does Ayunetra use?",
    content: `Ayunetra is built using Next.js as the frontend framework, with an AI/ML backend for intelligent recommendations. It features a modern UI/UX design and a real-time chat interface for seamless interaction.`,
  },
];

const Newsletters = () => {
  return (
    <Container maxWidth="4xl" p={{ base: 2, sm: 10 }}>
      <Text fontSize={"4xl"}>FAQs</Text>
      <hr />
      {articles.map((article, index) => (
        <Flex key={index} mb="10px">
          <LineWithDot />
          <Card {...article} />
        </Flex>
      ))}
    </Container>
  );
};

interface CardProps {
  title: string;

  content: string;
}

const Card = ({ title, content }: CardProps) => {
  return (
    <HStack
      p={{ base: 3, sm: 6 }}
      bg={useColorModeValue("gray.100", "gray.800")}
      spacing={5}
      rounded="lg"
      alignItems="center"
      pos="relative"
      _before={{
        content: `""`,
        w: "0",
        h: "0",
        borderColor: `transparent ${useColorModeValue(
          "#edf2f6",
          "#1a202c"
        )} transparent`,
        borderStyle: "solid",
        borderWidth: "15px 15px 15px 0",
        position: "absolute",
        left: "-15px",
        display: "block",
      }}
    >
        
      <Box>
        <VStack spacing={0} mb={3} textAlign="left">
          <chakra.h1
            as={Link}
            _hover={{ color: "teal.400" }}
            fontSize="2xl"
            lineHeight={1.2}
            fontWeight="bold"
            w="100%"
          >
            {title}
          </chakra.h1>
          <Text fontSize="md" noOfLines={10}>
            {content}
          </Text>
        </VStack>
      </Box>
    </HStack>
  );
};

const LineWithDot = () => {
  return (
    <Flex pos="relative" alignItems="center" mr="40px">
      <chakra.span
        position="absolute"
        left="50%"
        height="calc(100% + 10px)"
        border="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        top="0px"
      ></chakra.span>
      <Box pos="relative" p="10px">
        <Box
          pos="absolute"
          width="100%"
          height="100%"
          bottom="0"
          right="0"
          top="0"
          left="0"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          backgroundPosition="center center"
          backgroundColor="rgb(255, 255, 255)"
          borderRadius="100px"
          border="3px solid rgb(4, 180, 180)"
          backgroundImage="none"
          opacity={1}
        ></Box>
      </Box>
    </Flex>
  );
};

export default Newsletters;
