import {
  css,
  FlattenInterpolation,
  ThemedStyledProps,
} from "styled-components";

export function hexToRgb(hex: string) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(
        result[3],
        16
      )}`
    : null;
}

export function hexToRgba(hex: string, opacity: string | number) {
  let result = hexToRgb(hex);
  if (!result) return null;
  return `${result},${opacity}`;
}

//eslint-disable-next-line
class AnyIfEmpty<T> {}
export const mxm = (
  width: number,
  rules: FlattenInterpolation<ThemedStyledProps<any, AnyIfEmpty<any>>>
) => css`
  @media screen and (max-width: ${width}px) {
    ${rules}
  }
`;
