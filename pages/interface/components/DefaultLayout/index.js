import { GoToTopButton } from '@tabnews/ui';

import { useRouter } from 'next/router';
import { useEffect } from 'react';


import { Box, Footer, Header } from '@/TabNewsUI';
import { Head } from 'pages/interface';

export default function DefaultLayout({ children, containerWidth = 'large', metadata }) {
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(event) {
      const isTyping = ['INPUT', 'TEXTAREA'].includes(event.target.tagName) || event.target.isContentEditable;

      if (isTyping) return;

      if (event.key === 'n') {
          event.preventDefault();
          router.push('/publicar');
      }

      if (event.key === '/') {
          event.preventDefault();
          document.querySelector('#search-bar-button, #search-icon-button')?.click();
      }
    }
  
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [router]);

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'canvas.default' }}>
      {metadata && <Head metadata={metadata} />}
      <Header />
      <Box
        as="main"
        maxWidth={containerWidth}
        sx={{
          marginX: 'auto',
          display: 'flex',
          flexWrap: 'wrap',
          padding: [2, null, null, 4],
          paddingTop: [3, null, null, 4],
        }}>
        {children}
      </Box>
      <Footer
        maxWidth={containerWidth}
        sx={{
          marginX: 'auto',
          paddingX: [2, null, null, 4],
          paddingTop: 3,
        }}
      />
      <GoToTopButton target="header" />
    </Box>
  );
}
