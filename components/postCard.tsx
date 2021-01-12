import { IPost } from "../lib/apolloQuerys";
import { Box, Avatar, Text, HStack, useColorModeValue } from "@chakra-ui/react";
import { parseDate } from "../lib/parseDate";
import { Link } from "./link";
import Image from "next/image";

export const PostCard = ({ p }: { p: IPost }) => {
  const shadow = useColorModeValue("2xl", "none");
  const borderColor = useColorModeValue("gray.300", "gray.700");

  return (
    <Box
      w={["xs", "md", "lg"]}
      maxW="xl"
      borderWidth="1px"
      borderRadius="lg"
      borderColor={borderColor}
      overflow="hidden"
      boxShadow={shadow}
    >
      <Link href={`/posts/${p.slug}`}>
        <Image src={`${p.coverImage.url}`} width={2000} height={1000} layout="responsive" />
      </Link>
      <Box p={4}>
        <Box fontWeight="bold" as="h2" lineHeight="tight" fontSize="3xl" isTruncated>
          <Link href={`/posts/${p.slug}`}>{p.title}</Link>
        </Box>
        <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="sm" mt="2">
          <HStack spacing={4}>
            <Avatar size="sm" name={p.author.name} src={p.author.picture.url} />
            <Text fontSize="md">
              {p.author.name} &bull; {parseDate(p.date)}
            </Text>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};
