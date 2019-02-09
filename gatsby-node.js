const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'posts' });
    actions.createNodeField({ node, name: 'slug', value: slug });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  result.data.allMarkdownRemark.edges.forEach(({ node: post }) => {
    actions.createPage({
      path: `posts${post.fields.slug}`,
      component: path.resolve('src', 'templates', 'post', 'index.js'),
      context: {
        slug: post.fields.slug,
      },
    });
  });
};
