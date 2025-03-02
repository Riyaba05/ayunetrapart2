import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Divider,
  Image,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

interface BlogPost {
  id: number;
  title: string;
  date: string;
  content: string;
  imageUrl: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Understanding Common Health Conditions',
    date: 'March 1, 2024',
    content: `Maintaining good health requires understanding common conditions that might affect us. 
    Here are some key health conditions to be aware of:

    1. Diabetes
    - A metabolic disorder affecting blood sugar levels
    - Can be managed through diet, exercise, and medication
    - Regular monitoring is essential

    2. High Blood Pressure
    - Often called the "silent killer"
    - Can be controlled through lifestyle changes
    - Regular check-ups are important

    3. Arthritis
    - Affects joints and mobility
    - Can be managed with proper exercise and treatment
    - Early intervention is key`,
    imageUrl: '/image.webp'
  },
  {
    id: 2,
    title: 'Natural Remedies for Better Health',
    date: 'March 2, 2024',
    content: `Natural remedies have been used for centuries to maintain health and wellness. 
    Here are some effective natural approaches:

    1. Herbal Teas
    - Chamomile for relaxation
    - Ginger for digestion
    - Peppermint for stomach issues

    2. Healthy Lifestyle Practices
    - Regular exercise
    - Balanced diet
    - Adequate sleep

    3. Stress Management
    - Meditation
    - Deep breathing exercises
    - Regular breaks during work`,
    imageUrl: '/image_ayur.jpg'
  }
];

const BlogPost = ({ post }: { post: BlogPost }) => {
  return (
    <Box mb={10}>
      <Image
        src={post.imageUrl}
        alt={post.title}
        height="300px"
        width="100%"
        objectFit="cover"
        borderRadius="lg"
        mb={4}
      />
      <Heading 
        size="lg" 
        mb={2}
        color={useColorModeValue('gray.700', 'white')}
      >
        {post.title}
      </Heading>
      <Text 
        fontSize="sm" 
        color={useColorModeValue('gray.500', 'gray.400')}
        mb={4}
      >
        {post.date}
      </Text>
      <Text
        color={useColorModeValue('gray.600', 'gray.300')}
        whiteSpace="pre-line"
        mb={4}
      >
        {post.content}
      </Text>
      <Link
        color="blue.500"
        href="#"
        fontWeight="medium"
        _hover={{ textDecoration: 'underline' }}
      >
        Read more →
      </Link>
      <Divider mt={8} />
    </Box>
  );
};

export default function Ailments() {
  const bgColor = useColorModeValue('beige', 'gray.800');
  
  return (
    <>
      <NextSeo
        title="Health Blog - Ayunetra"
        description="Learn about various health conditions and natural remedies for better wellbeing."
      />
      <Box bg={bgColor} minH="100vh" py={12}>
        <Container maxW="3xl">
          <VStack spacing={8} align="stretch">
            <Heading
              textAlign="center"
              size="2xl"
              color={useColorModeValue('gray.700', 'white')}
              mb={8}
            >
              Health & Wellness Blog
            </Heading>
            {blogPosts.map((post) => (
              <BlogPost key={post.id} post={post} />
            ))}
          </VStack>
        </Container>
      </Box>
    </>
  );
}