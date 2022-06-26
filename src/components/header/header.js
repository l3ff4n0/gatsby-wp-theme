import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const Header = ({isHomePage, children}) => {
    const {
        wp: {
        generalSettings: { title },
        },
        allWpMenu: {
          edges: [{node: {menuItems}}],
        },
      } = useStaticQuery(graphql`
        query HeaderQuery {
          wp {
            generalSettings {
              title
            }
          }
          allWpMenu(filter: {locations: {eq: PRIMARY}}) {
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
        <header className="global-heading">
            <h1 className="main-heading">{title}</h1>
            <nav className="primary-menu">
              <ul className="primary-menu-list">
                  {menuItems.nodes.map(({label, url, target}) => (
                      <li className="primary-menu-item" key={url}>
                      <a href={url} target={target}>{label}</a>
                      </li>
                  ))}
              </ul>
            </nav>
        </header>
        )
}

export default Header;
