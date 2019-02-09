import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import Header from './header';
import './layout.css';

const getSiteMetadata = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        author
      }
    }
  }
`;

const Layout = ({ children }) => (
  <StaticQuery
    query={getSiteMetadata}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
        >
          <main>{children}</main>
          <footer>
            {data.site.siteMetadata.author} © {new Date().getFullYear()}
          </footer>
        </div>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
