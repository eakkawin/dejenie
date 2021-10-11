import React, { useEffect, useState } from "react";
import { FontWeight } from "./constant";
import {
  FlexBox,
  Hilight,
  Layout,
  Section,
  Text,
  NextPageButton,
} from "./style";
import { graphql, useStaticQuery } from "gatsby";

const MainContainer = () => {
  useEffect(() => {
    if (typeof window !== `undefined`) {
      setHeight(window.innerHeight);
      setWidth(`${window.innerWidth}px`);
      setLoading(false);
      window.onscroll = () => {
        setScrollPosition(window.scrollY);
      };
      window.onresize = () => {
        setHeight(window.innerHeight);
        setWidth(`${window.innerWidth}px`);
      };
    }
  }, []);

  const [loading, setLoading] = useState<boolean>(true);
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<string>(`${0}px`);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const [openSong, setOpenSong] = useState<boolean>(false);
  const [showGoDown, setShowGoDown] = useState<boolean>(true);
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
    const onLastPage = scrollPosition / height > 3.5;
    setOpenSong(onLastPage);
    setShowGoDown(onLastPage);
  }, [scrollPosition, height]);

  const moveToNextPage = () => {
    if (scrollPosition / height < 3.5) {
      const page = Math.floor(scrollPosition / height) + 1;
      window.scrollTo({
        top: height * page,
        behavior: "smooth",
      });
    }
  };

  return loading ? (
    <FlexBox width="100%" justifyContent="center">
      <Text size={2}>loading...</Text>
    </FlexBox>
  ) : (
    <Layout
      flexDirection="column"
      height={height}
      section={5}
      scrollPosition={scrollPosition}
    >
      <Section
        id="1ST"
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
        <NextPageButton
          showGoDown={showGoDown}
          onClick={() => moveToNextPage()}
        >
          GO DOWN
        </NextPageButton>
      </Section>
      <Section
        id="2ND"
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
          TODAY IS YOUR BIRTHDAY !?
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
          LET ME PREPARE SOMETHING FOR YOU
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
          <Text textAlign="center" size={5} weight={FontWeight.bold}>
            HAPPY BIRTHDAY
          </Text>
          <Hilight
            textAlign="center"
            bgColor="#ff8c00"
            size={5}
            weight={FontWeight.bold}
          >
            MY LOVELY FRIEND.
          </Hilight>
        </FlexBox>
        {openSong ? (
          data.allFile.edges.map((file) => {
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
