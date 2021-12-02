import styled from "styled-components";
import noAvatar from "../assets/images/no_avatar.jpg";
import { Typography } from "@mui/material";

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  column-gap: 15px;
`;
const Figure = styled.figure<{ variant: "big" | "normal" }>`
  display: flex;
  align-items: center;
  margin: 0;
  width: ${(props) => (props.variant === "big" ? "40px" : "32px")};
  height: ${(props) => (props.variant === "big" ? "40px" : "32px")};
  border-radius: 50%;
  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Text = styled.text`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  text-align: right;
`;

export const Avatar: CT<{
  name?: string;
  isShowName?: boolean;
  variant?: "big" | "normal";
  src?: string;
  onClick?: VoidFunction;
}> = ({
  name = "",
  className,
  isShowName = true,
  variant = "normal",
  children,
  src = noAvatar,
  onClick = () => {},
}) => {
  const srcAvatar = src === "" || !src ? noAvatar : src;
  return (
    <Container className={className}>
      {isShowName && (
        <Typography noWrap component="div">
          {name}
        </Typography>
      )}
      <Figure onClick={onClick} variant={variant}>
        <img src={srcAvatar} alt={name} />
      </Figure>
    </Container>
  );
};
