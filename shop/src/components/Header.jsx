import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSpeechRecognition } from "react-speech-recognition";
import Fuse from 'fuse.js';

function Header({ keyword, setKeyword }) {

  const camelize = (str) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 1 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  }

  const nav = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const [search, setSearch] = useState(("").toLowerCase());

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const itemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);


  const productList = useSelector(state => state.productList)
  const {products} = productList

  // Voice search setup
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const [listening, setListening] = useState(false);


  const fuseOptions = {
    keys: ['name', 'category'], // Add the keys you want to search by
    threshold: 1, // Adjust this threshold for the level of fuzziness allowed
  }
  
  
  const fuse = new Fuse(products, fuseOptions);

  const logoutHandler = () => {
    dispatch(logout());
  };
  const updateSearchText = (e) => {
    setSearch(e.target.value);
  };
  const submitHandler = (e) => {
    console.log(keyword);
    e.preventDefault();
    if (search) {
      const searchResults = fuse.search(search);
      console.log(searchResults, "result")
      nav(`search/?keyword=${encodeURIComponent(search).toLowerCase()}`);
    } else {
      nav(nav(nav.location));
    }
  };

  const startListening = () => {
    const recognition =
      new window.webkitSpeechRecognition() || new window.SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US"; // Set the language for speech recognition, change if needed.
    setListening(true);

    recognition.onresult = (event) => {
      setListening(false);
      const { transcript } = event.results[0][0];
      resetTranscript();
      recognition.stop();
      dispatch(listProducts(transcript));
      console.log(transcript);
      nav(`search/?keyword=${encodeURIComponent(transcript)}`);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error occurred:", event.error);
      resetTranscript();
      recognition.stop();
      setListening(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    const recognition =
      new window.webkitSpeechRecognition() || new window.SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    setListening(false);

    recognition.onresult = (event) => {
      resetTranscript();
      recognition.stop();
    };
  };

  const reset = () => {
    setSearch("");
  };

  const handleVoiceSearch = () => {
    resetTranscript();
    if (!listening) {
      startListening();
    } else {
      stopListening();
    }
  };

  

  if (!browserSupportsSpeechRecognition) {
    return <div>Your browser does not support speech recognition.</div>;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mshadow sticky-top mmt-0">
      <div className="container-fluid">
        <Link
          className="navbar-brand active ms-5 d-inline"
          onClick={reset}
          to="/"
        >
          <h2>SHOP</h2>
          {/* <img src={logo} alt='logo' width='40%'/> */}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form
            className="d-flex ms-5 mborder-2 px-3 mpy-1p5 rounded-1"
            onSubmit={submitHandler}
            autoComplete="on"
          >
            <button className="mbtn" type="submit">
              <i className="fas fa-search"></i>
            </button>

            <input
              className="form-control me-2 search"
              type="search"
              placeholder={"Search products, brands and categories"}
              aria-label="Search"
              value={search}
              onChange={updateSearchText}
            />
            <button onClick={handleVoiceSearch} className="mbtn">
              {listening ? (
                <i className="fas fa-microphone-slash "></i>
              ) : (
                <i className="fas fa-microphone "></i>
              )}
            </button>
          </form>
          <button
            className="btn btn-success ms-2 rounded-1 px-3 py-2 bg-primary shadow"
            type="submit"
            onClick={submitHandler}
          >
            SEARCH
          </button>
          <ul className="navbar-nav ms-4 mb-3 mb-lg-0">
            <li className="nav-item">
              {userInfo ? (
                <NavDropdown title={
                <>
                  <i className="fas fa-user px-2 fs-4"></i> 
                  Hi, {camelize((userInfo.name).split(' ')[0])}
                </>
              } id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item> 
                </NavDropdown>
              ) : (
                <Link className="nav-link" to="/login">
                  <i className="fas fa-user px-2 fs-4"></i>
                  Login
                </Link>
              )}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart" tabIndex="-1">
                <i className="fas fa-shopping-cart px-1 fs-4"></i>
                Cart
                {itemCount > 0 && itemCount}
              </Link>
            </li>
            <li className="nav-item">
              {userInfo && userInfo.isAdmin ? (
                <NavDropdown title={
                  <>
                  <i className="fas fa-user-cog fs-4 px-1"></i>
                  Admin
                  </>
                  } id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) : 
              (
                <NavDropdown title={
                  <>
                  <i className="fas fa-info-circle fs-4 px-2"></i>
                  Help
                  </>
                  } id="adminmenu">
                  <LinkContainer to="">
                    <NavDropdown.Item>Nothing Here</NavDropdown.Item>
                  </LinkContainer>

                </NavDropdown>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
