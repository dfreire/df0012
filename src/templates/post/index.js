import React from 'react';
import { graphql } from 'gatsby';

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        language
      }
    }
  }
`;

export default ({ data }) => (
  <div>
    <h1>{data.markdownRemark.frontmatter.title}</h1>
    {console.log('data', data)}
    <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
  </div>
);
