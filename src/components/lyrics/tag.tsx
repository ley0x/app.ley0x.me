'use client';

import { Text } from '@chakra-ui/react';
import React from 'react'

const Tag = () => {
  return (
    <Text
      color='white'
      fontSize='xs'
      fontWeight='semibold'
      lineHeight='tight'
      noOfLines={1}
      position="absolute"
      top="3"
      right="3"
      zIndex="sticky"
      opacity="0.3"
      >app.ley0x.me</Text>
  )
}

export default Tag;
