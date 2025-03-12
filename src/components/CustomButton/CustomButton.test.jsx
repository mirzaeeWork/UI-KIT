// import { render, fireEvent } from '@testing-library/react'
// import { expect, test } from 'vitest'
// import Button from "./Button";

// test('renders name', async () => {
//   const { getByText, getByRole } = render(<Button />)

//   // بررسی مقدار اولیه
//   expect(getByText("Clicked 0 times")).toBeInTheDocument()
  
//   // کلیک روی دکمه
//   const button = getByRole('button', { name: "Click me" })
//   fireEvent.click(button)

//   // بررسی مقدار بعد از کلیک
//   expect(getByText("Clicked 1 times")).toBeInTheDocument()
// })

import { render, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import CustomButton from './CustomButton';

test('renders button with text, handles click, and supports additional props', () => {
  const handleClick = vi.fn(); // تابع ماک‌شده برای بررسی کلیک
  const { getByRole } = render(
    <CustomButton
      className="bg-blue-500 text-white px-4 py-2 rounded transition"
      onClick={handleClick}
      data-testid="custom-button"
    >
      Click me
    </CustomButton>
  );

  const button = getByRole('button', { name: /Click me/i });

  // بررسی وجود دکمه در DOM
  expect(button).toBeInTheDocument();

  // بررسی کلاس‌های اعمال‌شده
  expect(button).toHaveClass('bg-blue-500', 'text-white px-4 py-2 rounded transition');

  // بررسی ویژگی‌های اضافی
  expect(button).toHaveAttribute('data-testid', 'custom-button');

  // بررسی عملکرد کلیک
  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(1); // اطمینان از این که کلیک ثبت شده است
});

test('updates button text after click using rerender', () => {
  let count = 0;
  let text = `Click ${count} me`;

  const handleClick = () => {
    count++;
    text = `Clicked ${count} times`;
  };

  const { getByRole, getByText, rerender } = render(
    <CustomButton onClick={handleClick}>{text}</CustomButton>
  );

  const button = getByRole('button', { name: /Click 0 me/i });

  // بررسی مقدار اولیه
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent('Click 0 me');

  // کلیک روی دکمه
  fireEvent.click(button);

  // رندر مجدد با مقدار جدید
  rerender(<CustomButton onClick={handleClick}>{text}</CustomButton>);

  // بررسی مقدار بعد از کلیک
  expect(getByText(/Clicked 1 times/i)).toBeInTheDocument();
});
