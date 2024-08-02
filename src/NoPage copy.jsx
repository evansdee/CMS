import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Flex from "./ui/Flex";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1f2937;
  color: #ffffff;
  text-align: center;
  /* padding: 1.5em; */
  font-family: "Comic Sans MS", "Comic Sans", cursive;
  /* overflow: hidden; */
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 0.5em;
`;

const Text = styled.p`
  font-size: 1.2em;
  margin-bottom: 1em;
  max-width: 600px;
`;

const List = styled.ul`
  list-style: disc;
  padding: 0;
`;

const ListItem = styled.li`
  margin: 10px 0;
`;

const Link = styled.button`
  color: #e74c3c;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    color: #ffffff;
  }
`;

export default function NoPage() {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <Flex align="center" gap="2em">
          <img
            src="https://qtubihsbqxewhrenphaz.supabase.co/storage/v1/object/public/asset/pngegg-removebg-preview.png"
            alt=""
          />

          <div>
            <Title>Oopsie Daisy!</Title>
            <Text>
              Hey there, beautiful! Yeah, you. The one with the confused look on
              your face. Looks like you took a wrong turn at Albuquerque. This
              page is more elusive than a unicorn on a pogo stick.
            </Text>
            <Text>
              But fear not! Deadpool is here to guide you back to safety. Well,
              not really. I’m just here to entertain you while you figure out
              where you went wrong. Or just stick around and we can chat about
              life, love, and why tacos are the meaning of existence. Your call.
            </Text>
            <Text>Love, Deadpool</Text>
            <Text>
              P.S. If you find this page again, you might just win a prize!
              (Just kidding, there's no prize. But it’s fun to think about,
              right?)
            </Text>
            <List>
              <ListItem>
                <Text>
                  <strong>Check your URL:</strong> Maybe you fat-fingered it.
                  Happens to the best of us.
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  <strong>Go back:</strong> Hit that back button like you mean
                  it!
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  <strong>Home sweet home:</strong>{" "}
                  <Link onClick={() => navigate("/")}>Click here</Link> to
                  return to the homepage. Trust me, it’s way cooler.
                </Text>
              </ListItem>
            </List>
          </div>
        </Flex>
      </Container>
    </>
  );
}
