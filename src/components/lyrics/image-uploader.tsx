'use client';

import {arrayBufferToString} from '@/lib/utils';
import {lyricsBackground} from '@/store/store';
import {
  FormControl,
  FormErrorMessage,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

import {useAtom} from 'jotai';
import React, {ChangeEventHandler, useRef, useState} from 'react';
import {FiFile} from 'react-icons/fi';
import {z} from 'zod';

const ImageUploader = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const placeholder = 'Votre image...';

  const [, setSelectedImage] = useAtom(lyricsBackground);
  const [invalid, setInvalid] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const MAX_SIZE = 50 * 1024 * 1024; // 50 Mo

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) return;
    
    const file = e.target.files[0];

    if (file) {
      if (file.size > MAX_SIZE) {
        setInvalid(true);
        setError('Image trop lourde');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setInvalid(true);
        setError("Ce n'est pas une image.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (!reader.result) {
          setInvalid(true);
          setError('Impossible de lire le fichier.');
          return;
        }
        const result = z.string().safeParse(reader.result);
        if (result.success) {
          setSelectedImage(result.data);
        } else {
          const arrayBuffer = reader.result as ArrayBuffer;
          const string = arrayBufferToString(arrayBuffer);
          setSelectedImage(string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <FormControl isInvalid={invalid} isRequired>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <Icon as={FiFile} />
          </InputLeftElement>
          <input
            ref={inputRef}
            type='file'
            accept='image/*'
            style={{display: 'none'}}
            onChange={handleImageChange}
          />
          <Input
            onClick={() => inputRef?.current?.click()}
            onChange={() => inputRef?.current?.onchange}
            placeholder={placeholder}
            value={placeholder}
          />
        </InputGroup>
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    </div>
  );
};

export default ImageUploader;
