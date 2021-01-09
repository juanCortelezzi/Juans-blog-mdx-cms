import { IPost } from "../lib/apolloQuerys";
import { Box, Avatar, Text, HStack, Link } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";

export const PostCard = ({ p }: { p: IPost }) => {
  const originalDate = new Date(p.date);
  const [month, date, year] = originalDate.toLocaleDateString("en-US").split("/");

  return (
    <Box w={["xs", "md", "xl"]} maxW="xl" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <NextLink href={`/posts/${p.slug}`} passHref>
        <Link>
          <Image src={`${p.coverImage.url}`} width={2000} height={1000} layout="responsive" />
        </Link>
      </NextLink>
      <Box p={4}>
        <Box fontWeight="bold" as="h2" lineHeight="tight" fontSize="3xl" isTruncated>
          <NextLink href={`/posts/${p.slug}`} passHref>
            <Link>{p.title}</Link>
          </NextLink>
        </Box>
        <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="sm" mt="2">
          <HStack spacing={4}>
            <Avatar size="sm" name={p.author.name} src={p.author.picture.url} />
            <Text fontSize="md">
              {p.author.name} &bull; {`${date}-${month}-${year}`}
            </Text>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};
