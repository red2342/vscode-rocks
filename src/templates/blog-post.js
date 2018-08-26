import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import styled from 'styled-components'
import favicon from '../favicon.ico'

const BlogPostContainer = styled.div`
  margin: 0 80px;

  p {
    line-height: 1.6;
  }

  .topImg {
    margin: 0 100px;
  }

  @media (max-width: 700px) {
    margin: 0 10px;

    .topImg {
      margin: 0;
    }
  }

  article {
    img {
      max-width: 100%;
    }
  }
`

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <BlogPostContainer>
        <Helmet
          title={`${post.frontmatter.title} | ${siteTitle}`}
          link={[{ rel: 'shortcut icon', href: `${favicon}` }]}
        />
        <h1 style={{ textAlign: 'center' }}>{post.frontmatter.title}</h1>
        <p
          style={{
            display: 'block',
            textAlign: 'center',
          }}
        >
          {post.frontmatter.date}
        </p>
        <Img
          className="topImg"
          sizes={post.frontmatter.image.childImageSharp.sizes}
        />
        <article dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr style={{}} />
        <p style={{ textAlign: 'center' }}>
          Stay tuned to the next issue, next Sunday
        </p>
      </BlogPostContainer>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        image {
          childImageSharp {
            sizes(maxWidth: 2000) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`
