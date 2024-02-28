
import React from "react";

import { memo } from "react";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { Helmet } from "react-helmet";
import toast, { Toaster } from 'react-hot-toast';

export const Layout = memo(({ children, title, description, keywords, author }) => {
    return (
      <div style={{width : "100%"}}>
        <Helmet>
          <meta charSet="utf-8" />

          <div>
            <meta name="description" content={ description } />
            <meta name="keywords" content={ keywords } />
            <meta name="author" content={ author } />
          </div>
          <title>{ title }</title>
        </Helmet>
        <Header text={"rerender"} />
        
        <main style={{

          minHeight : "70vh",
        }}>
          <Toaster />
          { children }
        </main>
        <Footer />
      </div>
    )
})

// Adding default props in the component

// functionName.defaultProps = {

// }

Layout.defaultProps = {
  title : "rR e-Com",
  description : "e-Commerce store for all items",
  keywords : "Clothes, Shirt, T-Shirt, Paints, Jeans",
  author : "rRathor"
}