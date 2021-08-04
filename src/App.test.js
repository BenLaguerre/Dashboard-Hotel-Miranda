import { render, screen } from '@testing-library/react';
import App from './App';
import Button from './components/Button';
import styled from "styled-components";

test('The color is red', () => {
  render(
      <Button name="Booked" color="red"/>
  )  
  expect(screen.queryByText('Booked')).toHaveStyle('background : red')
});

test('The color is green', () => {
  render(
      <Button name="Available" color="green"/>
  )  
  expect(screen.queryByText('Available')).toHaveStyle('background : green')
});

