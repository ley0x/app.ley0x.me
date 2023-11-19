import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { FiHome, FiTrendingUp } from 'react-icons/fi';
import NavItem from './nav-item';
import { MdOutlineLyrics, MdOutlineFileDownload } from 'react-icons/md';

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, href: '/' },
  { name: 'Lyrics card', icon: MdOutlineLyrics, href: '/lyrics' },
  { name: 'Covers', icon: MdOutlineFileDownload, href: '/covers' },
  // { name: 'Last.fm', icon: FiTrendingUp, href: '/lastfm' },
  // { name: 'Top 100', icon: FiCompass, href: '/tops' },
  // { name: 'Clashs', icon: FiStar, href: '/clashs' },
  // { name: 'Settings', icon: FiSettings, href: '/settings' },
];

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition='3s ease'
      bg={useColorModeValue('white', 'gray.900')}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      h='full'
      {...rest}
    >
      <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
        <Text fontSize='2xl' fontFamily='monospace' fontWeight='bold' color={useColorModeValue("gray.700", "gray.50")}>
          Logo
        </Text>
        <CloseButton color={useColorModeValue("gray.900", "gray.50")} display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} href={link.href} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default SidebarContent;
