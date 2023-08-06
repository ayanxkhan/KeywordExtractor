// import { useState } from "react";
// import { Container, Box, keyframes } from "@chakra-ui/react";
// import Header from "./components/header";
// import Footer from "./components/Footer";
// import TextInput from "./components/TextInput";
// import KeywordsModal from "./components/KeywordsModal";


// const App = () => {

//   const [Keywords, setKeywords] = useState('');
//   const [isOpen, setIsOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
  
//   const extractKeywords = async (text) => { 
//     // console.log(text);
//     setLoading(true);
//     setIsOpen(true);

//     const options = {
//       method: 'POST',
//       headers:{
//         'Content-Type':'application/json',
//         Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
//       },
//       body: JSON.stringify({
//         model: 'text-davinci-003',
//         prompt: 'Extract keywords from this text. Make the first letter of each word uppercase and seperate with commas\n\n' + text + '',
//         temperature: 0.5,
//         max_tokens: 60,
//         frequency_penalty: 0.8

//       })
      
//     };
//     const response = await fetch(import.meta.env.VITE_OPENAI_API_URL, options);

//     const json = await response.json();

//     const data  = json.choices[0].text.trim();

//     console.log(data);
//     setKeywords(data);
//     setLoading(false);


//   };

//   const closeModal = () =>{
//     setIsOpen(false);
//   }
//   return (
//     <Box bg='blue.600' color='white' height='100vh' paddingTop={130}>
//       <Container maxW='3xl' centerContent>
//         <Header />
//         <Footer />
//         <TextInput extractKeywords={extractKeywords}></TextInput>

//       </Container>
//       <KeywordsModal Keywords={Keywords} loading={ loading } isOpen={isOpen} closeModal={closeModal}/>

//     </Box>
//   );
// };
// export default App;

import { useState } from 'react';
import { Container, Box } from '@chakra-ui/react';
import Header from './components/Header';
import Footer from './components/Footer';
import TextInput from './components/TextInput';
import KeywordsModal from './components/KeywordsModal';

const App = () => {
  const [keywords, setKeywords] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const extractKeywords = async (text) => {
    setLoading(true);
    setIsOpen(true);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt:
          'Extract keywords from this text. Make the first letter of every word uppercase and separate with commas:\n\n' +
          text +
          '',
        temperature: 0.5,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.8,
        presence_penalty: 0.0,
      }),
    };
    console.log(options)
    try {
      const response = await fetch(
        import.meta.env.VITE_OPENAI_API_URL,
        options
      );
      const data = await response.json();
      console.log(data)
      console.log(data.choices[0].text.trim());
      setKeywords(data.choices[0].text.trim());
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Box bg='blue.600' color='white' height='100vh' paddingTop={130}>
      <Container maxW='3xl' centerContent>
        <Header />
        <TextInput extractKeywords={extractKeywords} />
        <Footer />
      </Container>
      <KeywordsModal
        keywords={keywords}
        loading={loading}
        isOpen={isOpen}
        closeModal={closeModal}
      />
    </Box>
  );
};

export default App;