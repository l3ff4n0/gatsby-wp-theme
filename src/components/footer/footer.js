import React from "react";
import { useStaticQuery, graphql } from "gatsby";


const Footer = ({isHomePage, children}) => {
    const {
      wp: {
        general: {
          phoneNumber
        }
      },
      allWpMenuItem: {
        edges: menuItems,
      },
    } = useStaticQuery(graphql`
      query FooterQuery {
        wp {
          general {
            phoneNumber
          }
        },
        allWpMenuItem(filter: {locations: {eq: FOOTER}, parentDatabaseId: {eq: 0}}) {
            edges {
              node {
                id
                label
                url
                target
              }
            }
          }
      }
    `)
   return (
        <footer className="footer-section">
            <div className="footer-content">
              {menuItems.length > 0 && (
                <nav className="footer-menu">
                  <ul className="footer-menu-list">
                    {menuItems.map(({ node }) => (
                      <li className="footer-menu-item" key={node.id}>
                        <a href={node.url} target={node.target}>
                          {node.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
             © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
        {` `}
        And <a href="https://wordpress.org/">WordPress {phoneNumber}</a>
      </footer>
        )
}

export default Footer;
