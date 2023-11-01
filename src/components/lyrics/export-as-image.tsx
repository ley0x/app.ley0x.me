'use client';
import {Button} from '@chakra-ui/react';
import html2canvas from 'html2canvas';

import React from 'react';
import {RiDownloadFill} from 'react-icons/ri';

const ExportAsImage = () => {
  const exportAsImage = () => {
    const element = document.getElementById('lyrics-canvas') as HTMLElement;
    if (!element) return;

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      const downloadLink = document.createElement('a');
      downloadLink.href = imgData;
      downloadLink.download = 'exported-image.png';
      downloadLink.click();
    });
  };
  return (
    <Button size='lg' colorScheme="gray" maxW="3xs" variant="outline" leftIcon={<RiDownloadFill />} onClick={() => exportAsImage()}>
      Télécharger
    </Button>
  );
};

export default ExportAsImage;
