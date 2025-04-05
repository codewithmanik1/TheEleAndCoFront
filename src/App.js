import React from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import "./App.css";
import CodingGranthaClientWeb from "./CodingGranthaClientWeb/CodingGranthaClientWeb";
import store from "./store/Store";
import SecurityFeatures from "./auth/SecurityFeatures";
import { BrowserRouter } from "react-router-dom";

function AppContent() {
  return (
    <div className="text-gray-600 font-playfair">
      {/* {isLoggedIn ? <Layout /> : <Login />} */}
      {/* <Layout /> */}
      {/* <WebMainPage />  */}
      {/* codinggrantha */}
      <SecurityFeatures /> 
      <CodingGranthaClientWeb />
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
        <AppContent />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
