import { Box, Center } from "@chakra-ui/react";
import Image from "next/image";
interface IProps {
  margin: number;
  src: string;
  shadow: string;
}
export default function PostImage({ margin, src, shadow }: IProps) {
  return (
    <Center my={margin * 3} boxShadow={shadow}>
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
