module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true, // defaults to false
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `sound`,
        path: `${__dirname}/src/sound/`,
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-netlify-cms`,
  ],
};
