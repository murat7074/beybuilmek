import React from 'react'
import { Helmet } from 'react-helmet'

const MetaData = ({ title, description, keywords, canonicalUrl, imageUrl }) => {
  return (
    <Helmet>
      <title>{`${title} - Beybuilmek`}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <meta property='og:title' content={`${title} - Beybuilmek`} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={window.location.href} />
      <meta property='og:image' content={imageUrl} />
      <link rel='canonical' href={canonicalUrl} />
    </Helmet>
  )
}

export default MetaData


