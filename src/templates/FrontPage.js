import React from "react"
import { graphql } from "gatsby"
import "../styles/common.scss"

import Header from "../components/header/header"
import Main from "../components/main/main"
import Footer from "../components/footer/footer"

const FrontPge = ({ data }) => {
  return (
    <div> 
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default FrontPge
