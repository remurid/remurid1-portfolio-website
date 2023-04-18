import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { Head, Loader, Nav, Social, Email, Footer } from '@components';
import { GlobalStyle, theme } from '@styles';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from "three";
const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const StyledVanta = styled.div`

  height: 100%;
  width:100%;

  position: absolute;
  top: 0;
`;
const StyledNet = styled.div`

  z-index:-5;
  
  position: sticky;
  top:0;
`;
const Layout = ({ children, location }) => {
  const isHome = location.pathname === '/';
  const [isLoading, setIsLoading] = useState(isHome);

  // Sets target="_blank" rel="noopener noreferrer" on external links
  const handleExternalLinks = () => {
    const allLinks = Array.from(document.querySelectorAll('a'));
    if (allLinks.length > 0) {
      allLinks.forEach(link => {
        if (link.host !== window.location.host) {
          link.setAttribute('rel', 'noopener noreferrer');
          link.setAttribute('target', '_blank');
        }
      });
    }
  };

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (location.hash) {
      const id = location.hash.substring(1); // location.hash without the '#'
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
          el.focus();
        }
      }, 0);
    }

    handleExternalLinks();
  }, [isLoading]);

  const [vantaEffect, setVantaEffect] = useState(0);
	const vantaRef = useRef(null);
	useEffect(() => {
		if (!vantaEffect) {
			setVantaEffect(
				NET({
					el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: true,
            //Control the min-size of the animation
          minHeight: 200.00,
          minWidth: 200.00,
            //Modify the sizing
          scale: 1.00,
          scaleMobile: 1.00,
            //Customise the colors
          color: 0x05F2DB,
          backgroundColor: 0x081E26,
            //Customise the dots
          points: 6.00,
          maxDistance: 23.00,
          spacing: 20.00
          
				})
			);
		}
		return () => {
			if (vantaEffect) vantaEffect.destroy();
		};
	}, [vantaEffect]);

  return (
    <>
      <Head />

      <div id="root">
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <StyledNet ref={vantaRef}></StyledNet>
            <a className="skip-to-content" href="#content">
              Skip to Content
            </a>
            
            {isLoading && isHome ? (
              <Loader finishLoading={() => setIsLoading(false)} />
            ) : (
              <StyledContent>
                
                <Nav isHome={isHome} />
                <Social isHome={isHome} />
                <Email isHome={isHome} />

                <div id="content">
                  {children}
                  <Footer />
                </div>
              </StyledContent>
            )}
          </ThemeProvider>
        
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

export default Layout;
