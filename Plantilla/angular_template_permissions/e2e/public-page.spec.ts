import { expect, test } from "@playwright/test";

test("renders the public not-found page without a browser error", async ({
  page,
}) => {
  const errors: Error[] = [];
  page.on("pageerror", (error) => errors.push(error));

  await page.goto("/not-found");
  await expect(
    page.getByRole("heading", { name: "Sorry, the page was not found" }),
  ).toBeVisible();
  expect(errors.map((error) => error.message)).toEqual([]);
});
