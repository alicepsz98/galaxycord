import Head from "next/head";

function GlobalStyle() {
  return (
    <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }
      body {
        font-family: "Open Sans", sans-serif;
      }
      /* App fit Height */
      html,
      body,
      #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */
    `}</style>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Galaxycord</title>
        <link rel="icon" href="https://th.bing.com/th/id/R.353769621c0d0821cc759854eb517c2e?rik=Ll4vRHFxF1dUNA&pid=ImgRaw&r=0" />
      </Head>
      <Component {...pageProps} />
    </>
  )
};

export default MyApp;
