import { IPost } from "../lib/apolloQuerys";
import { Box, Skeleton, Avatar, Text, HStack, useColorModeValue } from "@chakra-ui/react";
import { parseDate } from "../lib/parseDate";
import { Link } from "./link";
import Image from "next/image";
import { MotionBox } from "./motionComponents";

const container = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0, transition: { ease: [0.6, -0.05, 0.01, 0.99], duration: 0.6 } },
};

export const PostCard = ({ p }: { p: IPost }) => {
  const shadow = useColorModeValue("2xl", "none");
  const borderColor = useColorModeValue("gray.300", "gray.700");

  return (
    <MotionBox
      w={["xs", "md", "lg"]}
      maxW="xl"
      borderWidth="1px"
      borderRadius="lg"
      borderColor={borderColor}
      overflow="hidden"
      boxShadow={shadow}
      variants={container}
    >
      <Skeleton isLoaded>
        <Link href={`/posts/${p.slug}`}>
          <Image
            src={`${p.coverImage.url}`}
            width={2000}
            height={1000}
            layout="responsive"
            alt={p.title}
          />
        </Link>
      </Skeleton>
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
    </MotionBox>
  );
};
