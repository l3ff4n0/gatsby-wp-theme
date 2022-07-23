import React from "react"
import { graphql } from "gatsby"

import Header from "../components/header/header"
import Main from "../components/main/main"
import Footer from "../components/footer/footer"

const DefaultPge = ({ data }) => {
  return (
    <div>
      BlogPost Single Page
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default DefaultPge