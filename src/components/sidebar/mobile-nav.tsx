import {
  Flex,
  FlexProps,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';

import Image from 'next/image';
import Link from 'next/link';

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height='20'
      alignItems='center'
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth='1px'
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      display={{ base: 'flex', md: 'none' }}
      {...rest}
    >
      <IconButton
        onClick={onOpen}
        variant='outline'
        aria-label='open menu'
        icon={<FiMenu />}
      />
      <Link href='/' className="mx-auto">
        <Image src='/logo_goats_circle.webp' alt='Logo' width={70} height={70} className="my-5 rounded-full shadow" />
      </Link>
    </Flex>
  );
};

export default MobileNav;
