import { Box, Center } from "@chakra-ui/react";
import Image from "next/image";
export default function PostImage({ margin, src }: { margin: number; src: string }) {
  return (
    <Center my={margin * 2}>
      <Box w="full" borderRadius="lg" overflow="hidden">
        <Image
          src={`https:${src}`}
          width={2000}
          height={1300}
          layout="responsive"
          objectFit="cover"
        />
      </Box>
    </Center>
  );
}
