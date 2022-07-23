/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require(`path`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const BlogPostTemplate = path.resolve("./src/templates/BlogPost.js")
  const PageTemplate = path.resolve("./src/templates/page.js")

  const result = await graphql(`
    {
        allWpPost {
        edges {
          node {
            slug
            id
          }
        }
      }
      allWpPage {
        edges {
          node {
            id
            uri
            template {
              templateName
            }
            isFrontPage
            status
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const BlogPosts = result.data.allWpPost.edges
  BlogPosts.forEach(post => {
    createPage({
      path: `/post/${post.node.slug}`,
      component: BlogPostTemplate,
      context: {
        id: post.node.id,
      },
    })

    const Pages = result.data.allWpPage.edges
    Pages.forEach(page => {
      const tplPage = (page.node.isFrontPage) ? path.resolve("./src/templates/FrontPage.js") : path.resolve("./src/templates/"+ page.node.template.templateName.replace(/\s/g, '') +".js")   
      createPage({
        path: page.node.uri,
        component: tplPage,
        context: {
          id: page.node.id,
        },
      })
    })
  })
}