export function validateAuthorization(
  allowedRoles: readonly string[] | undefined,
  expectedRole: string | undefined,
): boolean {
  return expectedRole === undefined || !!allowedRoles?.includes(expectedRole);
}
