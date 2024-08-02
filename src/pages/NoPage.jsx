import styled from 'styled-components';
import { useState, useEffect } from "react";
import { useNavigate,Link } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #1f2937;
    color: #ffffff;
    text-align: justify;
    padding: 20px;
    font-family: 'Comic Sans MS', 'Comic Sans', cursive;

    >div{
      width: 70%;
      /* background-color: red; */
      padding: 1em 3em;
    }
`;

const Title = styled.h1`
    font-size: 2em;
    margin-bottom: 0.5em;
`;

const Text = styled.p`
    font-size: 1.2em;
    margin-bottom: 1em;
    /* max-width: 600px; */
`;

const List = styled.ul`
    list-style: none;
    padding: 0;
`;

const ListItem = styled.li`
    margin: 10px 0;
`;

const StyledLink = styled(Link)`
    color: #e74c3c;
    text-decoration: none;
    font-weight: bold;
    &:hover {
        color: #ffffff;
    }
`;

const Image = styled.img`
    max-width: 100%;
    width: 30%;
    height: auto;
    margin-top: 20px;
    border: 5px solid #e74c3c;
    border-radius: 10px;
`;

const deadpoolPsMessages = [
  "You're probably lost because you're not as smart as me. I mean, I found the 404 page, and I'm basically a genius (in my own mind).",
  "Don't worry, the page you're looking for is probably hiding from you because it's afraid of your browser history.",
  "If you're reading this, it means you've finally found something more disappointing than my love life.",
  "404? More like 404-not-my-problem. Try refreshing, or better yet, try not being so clueless.",
  "On the bright side, you get to see my amazing 404 page, which is way more entertaining than whatever boring page you were looking for.",
  "I hope you enjoyed this detour into the abyss of broken links and shattered dreams.",
  "If you're still lost, don't worry, I'll send out a search party... or not. I have better things to do.",
  "You know what they say: 'A 404 page a day keeps the productivity at bay.' Keep up the good work!",
  "Don't worry, I won't tell anyone you got lost on the internet. Your secret is safe with me... and the millions of people who will read this."
];

export default function NoPage() {

  const [first, setFirst] = useState(deadpoolPsMessages[0])
  const navigate = useNavigate();
  
  // console.log(first)

  useEffect(()=>{
    let x =()=> Math.floor(Math.random()*deadpoolPsMessages.length)
    const interval = setInterval(()=>{
      setFirst(deadpoolPsMessages[x()])
    },7000)

    return ()=> clearInterval(interval)
  },[])
  
    return (
        <Container>
          <div>

            <Title>Congratulations, You Broke My Web App!</Title>
            <Text>
            Wow, you’ve really outdone yourself! You've managed to find the internet’s best-kept secret. This page is so hidden, it makes my stash look like a billboard. Nice going, Einstein.
            </Text>
            <Text>
            Did you fall asleep while typing or did a cat walk across your keyboard? Either way, you’ve ended up in the digital wasteland. But fear not! Deadpool is here to roast you while you figure out how to unfry your brain. <br />
            Here’s a master plan for you, my dear navigationally-challenged friend:
            </Text>
           
            <List>
                <ListItem>
                    <Text>
                        <strong>Check your URL:</strong> Seriously, how hard is it to type? It’s like you were aiming for a bullseye and hit the janitor.
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        <strong>Go back:</strong> Slam that back button like you’re trying to wake up from a bad dream.
                    </Text>
                </ListItem>
                <ListItem>
                    <Text>
                        <strong>Home sweet home:</strong> <StyledLink to="/dashboard/home">Click here</StyledLink>  It’s where all the cool kids hang out. Unlike you, apparently.
                    </Text>
                </ListItem>
            </List>
             <Text>Love, Deadpool</Text>
             <Text>&apos;&apos;{first}&apos;&apos;</Text>
           
          </div>

            <Image src={`https://qtubihsbqxewhrenphaz.supabase.co/storage/v1/object/public/asset/pngegg-removebg-preview.png`} alt="Deadpool" />
        </Container>
    );
}


