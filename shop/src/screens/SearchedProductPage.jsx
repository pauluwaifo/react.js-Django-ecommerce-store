import React, {useEffect, useState} from "react";
import ProductSearch from '../components/ProductSearch'
import {useDispatch, useSelector} from 'react-redux'
import { listProducts } from "../actions/productActions";
import Loader from "../components/loader";
import Message from "../components/message";
import Recommendation from "../components/Recommendation";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSpeechRecognition } from "react-speech-recognition";
import  slide_image  from '../assests/slide_images/slide_image.png'
import  img_1  from '../assests/slide_images/img_1.jpg'
import Category from "../components/category";
import GotoTop from '../components/GoToTop'

function SearchedProductPage({keyword, category, setCategory}) {
    
    const dispatch = useDispatch();
    const location = useLocation();
    const nav = useNavigate()
    const productList = useSelector(state => state.productList);
    const { error, loading, products } = productList;
    console.log(products);
  
    // Voice search setup
    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    const [searchKeyword, setSearchKeyword] = useState('');
  
    useEffect(() => {
      // On component mount, try to get the search keyword from URL query parameters
      const urlParams = new URLSearchParams(location.search);
      const savedSearchKeyword = urlParams.get('keyword');
      if (savedSearchKeyword) {
        setSearchKeyword(savedSearchKeyword);
        dispatch(listProducts(savedSearchKeyword));
      }
    }, [dispatch, location.search]);
  
    useEffect(() => {
      // Update the URL with the search keyword as a query parameter
      const urlParams = new URLSearchParams(location.search);
      urlParams.set('keyword', searchKeyword);
      const newSearch = urlParams.toString();
      nav({ search: newSearch });
    }, [searchKeyword]);

    const handleVoiceSearch = () => {
        resetTranscript();
        if (!listening) {
          startListening();
        } else {
          stopListening();
        }
    };

    const startListening = () => {
        const recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US"; // Set the language for speech recognition, change if needed.
    
        recognition.onresult = (event) => {
          const { transcript } = event.results[0][0];
          resetTranscript();
          recognition.stop();
          dispatch(listProducts(transcript));
        };
    
        recognition.onerror = (event) => {
          console.error("Speech recognition error occurred:", event.error);
          resetTranscript();
          recognition.stop();
        };
    
        recognition.start();
    };
    
    const stopListening = () => {
    // Stop the recognition if needed
    };

    if (!browserSupportsSpeechRecognition) {
        return <div>Your browser does not support speech recognition.</div>;
    }
    
   
    return ( 
        <div className="container-fluid p-0">
          <GotoTop />
            {loading ? <Loader />
                :   error ? <Message error={error} color="alert alert-danger"/>
                :   <div className="row">
                        {/* 20% OFF RECOMMENDATION*/}
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-lg-12 mmt-5">
                                  <div className="row">
                                      <div className="col-3">
                                        <h1>CATEGORY</h1>
                                        </div>
                                      <div className="col-9">
                                          <div className="d-flex flex-row flex-wrap bg-white p-2 rounded-1 shadow">
                                              {products.map((product) => (
                                                  <ProductSearch product={product} key={product._id}/>
                                              ))}
                                          </div>
                                      </div>
                                  </div>
                                </div>
                            </div>
                        </div>

                    </div>
            }
            
            
        </div> 
    );
}

export default SearchedProductPage;