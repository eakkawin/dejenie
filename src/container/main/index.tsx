import React, { useEffect, useState } from "react";
import { FontWeight } from "./constant";
import { FlexBox, Hilight, Layout, Section, Text } from "./style";
import { graphql, useStaticQuery } from "gatsby";

const MainContainer = () => {
  const [height, setHeight] = useState<number>(window.innerHeight);
  const [width, setWidth] = useState<string>(`${window.innerWidth}px`);
  const [scrollPosition, setScrollPosition] = useState<number>(window.scrollY);
  const [openSong, setOpenSong] = useState<boolean>(false);
  const data = useStaticQuery(graphql`
    {
      allFile(filter: { extension: { eq: "mp3" } }) {
        edges {
          node {
            publicURL
            name
          }
        }
      }
    }
  `);
  useEffect(() => {
    window.onscroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.onresize = () => {
      setHeight(window.innerHeight);
      setWidth(`${window.innerWidth}px`);
    };
  }, []);
  useEffect(() => {
    if (scrollPosition / height > 3.5) {
      setOpenSong(true);
    } else {
      setOpenSong(false);
    }
  }, [scrollPosition, height]);
  return (
    <Layout
      flexDirection="column"
      height={height}
      section={5}
      scrollPosition={scrollPosition}
    >
      <Section
        flexDirection="column"
        justifyContent="center"
        width={width}
        height={height}
      >
        <Text margin="0px 2rem" size={0.5} weight={FontWeight.regular}>
          1ST
        </Text>
        <Text margin="0px 2rem" size={1} weight={FontWeight.bold}>
          WELCOME PEOPLE.
        </Text>
      </Section>
      <Section
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width={width}
        height={height}
      >
        <Text size={1} weight={FontWeight.regular}>
          2ND
        </Text>
        <Text size={2} weight={FontWeight.bold}>
          WHAT DO YOU WANT ?
        </Text>
      </Section>
      <Section
        flexDirection="column"
        justifyContent="center"
        alignItems="flex-end"
        width={width}
        height={height}
      >
        <Text margin="0px 2rem" size={2} weight={FontWeight.regular}>
          3RD
        </Text>
        <Text margin="0px 2rem" size={3} weight={FontWeight.bold}>
          TODAY IS YOUR BIRTHDAY !?
        </Text>
      </Section>
      <Section
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width={width}
        height={height}
      >
        <Text size={3} weight={FontWeight.regular}>
          4TH
        </Text>
        <Text size={4} weight={FontWeight.bold}>
          JUST MOMENT...
        </Text>
      </Section>
      <Section
        flexDirection="column"
        justifyContent="space-around"
        alignItems="center"
        width={width}
        height={height}
      >
        <Text
          justifyContent="center"
          width={width}
          size={4}
          weight={FontWeight.regular}
        >
          5TH
        </Text>
        <FlexBox>
          <Hilight
            textAlign="center"
            size={5}
            weight={FontWeight.bold}
            bgColor="#eb0165"
          >
            HAPPY BIRTHDAY
          </Hilight>
          <Hilight
            textAlign="center"
            bgColor="#65eb01"
            size={5}
            weight={FontWeight.bold}
          >
            MY LOVELY FRIEND.
          </Hilight>
        </FlexBox>
        {openSong ? (
          data.allFile.edges.map((file, index) => {
            return (
              <audio autoPlay controls loop src={file.node.publicURL}>
                Your browser does not support the
                <code>audio</code> element.
              </audio>
            );
          })
        ) : (
          <></>
        )}
      </Section>
    </Layout>
  );
};

export default MainContainer;
