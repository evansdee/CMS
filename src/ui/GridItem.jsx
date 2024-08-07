import styled from "styled-components";

const GridItem = styled.div`
  background-color: var(--color-grey-100);
  padding: 1em;
  border-radius: 30px;
  /* display: flex;
  align-items: center;
  justify-content: center; */
  font-size: 1.2em;
  color: var(--color-grey-800);
  border: 1px solid var(--color-grey-50);

  &.item1 {
    grid-column: 1 / 4;
    grid-row: 1 / 4;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 0.5em;
    justify-content: center;

    img {
      width: 100px; /* Adjust the size as needed */
      height: 100px; /* Ensure it's a square */
      border-radius: 50%;
      object-fit: cover; /* Ensures the image covers the entire area */
      overflow: hidden;
    }

    @media (max-width: 1200px) {
      grid-column: 1 / -1;
      grid-row: 1 / 2;
    }

    @media (max-width: 768px) {
      grid-column: 1 / -1;
      grid-row: 1 / 2;
    }

    @media (max-width: 480px) {
      grid-column: 1 / -1;
      grid-row: 1 / 2;
    }
  }

  &.item2 {
    grid-column: 1 / 4;
    grid-row: 4 / -1;
    display: flex;
    /* align-items: center; */
    flex-direction: column;
    gap: 1em;
    justify-content: center;

    @media (max-width: 1200px) {
      grid-column: 1 / -1;
      grid-row: 2 / 3;
    }

    @media (max-width: 768px) {
      grid-column: 1 / -1;
      grid-row: 2 / 3;
    }

    @media (max-width: 480px) {
      grid-column: 1 / -1;
      grid-row: 2 / 3;
    }
  }

  &.item3 {
    grid-column: 4 / -1;
    grid-row: 1 / 3;
    display: flex;
    /* align-items: center; */
    flex-direction: column;
    gap: 2em;
    justify-content: center;

    @media (max-width: 1200px) {
      grid-column: 1 / -1;
      grid-row: 3 / 4;
    }

    @media (max-width: 768px) {
      grid-column: 1 / -1;
      grid-row: 3 / 4;
    }

    @media (max-width: 480px) {
      grid-column: 1 / -1;
      grid-row: 3 / 4;
    }
  }

  &.item4 {
    grid-column: 4 / 6;
    grid-row: 3 / -1;
    display: flex;
    /* align-items: center; */
    flex-direction: column;
    gap: 2em;
    justify-content: center;

    @media (max-width: 1200px) {
      grid-column: 1 / -1;
      grid-row: 4 / 5;
    }

    @media (max-width: 768px) {
      grid-column: 1 / -1;
      grid-row: 4 / 5;
    }

    @media (max-width: 480px) {
      grid-column: 1 / -1;
      grid-row: 4 / 5;
    }
  }

  &.item5 {
    grid-column: 6 / 8;
    grid-row: 3 / -1;

    @media (max-width: 1200px) {
      grid-column: 1 / -1;
      grid-row: 5 / 6;
    }

    @media (max-width: 768px) {
      grid-column: 1 / -1;
      grid-row: 5 / 6;
    }

    @media (max-width: 480px) {
      grid-column: 1 / -1;
      grid-row: 5 / 6;
    }
  }
`;

export default GridItem;
