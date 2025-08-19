import App from "./App";
import {render} from "@testing-library/react";
import '@testing-library/jest-dom';

//MY-NOTE-2
test('renders learn react link', () => {
  const {getByText} = render(<App/>);
  //MY-NOTE-3 , MY-NOTE-4
  const linkElement = getByText(/learn react link/i);
  //MY-NOTE-5 , MY-NOTE-6
  expect(linkElement).toBeInTheDocument();
})

// MY-NOTE-2
// 'renders learn react link'
// Это название теста.
// Если тест упадёт, то в консоли будет +-сообщение которое говорит об этом

// MY-NOTE-3
// getByText
// Это утилита React Testing Library (@testing-library/react),
// которая ищет DOM-элемент по тексту, при этом текст должен полностью
// соответствовать шаблону поиска, но может находиться в начале, середине или в конце строки.

// MY-NOTE-4
// /learn react link/i
// Это регулярное выражение (RegExp), используемое
// для поиска текста в строке или DOM.
// Флаг i (в конце)
// i = ignore case — игнорировать регистр букв.
// То есть, поиск будет успешен для "Learn React Link", "learn react link" или "LEARN REACT LINK".

//MY-NOTE-5
// expect()
// Это функция из Jest или Vitest, которая создаёт ожидание (value) для значения.
// Возвращает объект, на котором можно вызвать матчеры (matchers), чтобы проверить это значение.
// expect() говорит: "я ожидаю, что это значение будет соответствовать условию, заданному
// матчером(матчеры (toBe, toBeInTheDocument, toHaveTextContent и т.д.))".

// MY-NOTE-6
// .toBeInTheDocument()
// Это матчер из @testing-library/jest-dom.
// Используется вместе с expect().
// Проверяет, что элемент существует в DOM после рендеринга.