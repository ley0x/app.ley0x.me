import {
  Box,
  BoxProps,
  CloseButton,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { FiHome, FiTrendingUp } from 'react-icons/fi';
import NavItem from './nav-item';
import { MdOutlineLyrics, MdOutlineFileDownload } from 'react-icons/md';
import Image from 'next/image';
import Link from 'next/link';

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Lyrics card', icon: MdOutlineLyrics, href: '/lyrics' },
  { name: 'Covers', icon: MdOutlineFileDownload, href: '/covers' },
  { name: 'Image generator', icon: FiTrendingUp, href: '/image-generator' },
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
      <Flex alignItems='center' mx='8' justifyContent='space-between'>
        <Link href='/' className="mx-auto">
          <Image src='/logo_goats_circle.webp' alt='Logo' width={100} height={100} className="my-5 rounded-full shadow" />
        </Link>
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
