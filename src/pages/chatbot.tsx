import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAuthContext } from "@/context";
import { useRouter } from "next/router";
import HospitalFinder from "@/components/hospital-finder";
import Nouser from "@/components/Nouser";
import {
  Box,
  Button,
  Center,
  CircularProgress,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  IconButton,
  Input,
  List,
  ListItem,
  Text,
  useDisclosure,
  VStack,
  Spinner,
  Image,
  Select,
  Badge,
  Tooltip,
} from "@chakra-ui/react";
import {
  AlertCircle,
  Menu,
  Send,
  Sparkles,
  Plus,
  Router,
  Image as ImageIcon,
  X,
  Clock,
  Heart,
  Thermometer,
  Stethoscope,
} from "lucide-react";
import supabase from "../../supabase";
import { NextSeo } from "next-seo";

const markdownComponents = {
  h1: (props: any) => (
    <Heading as="h1" size="xl" mt={4} mb={2} color="black" {...props} />
  ),
  h2: (props: any) => (
    <Heading as="h2" size="lg" mt={3} mb={2} color="black" {...props} />
  ),
  p: (props: any) => <Text mt={2} color="black" {...props} />,
  strong: (props: any) => (
    <Text as="strong" fontWeight="bold" color="black" {...props} />
  ),
  ul: ({ children }: any) => (
    <List styleType="disc" pl={6} mt={2} spacing={2} color="black">
      {children}
    </List>
  ),
  ol: ({ children }: any) => (
    <List as="ol" styleType="decimal" pl={6} mt={2} spacing={2} color="black">
      {children}
    </List>
  ),
  li: (props: any) => <ListItem color="black" {...props} />,
};

interface ChatMessage {
  id: string;
  message: string;
  response: string;
  created_at: string;
  title: string;
  user_id: string;
  symptom_category?: string;
}

interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const Chatbot = () => {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [currentConversation, setCurrentConversation] = useState<
    ConversationMessage[]
  >([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuthContext();
  const [streamingMessage, setStreamingMessage] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [selectedSymptom, setSelectedSymptom] = useState("");
  const [showHospitalFinder, setShowHospitalFinder] = useState(false);

  const symptomCategories = [
    { value: "fever", label: "Fever", icon: Thermometer },
    { value: "cough", label: "Cough & Cold", icon: AlertCircle },
    { value: "digestive", label: "Digestive Issues", icon: Stethoscope },
    { value: "headache", label: "Headache", icon: AlertCircle },
    { value: "general", label: "General Health", icon: Heart },
  ];

  if (!user) {
    return <Nouser />;
  }

  // Add state for client-side rendering
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const Router = useRouter();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    setImagePreviewUrl("");
  };

  async function saveResponse(messageText: string, responseText: string) {
    try {
      if (!user?.id) {
        console.log("No user ID found when saving");
        return;
      }

      const { data, error } = await supabase
        .from("chatbot")
        .insert([
          {
            message: messageText,
            response: responseText,
            user_id: user.id,
          },
        ])
        .select();

      if (error) {
        console.error("Error saving to Supabase:", error);
        throw error;
      }

      await getHistory();
    } catch (error) {
      console.error("Error saving response:", error);
    }
  }

  async function getHistory() {
    setIsLoading(true);
    try {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from("chatbot")
        .select("*")
        .eq("user_id", user.id)

      if (error) throw error;

      setChatHistory(data || []);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Update useEffect to handle client-side mounting
  useEffect(() => {
    setIsClient(true);
    if (user?.id) {
      getHistory();
    }
  }, [user?.id]);

  interface ApiResponse {
    messages: { content: string }[];
    error?: string;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && !selectedImage) return;

    setLoading(true);
    setIsStreaming(true);
    setStreamingMessage("");

    try {
      let imageUrl = "";

      if (selectedImage) {
        setUploadingImage(true);
        const reader = new FileReader();
        imageUrl = await new Promise((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(selectedImage);
        });
        setUploadingImage(false);
      }

      const userMessage: ConversationMessage = {
        role: "user",
        content: inputText,
        timestamp: new Date().toISOString(),
      };
      setCurrentConversation((prev) => [...prev, userMessage]);

      const response = await fetch("/api/getanswer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          msg: inputText,
          imageUrl: imageUrl,
          conversationHistory: currentConversation,
          symptomCategory: selectedSymptom,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No reader available");
      }

      let accumulatedResponse = "";
      let isComplete = false;

      // Create a promise that resolves when streaming is complete
      const streamPromise = new Promise<string>(async (resolve, reject) => {
        try {
          while (!isComplete) {
            const { done, value } = await reader.read();

            if (done) {
              isComplete = true;
              break;
            }

            // Decode the stream chunk and process it
            const chunk = new TextDecoder().decode(value);
            const lines = chunk
              .split("\n")
              .filter((line) => line.trim() !== "");

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                try {
                  if (line.includes("[DONE]")) {
                    isComplete = true;
                    break;
                  }
                  const data = JSON.parse(line.slice(6));
                  if (data.content) {
                    accumulatedResponse += data.content;
                    setStreamingMessage(accumulatedResponse);
                  }
                } catch (e) {
                  console.error("Error parsing chunk:", e);
                  continue;
                }
              }
            }
          }
          resolve(
            accumulatedResponse ||
              "Sorry, there was an error generating the response."
          );
        } catch (error) {
          console.error("Stream reading error:", error);
          reject(error);
        } finally {
          reader.releaseLock();
        }
      });

      try {
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error("Response timeout")), 60000);
        });

        const finalResponse = (await Promise.race([
          streamPromise,
          timeoutPromise,
        ])) as string;

        const assistantMessage: ConversationMessage = {
          role: "assistant",
          content: finalResponse,
          timestamp: new Date().toISOString(),
        };

        setCurrentConversation((prev) => [...prev, assistantMessage]);
        await saveResponse(inputText, finalResponse);

        removeSelectedImage();
        setInputText("");
      } catch (error) {
        console.error("Error during request:", error);
        setStreamingMessage("An error occurred. Please try again later.");
      } finally {
        setLoading(false);
        setIsStreaming(false);
        setUploadingImage(false);
      }
    } catch (error) {
      console.error("Error during request:", error);
      setStreamingMessage("An error occurred. Please try again later.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleNewChat = () => {
    setInputText("");
    setSummary("");
    setCurrentConversation([]);
    onClose();
  };

  // Move ChatSidebar outside of main component to prevent re-renders
  const ChatSidebarContent = () => (
    <VStack align="stretch" h="100%" spacing={0} bg="white">
      {/* Header Section */}
      <Box p={4} borderBottom="1px" borderColor="gray.200">
        <Heading size="md" color="gray.700">
          Chat History
        </Heading>
      </Box>

      {/* Content Section */}
      <VStack
        align="stretch"
        spacing={3}
        overflowY="auto"
        maxH="calc(100vh - 100px)"
        p={4}
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "gray.200",
            borderRadius: "24px",
          },
        }}
      >
        {!isClient ? null : isLoading ? (
          <Center py={8}>
            <VStack spacing={4}>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="lg"
              />
              <Text color="gray.500" fontSize="sm" fontWeight="medium">
                Loading your conversations...
              </Text>
            </VStack>
          </Center>
        ) : chatHistory.length === 0 ? (
          <Center py={12}>
            <VStack spacing={3}>
              <Icon as={AlertCircle} boxSize={8} color="gray.400" />
              <Text color="gray.500" fontSize="md" textAlign="center">
                No chat history yet
              </Text>
              <Text color="gray.400" fontSize="sm" textAlign="center">
                Start a new conversation to see it here
              </Text>
            </VStack>
          </Center>
        ) : (
          chatHistory.map((chat) => (
            <Box
              key={chat.id}
              p={4}
              bg="white"
              rounded="lg"
              cursor="pointer"
              borderWidth="1px"
              borderColor="gray.200"
              transition="all 0.2s"
              _hover={{
                bg: "blue.50",
                borderColor: "blue.200",
                transform: "translateY(-1px)",
                shadow: "md",
              }}
              onClick={() => {
                setCurrentConversation([
                  {
                    role: "user",
                    content: chat.message,
                    timestamp: chat.created_at,
                  },
                  {
                    role: "assistant",
                    content: chat.response,
                    timestamp: chat.created_at,
                  },
                ]);
                setSelectedSymptom(chat.symptom_category || "");
                setInputText("");
                setStreamingMessage("");
                setIsStreaming(false);
                onClose();
              }}
            >
              <VStack align="stretch" spacing={3}>
                {/* Question Section */}
                <Box>
                  <Flex align="center" gap={2} mb={2}>
                    <Icon as={Send} boxSize={3} color="green.500" />
                    <Text fontSize="xs" fontWeight="medium" color="gray.600">
                      Question
                    </Text>
                  </Flex>
                  <Text fontSize="sm" color="gray.700" noOfLines={2}>
                    {chat.message}
                  </Text>
                </Box>

                {/* Response Preview */}
                <Box borderTopWidth="1px" borderColor="gray.100" pt={2}>
                  <Flex align="center" gap={2} mb={2}>
                    <Icon as={Sparkles} boxSize={3} color="blue.500" />
                    <Text fontSize="xs" fontWeight="medium" color="gray.600">
                      Response
                    </Text>
                  </Flex>
                  <Text fontSize="sm" color="gray.600" noOfLines={2}>
                    {chat.response}
                  </Text>
                </Box>

                {/* Timestamp */}
                <Flex align="center" gap={2} mt={1}>
                  <Icon as={Clock} boxSize={3} color="gray.400" />
                  <Text fontSize="xs" color="gray.500">
                    {isClient
                      ? new Date(chat.created_at).toLocaleDateString(
                          undefined,
                          {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )
                      : ""}
                  </Text>
                </Flex>
              </VStack>
            </Box>
          ))
        )}
      </VStack>
    </VStack>
  );

  if (isLoading) {
    return (
      <Center minH="100vh">
        <VStack spacing={4}>
          <Nouser />
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          <Text color="gray.600" fontSize="lg">
            Loading your chats,
          </Text>
        </VStack>
      </Center>
    );
  }

  if (!isClient) {
    return null; // Prevent initial flash during hydration
  }

  return (
    <>
      <NextSeo
        title="Chat with Ayunetra - Your AI Health Assistant"
        description="Get personalized health recommendations through an intelligent chat interface"
      />
      <Container maxW="full" h="100vh" p={0}>
        <Grid
          templateColumns={{ base: "1fr", md: "250px 1fr" }}
          h="full"
          gap={0}
        >
          <GridItem
            bg="white"
            borderRight="1px"
            borderColor="gray.200"
            display={{ base: isOpen ? "block" : "none", md: "block" }}
          >
            <VStack spacing={4} p={4}>
              <Button
                leftIcon={<Plus />}
                colorScheme="blue"
                variant="solid"
                w="full"
                onClick={handleNewChat}
              >
                New Consultation
              </Button>
              <Select
                placeholder="Select Symptom Category"
                value={selectedSymptom}
                onChange={(e) => setSelectedSymptom(e.target.value)}
                bg="white"
              >
                {symptomCategories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </Select>
              <Box w="full">
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  Recent Consultations
                </Text>
                <VStack spacing={2} align="stretch">
                  {chatHistory.map((chat) => (
                    <Tooltip key={chat.id} label={chat.message} placement="right">
                      <Box
                        p={2}
                        bg="gray.50"
                        borderRadius="md"
                        cursor="pointer"
                        _hover={{ bg: "gray.100" }}
                        onClick={() => {
                          setCurrentConversation([
                            {
                              role: "user",
                              content: chat.message,
                              timestamp: chat.created_at,
                            },
                            {
                              role: "assistant",
                              content: chat.response,
                              timestamp: chat.created_at,
                            },
                          ]);
                          setSelectedSymptom(chat.symptom_category || "");
                          setInputText("");
                          setStreamingMessage("");
                          setIsStreaming(false);
                          onClose();
                        }}
                      >
                        <Flex align="center" gap={2}>
                          {chat.symptom_category && (
                            <Icon
                              as={
                                symptomCategories.find(
                                  (c) => c.value === chat.symptom_category
                                )?.icon
                              }
                              color="blue.500"
                            />
                          )}
                          <Text fontSize="sm" noOfLines={1}>
                            {chat.title || chat.message}
                          </Text>
                        </Flex>
                      </Box>
                    </Tooltip>
                  ))}
                </VStack>
              </Box>
            </VStack>
          </GridItem>

          <GridItem bg="gray.50" position="relative">
            <Flex direction="column" h="full">
              <Flex
                bg="white"
                p={4}
                borderBottom="1px"
                borderColor="gray.200"
                justify="space-between"
                align="center"
              >
                <IconButton
                  icon={<Menu />}
                  aria-label="Menu"
                  variant="ghost"
                  display={{ base: "flex", md: "none" }}
                  onClick={onOpen}
                />
                <Heading size="md" mx={{ base: 4, md: 0 }}>
                  Ayunetra Health Assistant
                </Heading>
                <Flex gap={2} align="center">
                  {selectedSymptom && (
                    <Badge colorScheme="blue" fontSize="sm">
                      {
                        symptomCategories.find((c) => c.value === selectedSymptom)
                          ?.label
                      }
                    </Badge>
                  )}
                  <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={() => setShowHospitalFinder(!showHospitalFinder)}
                  >
                    {showHospitalFinder ? 'Back to Chat' : 'Find Hospitals'}
                  </Button>
                </Flex>
              </Flex>

              {/* Rest of the chat interface */}
              
              <Box flex="1" overflowY="auto" px={4} py={2}>
                {showHospitalFinder ? (
                  <HospitalFinder />
                ) : (
                  <VStack spacing={4} align="stretch">
                    {currentConversation.map((msg, index) => (
                      <Box
                        key={index}
                        mb={4}
                        display="flex"
                        flexDirection="column"
                        alignItems={
                          msg.role === "user" ? "flex-end" : "flex-start"
                        }
                      >
                        <Box
                          maxW="80%"
                          bg={msg.role === "user" ? "blue.500" : "white"}
                          color={msg.role === "user" ? "white" : "black"}
                          p={3}
                          borderRadius="lg"
                          boxShadow="sm"
                        >
                          <MarkdownBox content={msg.content} />
                        </Box>
                        <Text fontSize="xs" color="gray.500" mt={1}>
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </Text>
                      </Box>
                    ))}
                    {isStreaming && (
                      <Box
                        mb={4}
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                      >
                        <Box
                          maxW="80%"
                          bg="white"
                          p={3}
                          borderRadius="lg"
                          boxShadow="sm"
                        >
                          <MarkdownBox content={streamingMessage} />
                        </Box>
                      </Box>
                    )}
                  </VStack>
                )}
              </Box>

              <Box bg="white" p={4} borderTop="1px" borderColor="gray.200">
                <form onSubmit={handleSubmit}>
                  <VStack spacing={4} align="stretch">
                    {imagePreviewUrl && (
                      <Box position="relative" width="fit-content">
                        <Image
                          src={imagePreviewUrl}
                          alt="Selected image"
                          maxH="200px"
                          rounded="md"
                        />
                        <IconButton
                          icon={<X />}
                          aria-label="Remove image"
                          position="absolute"
                          top={2}
                          right={2}
                          size="sm"
                          colorScheme="red"
                          onClick={removeSelectedImage}
                        />
                      </Box>
                    )}
                    <Flex gap={2}>
                      <Input
                        value={inputText}
                        onChange={handleInputChange}
                        placeholder="Describe your symptoms or health concern..."
                        size="md"
                        bg="white"
                        color="black"
                        borderColor="gray.200"
                        _focus={{ borderColor: "blue.500" }}
                      />
                      <label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageSelect}
                          style={{ display: "none" }}
                        />
                        <IconButton
                          as="span"
                          aria-label="Upload image"
                          icon={<ImageIcon />}
                          colorScheme="gray"
                          cursor="pointer"
                        />
                      </label>
                      <IconButton
                        icon={<Send />}
                        aria-label="Send message"
                        colorScheme="blue"
                        type="submit"
                        isLoading={loading || uploadingImage}
                      />
                    </Flex>
                  </VStack>
                </form>
              </Box>
            </Flex>
          </GridItem>
        </Grid>
      </Container>
    </>
  );
};

const MarkdownBox = ({ content }: { content: string }) => {
  return (
    <Box
      bg="white"
      paddingInline={2}
      rounded="md"
      fontSize={{ base: "sm", md: "md" }}
      color="black"
    >
      <ReactMarkdown
        components={markdownComponents}
        remarkPlugins={[remarkGfm]}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
};

export default Chatbot;
