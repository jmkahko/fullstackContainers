import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Todo from './Todo'

test('render content', () => {
  const todo = {
    text: 'Todo component test',
    done: false
  }

  render(<Todo todo={ todo } />)

  const element = screen.getByText('Todo component test')

  expect(element).toBeDefined()
});