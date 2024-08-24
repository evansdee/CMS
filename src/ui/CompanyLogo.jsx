import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src='https://qtubihsbqxewhrenphaz.supabase.co/storage/v1/object/public/asset/JINSR-logo-200x200.jpg' alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
