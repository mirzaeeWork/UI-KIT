import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import ButtonUiKit from './ButtonUiKit';

test('renders button with text, handles click, and supports additional props', () => {
  const handleClick = vi.fn(); // تابع ماک‌شده برای بررسی کلیک
  const { getByRole } = render(
    <ButtonUiKit
      onClick={handleClick}
      data-testid="custom-button"
    >
      Click me
    </ButtonUiKit>
  );

  const button = getByRole('button', { name: /Click me/i });

  // بررسی وجود دکمه در DOM
  expect(button).toBeInTheDocument();


  // بررسی ویژگی‌های اضافی
  expect(button).toHaveAttribute('data-testid', 'custom-button');

  // بررسی عملکرد کلیک
  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(1); // اطمینان از این که کلیک ثبت شده است
});
