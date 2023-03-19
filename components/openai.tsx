import { useState } from "react";
import { Box, Button, Input } from "@chakra-ui/react";
import axios from "axios";

type Message = {
  text: string;
  isBot: boolean;
};

export default function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = async () => {
    if (!input) return;

    // send request to API endpoint
    try {
      const response = await axios.post("/api/openai", { question: input });

      // add bot response to messages array
      setMessages((prevState) => [
        ...prevState,
        { text: response.data.result, isBot: true },
      ]);

      setInput("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      mx="auto"
      maxW="600px"
      borderWidth={1}
      borderColor="gray.200"
      borderRadius="md"
      p={4}
      boxShadow="md"
    >
      <Box mb={4} textAlign="center" fontWeight="bold" className="font-semibold text-2xl text-white">
        EveAI Chat
      </Box>

      <Box
        h="400px"
        maxH="400px"
        overflowY="scroll"
        mb={4}
        borderWidth={1}
        borderColor="gray.200"
        borderRadius="md"
        p={4}
        boxShadow="sm"
      >
        {messages.map((message, index) => (
          <Box key={index} mb={2} textAlign={message.isBot ? "left" : "right"}>
            <Box
              bg={message.isBot ? "gray.200" : "teal.500"}
              color={message.isBot ? "black" : "white"}
              borderRadius="md"
              p={2}
              maxW="50%"
              wordBreak="break-word"
              display="inline-block"
              boxShadow="md"
            >
              {message.text}
            </Box>
          </Box>
        ))}
      </Box>

      <Box>
        <Input
          className="text-white"
          placeholder="Enter your message..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") sendMessage();
          }}
          mr={4}
          borderRadius="md"
          boxShadow="sm"
        />
        <Button
          colorScheme="teal"
          onClick={sendMessage}
          borderRadius="md"
          boxShadow="sm"
          mt={4}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
}
