import { IPost } from "@/lib/apolloQuerys";
import { Box, Avatar, Text, HStack, useColorModeValue } from "@chakra-ui/react";
import { parseDate } from "@/utils/parseDate";
import { LinkOverlay } from "./link";
import Image from "next/image";
import { MotionLinkBox } from "./motionComponents";

const container = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0, transition: { ease: [0.6, -0.05, 0.01, 0.99], duration: 0.6 } },
};

export const PostCard = ({ p }: { p: IPost }) => {
  const shadow = useColorModeValue("2xl", "none");
  const borderColor = useColorModeValue("gray.300", "gray.700");

  return (
    <MotionLinkBox
      as="article"
      borderWidth="1px"
      borderRadius="lg"
      borderColor={borderColor}
      overflow="hidden"
      boxShadow={shadow}
      variants={container}
    >
      <LinkOverlay href={`/posts/${p.slug}`}>
        <Image
          src={`${p.coverImage.url}`}
          width={2000}
          height={1000}
          layout="responsive"
          alt={p.title}
        />
      </LinkOverlay>
      <Box p={4}>
        <Box fontWeight="semibold" as="h2" fontSize="2xl" isTruncated>
          <LinkOverlay href={`/posts/${p.slug}`}>{p.title}</LinkOverlay>
        </Box>
        <Box color="gray.500" fontWeight="semibold" letterSpacing="wide" fontSize="sm" mt="2">
          <HStack spacing={4}>
            <Avatar size="sm" name={p.author.name} src={p.author.picture.url} />
            <Text fontSize="md" color="gray.400">
              {p.author.name} &bull; {parseDate(p.date)}
            </Text>
          </HStack>
        </Box>
      </Box>
    </MotionLinkBox>
  );
};
