import styled from "styled-components";
import { FontWeight } from "./constant";

export const FlexBox = styled.div<{
  width?: string;
  flexDirection?: "row" | "column";
  justifyContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around";
  alignItems?: "flex-start" | "center" | "flex-end";
}>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || "row"};
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  align-items: ${(props) => props.alignItems || "flex-start"};
  ${(props) => (props.width ? `width: ${props.width};` : "")}
`;
export const Section = styled(FlexBox)<{
  height?: number;
}>`
  position: relative;
  ${(props) => (props.height ? `height:${props.height}px;` : "")}
`;
export const Layout = styled(FlexBox)<{
  height?: number;
  section?: number;
  scrollPosition?: number;
}>`
  width: 100%;
  ${(props) =>
    props.height ? `height:${props.height * props.section}px;` : ""}
  background-color: ${(props) => {
    const currentPage = props.scrollPosition / props.height;
    if (currentPage < 0.5) {
      return "#8701eb";
    } else if (currentPage < 1.5) {
      return "#eb0165";
    } else if (currentPage < 2.5) {
      return "#65eb01";
    } else if (currentPage < 3.5) {
      return "#01eb87";
    } else {
      return "#fff";
    }
  }};
  transition: background-color 1s ease;
`;
export const Text = styled(FlexBox)<{
  size?: number;
  weight?: FontWeight;
  textAlign?: "left" | "center" | "right";
  margin?: string;
}>`
  font-size: ${(props) => (props.size || 1) * 1}rem;
  font-weight: ${(props) => props.weight || FontWeight.regular};
  text-align: ${(props) => props.textAlign || "left"};
  margin: ${(props) => props.margin || "0px"};
`;

export const Hilight = styled(Text)<{
  bgColor: string;
}>`
  background-color: ${(props) => props.bgColor || "transparent"};
`;

export const NextPageButton = styled.div<{ showGoDown: boolean }>`
  display: block;
  border-radius: 50%;
  border: 0;
  background-color: transparent;
  position: fixed;
  bottom: 30px;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 1;
  cursor: pointer;
  ${(props) => (props.showGoDown ? `cursor: default;opacity: 0;` : "")}
  :hover {
    font-size: 120%;
  }
  transition: visibility 0s, opacity 0.5s linear, font-size 1s ease;
`;
