import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, createBrowserRouter } from "react-router-dom";
import Home from "../home";
import Layout from "../components/Layout";

function RouterManeger(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element= {<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
export default RouterManeger;