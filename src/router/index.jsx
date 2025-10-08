import React from "react";
import { BrowserRouter, Routes, Route, createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../Home";

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