import React, { useState, useEffect } from 'react';
import { Box, HStack, Spacer, Text } from '@chakra-ui/react';
import { getColors } from '../../assets/Colors/colors';
import Recomendations from '../../components/Home/Recomendations/Recomendations';
import TopAnime from '../../components/Home/TopAnime/TopAnime';
import Upcoming from '../../components/Home/Upcoming/Upcoming';
import Navbar from '../../components/Navbar/Navbar';
import AiringNow from '../../components/Home/AiringNow/AiringNow';
import TopBox from '../../components/AnimeDetail/TopBox/TopBox';
import BottomBox from '../../components/AnimeDetail/BottomBox/BottomBox';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AnimeByGenre from '../../components/AnimeDetail/AnimeByGenre/AnimeByGenre';
import Footer from '../../components/Footer/Footer';
import AnimeVideos from '../../components/AnimeDetail/AnimeVideos/AnimeVideos';

const AnimeDetail = () => {
  const { id } = useParams();
  const [topAnimeLoaded, setTopAnimeLoaded] = useState(false);
  const [recomendationsLoaded, setRecomendationsLoaded] = useState(false);
  const [airingNowLoaded, setAiringNowLoaded] = useState(false);
  const [upcomingLoaded, setUpcomingLoaded] = useState(false);
  const [isTopSection, setIsTopSection] = useState(true);
  const [data, setData] = useState([]);
  const [colorMode, setColorMode] = useState(localStorage.getItem("colorMode") || "dark"); // Retrieve colorMode from local storage
  const colors = getColors();
  
  useEffect(() => {
    const handleColorModeChange = () => {
        // Re-render the component to reflect the updated color mode
        forceUpdate();
    };

    window.addEventListener('storage', handleColorModeChange);

    return () => {
        window.removeEventListener('storage', handleColorModeChange);
    };
}, []);

  const fetchData = async () => {
    try {
        const response = await axios.get(
            `https://api.jikan.moe/v4/anime/${id}/full`
        );
        console.log(response?.data?.data);
        setData(response?.data?.data);
    } catch (err) {
        console.log(err);
    }
}

useEffect(() => {
    fetchData();
}, []);

  useEffect(() => {
    

    const handleScroll = () => {
      const topsection = document.getElementById('topsection');
      const recomendationsection = document.getElementById('recomendationsection');
      const scrollPosition = window.scrollY;
    
      // Calculate the scroll position relative to the top of the page
      const topSectionOffset = topsection.offsetTop;
      const recommendationSectionOffset = recomendationsection.offsetTop;
    
      // Check if the scroll position is within the top section
      if (scrollPosition < recommendationSectionOffset) {
        setIsTopSection(true);
      } else {
        setIsTopSection(false);
      }
    };
    

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isTopSection])

  useEffect(() => {
    fetchDataForTopAnime();
  }, []);

  const fetchDataForTopAnime = async () => {
    try {
      // Fetch data for TopAnime
      // For example:
      // const response = await axios.get('topAnimeApiEndpoint');
      // setDataForTopAnime(response.data);
      setTopAnimeLoaded(true);
    } catch (error) {
      console.error('Error fetching data for TopAnime:', error);
    }
  };

  useEffect(() => {
    if (topAnimeLoaded) {
      fetchDataForRecomendations();
    }
  }, [topAnimeLoaded]);

  const fetchDataForRecomendations = async () => {
    try {
      // Fetch data for Recomendations
      // For example:
      // const response = await axios.get('recomendationsApiEndpoint');
      // setDataForRecomendations(response.data);
      setRecomendationsLoaded(true);
    } catch (error) {
      console.error('Error fetching data for Recomendations:', error);
    }
  };

  useEffect(() => {
    if (recomendationsLoaded) {
      fetchDataForAiringNow();
    }
  }, [recomendationsLoaded]);

  const fetchDataForAiringNow = async () => {
    try {
      // Fetch data for Recomendations
      // For example:
      // const response = await axios.get('recomendationsApiEndpoint');
      // setDataForRecomendations(response.data);
      setAiringNowLoaded(true);
    } catch (error) {
      console.error('Error fetching data for Recomendations:', error);
    }
  };

  useEffect(() => {
    if (airingNowLoaded) {
      fetchDataForUpcoming();
    }
  }, [airingNowLoaded]);

  

  const fetchDataForUpcoming = async () => {
    try {
      // Fetch data for Upcoming
      // For example:
      // const response = await axios.get('upcomingApiEndpoint');
      // setDataForUpcoming(response.data);
      setUpcomingLoaded(true);
    } catch (error) {
      console.error('Error fetching data for Upcoming:', error);
    }
  };

  return (
    <>
      <Box backgroundColor={colors.background} margin='auto' width='100vw' justifyContent='center' height='full'>
        <Navbar isTopSection={isTopSection} colorMode2={colorMode} setColorMode2={setColorMode} />
      <Box id='topsection'>
        <TopBox data={data} />
          </Box>
        <Box id='recomendationsection' maxWidth='100vw' mt='20px'>
          <BottomBox data={data} />
        </Box>
        <Box>
          <AnimeVideos malId={data?.mal_id} />
        </Box>
        <Box>
          <AnimeByGenre genreId={data?.genres} />
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default AnimeDetail;
