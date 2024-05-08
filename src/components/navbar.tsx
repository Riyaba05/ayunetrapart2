import Link from "next/link";
import {
  FaSchool,
  FaChalkboardTeacher,
  FaPaintBrush,
  FaGlobe,
} from "react-icons/fa";
import ThemeButton from "@/components/ThemButton";
import { Show } from "@chakra-ui/react";
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useStore } from "@/store";
import { useAuthContext } from "@/context";

export default function Navbar() {
  const isMobileNav = useBreakpointValue({ base: true, md: false });
  const { user } = useAuthContext();

  return (
    <Box>
      {" "}
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <Show breakpoint="(max-width: 400px)">
            <ThemeButton />
          </Show>
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            <Link href={"/"}>ShikshaFinder</Link>
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {user && user.email ? (
            <>
              <Button
                as={Link}
                href={"/profile"}
                passHref
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
              >
                Profile
              </Button>

              <Show above="sm">
                <Show breakpoint="(min-width: 400px)">
                  <ThemeButton />
                </Show>
              </Show>
            </>
          ) : (
            <>
              <Button
                as={Link}
                href={"/login"}
                passHref
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
              >
                Sign In
              </Button>
              <Button
                as={Link}
                href={"/signup"}
                passHref
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"blue"}
                _hover={{
                  bg: "blue.300",
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Stack>
      </Flex>
      <Box>{isMobileNav ? <MobileNav /> : null}</Box>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as={Link}
                href={navItem.href ?? "../school"}
                passHref
                p={2}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Box
      as={Link}
      href={href}
      passHref
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("blue.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "blue.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"blue.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  const handleClick = (iconName: string) => {
    useStore.getState().setSelectedIcon(iconName);
  };
  const boxColor = useColorModeValue("gray.100", "gray.800");
  return (
    <>
      <Box
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        p={4}
        bg={boxColor}
        zIndex={10}
        borderTopWidth="1px"
        borderColor="gray"
      >
        <Stack direction={"row"} spacing={45}>
          <Link href={"/school"}>
            <FaSchool
              size={19}
              color={
                useStore.getState().selectedIcon === "school"
                  ? "blue"
                  : "initial"
              }
              style={{ marginInline: "auto" }}
              onClick={() => handleClick("school")}
            />
            <Text fontSize={"sm"}>Schools</Text>
          </Link>
          <Link href={"/coaching"}>
            <FaChalkboardTeacher
              size={19}
              color={
                useStore.getState().selectedIcon === "coaching"
                  ? "blue"
                  : "initial"
              }
              style={{ marginInline: "auto" }}
              onClick={() => handleClick("coaching")}
            />
            <Text fontSize={"sm"}>Coaching</Text>
          </Link>
          <Link href={"/onlineplatforms"}>
            <FaGlobe
              size={19}
              color={
                useStore.getState().selectedIcon === "online"
                  ? "blue"
                  : "initial"
              }
              style={{ marginInline: "auto" }}
              onClick={() => handleClick("online")}
            />
            <Text fontSize={"sm"}>Online</Text>
          </Link>
          <Link href={"/skillclass"}>
            <FaPaintBrush
              size={19}
              color={
                useStore.getState().selectedIcon === "skillclass"
                  ? "blue"
                  : "initial"
              }
              style={{ marginInline: "auto" }}
              onClick={() => handleClick("skillclass")}
            />{" "}
            <Text fontSize={"sm"}>Skills</Text>
          </Link>
        </Stack>
      </Box>
    </>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "School & Coaching Classes",
    children: [
      {
        label: "Schools",
        subLabel: "Choose the right school For the best future of yours",
        href: "../school",
      },
      {
        label: "Coaching classes",
        subLabel: "Let's get Started!",
        href: "../coaching",
      },
    ],
  },
  {
    label: "Skill classes & Online Platforms",
    href: "../skillclass",
    children: [
      {
        label: "Skill Classes",
        subLabel: "Learn what you Love",
        href: "../skillclass",
      },
      {
        label: "Online Platform",
        subLabel: "Find Out The  Best!",
        href: "../onlineplatforms",
      },
    ],
  },
  {
    label: "aboutus",
    href: "./aboutus",
  },
  {
    label: "profile",
    href: "/profile",
  },
];
