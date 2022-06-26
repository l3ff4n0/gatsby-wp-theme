import React from "react";
import { useStaticQuery, graphql } from "gatsby";


const Footer = ({isHomePage, children}) => {
    const {
        allWpMenu: {
          edges: [{node: {menuItems}}],
        },
    } = useStaticQuery(graphql`
      query FooterQuery {
        allWpMenu(filter: {locations: {eq: FOOTER}}) {
          edges {
              node {
              id
              menuItems {
                  nodes {
                  label
                  url
                  target
                  }
              }
              }
          }
          }
      }
    `)
   return (
        <footer className="footer-section">
            <div className="footer-content">
              <nav className="footer-menu">
                <ul className="footer-menu-list">
                    {menuItems.nodes.map(({label, url, target}) => (
                        <li className="footer-menu-item" key={url}>
                        <a href={url} target={target}>{label}</a>
                        </li>
                    ))}
                </ul>
              </nav>
            </div>
             © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
        {` `}
        And <a href="https://wordpress.org/">WordPress</a>
      </footer>
        )
}

export default Footer;
