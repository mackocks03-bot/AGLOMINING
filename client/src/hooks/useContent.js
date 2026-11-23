import { useState, useEffect } from 'react';
import { getContent, getImages } from './useApi';

export function useContent() {
  const [content, setContent] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([getContent(), getImages()])
      .then(([contentRes, imagesRes]) => {
        if (contentRes.status === 'fulfilled') {
          setContent(contentRes.value.data?.data || null);
        }
        if (imagesRes.status === 'fulfilled') {
          setImages(imagesRes.value.data?.images || []);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return { content, images, loading };
}

