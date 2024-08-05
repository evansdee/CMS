import styled from 'styled-components';
import FormRow from '../ui/FormRow';
import Input from '../ui/Input';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 10px;
  height: 80vh;
  width: 80dvw;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(7, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(7, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(10, 1fr);
  }
`;

const GridItem = styled.div`
  background-color: var(--color-grey-100);
  padding:1em;
  border-radius: 30px;
  /* display: flex;
  align-items: center;
  justify-content: center; */
  font-size: 1.5em;
  color: var(--color-grey-800);
  border: 1px solid var(--color-grey-50);

  &.item1 {
    grid-column: 1 / 4;
    grid-row: 1 / 4;

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

const Test = () => (
  <GridContainer>
    <GridItem className="item1">
        <FormRow label="Enter name">
        <Input/>
        </FormRow>
        <FormRow label="Enter name">
        <Input/>
        </FormRow>
    </GridItem>
    <GridItem className="item2">Span Half</GridItem>
    <GridItem className="item3">Span Rest</GridItem>
    <GridItem className="item4">Item 1</GridItem>
    <GridItem className="item5">Item 2</GridItem>
  </GridContainer>
);

export default Test;
