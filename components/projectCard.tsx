import { Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { MotionLinkBox } from "@/components/motionComponents";
import { LinkOverlay } from "@/components/link";
import { parseDate, parseDateFromNow } from "@/utils/parseDate";

const container = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0, transition: { ease: [0.6, -0.05, 0.01, 0.99], duration: 0.6 } },
};

export default function ProjectCard({ name, description, created_at, updated_at, html_url }) {
  const shadow = useColorModeValue("2xl", "none");
  const borderColor = useColorModeValue("gray.300", "gray.700");
  return (
    <MotionLinkBox
      w="full"
      borderWidth="1px"
      borderRadius="lg"
      borderColor={borderColor}
      overflow="hidden"
      boxShadow={shadow}
      variants={container}
      p={4}
      my={4}
    >
      <LinkOverlay href={html_url}>
        <Heading as="h2" fontWeight="semibold" fontSize="2xl" isTruncated>
          {name}
        </Heading>
      </LinkOverlay>
      <Text my={2}>{description}</Text>
      <Text fontSize="md" color="gray.400">
        Created at: {parseDate(created_at)} &bull; Last updated {parseDateFromNow(updated_at)}
      </Text>
    </MotionLinkBox>
  );
}
