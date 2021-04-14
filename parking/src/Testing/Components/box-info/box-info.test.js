import React from "react";
import { render, screen } from "@testing-library/react";

import PageHome from "../../../Pages/PageHome";

describe("Test no componente box-info", () => {
  test("should", () => {
    render(<PageHome />);
    const label = screen.getByTestId("title");
    expect(label).toBeEmptyDOMElement();
  });
});
