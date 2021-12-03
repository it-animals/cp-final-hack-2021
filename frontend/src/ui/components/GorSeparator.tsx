import styled from "styled-components";
import { hexToRgba } from "../styles/_mixin";

const Element = styled.div`
  width: 20px;
  height: 1px;
  background-color: rgba(${hexToRgba("#504D74", 0.15)}); ;
`;
export const GorSeparator: CT<{ mrn: number; width: number }> = ({
  width,
  mrn,
}) => {
  return <Element style={{ width: width, margin: `${mrn}px 0` }} />;
};
