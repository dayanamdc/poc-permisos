import { validateAuthorization } from "./validateAuthorization";

describe("validateAuthorization", () => {
  it("allows a user with the required role", () => {
    expect(
      validateAuthorization(["SampleAdd", "Reader"], "SampleAdd"),
    ).toBeTrue();
  });

  it("denies a user without the required role or without claims", () => {
    expect(validateAuthorization(["Reader"], "SampleEdit")).toBeFalse();
    expect(validateAuthorization(undefined, "SampleEdit")).toBeFalse();
  });

  it("allows a route that has no role requirement", () => {
    expect(validateAuthorization(undefined, undefined)).toBeTrue();
  });
});
