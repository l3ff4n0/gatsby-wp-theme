import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const Header = ({isHomePage, children}) => {
    const {
        wp: {
        generalSettings: { title },
        },
        allWpMenuItem: {
          edges: menuItems,
        },
      } = useStaticQuery(graphql`
        query HeaderQuery {
          wp {
            generalSettings {
              title
            }
          },
          allWpMenuItem(filter: {locations: {eq: PRIMARY}, parentDatabaseId: {eq: 0}}) {
            edges {
              node {
                id
                label
                childItems {
                  nodes {
                    label
                    target
                    url
                  }
                }
                url
                target
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
                {menuItems.map(({ node }) => (
                  <li className="primary-menu-item" key={node.id}>
                    <a href={node.url} target={node.target}>
                      {node.label}
                    </a>
                    {node.childItems.nodes.map(({ label, url, target }) => (
                      <ul className="primary-menu-sub-list" key={label}>
                        <li className="primary-menu-sub-item">
                          <a href={url} target={target}>
                            {label}
                          </a>
                          </li>
                      </ul>
                    ))}
                  </li>
                ))}
              </ul>
            </nav>
        </header>
        )
}

export default Header;
