'use client';

import {Box, Drawer, DrawerContent, Flex, useDisclosure} from '@chakra-ui/react';
import SidebarContent from './sidebar-content';
import MobileNav from './mobile-nav';

type Props = {
  children: React.ReactNode;
};
const SidebarWithHeader = ({children}: Props) => {
  const {isOpen, onOpen, onClose} = useDisclosure();

  return (
    <Flex direction="column" minH='100vh'>
      <SidebarContent
        onClose={() => onClose}
        display={{base: 'none', md: 'block'}}
      />
        <Drawer
          isOpen={isOpen}
          placement='left'
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size='full'
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box bg='gray.50'
        color='gray.700'
        className="grow" p="4" height="max" ml={{base: 0, md: 60}}>
        {children}
      </Box>
    </Flex>
  );
};

export default SidebarWithHeader;
