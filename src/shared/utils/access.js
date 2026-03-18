import { ROLES } from "../constants/roles";

export function isAdmin(role) {
  return role === ROLES.ADMIN;
}

export function canManageApplications(role) {
  return [ROLES.ADMIN].includes(role);
}

export function canCreateApplication(role) {
  return [ROLES.CUSTOMER, ROLES.ADMIN].includes(role);
}

export function canViewApplications(role) {
  return [ROLES.CUSTOMER, ROLES.ADMIN, ROLES.UNDERWRITER].includes(role);
}

export function canManageDocuments(role) {
  return [ROLES.ADMIN].includes(role);
}

export function canUploadDocuments(role) {
  return [ROLES.CUSTOMER, ROLES.ADMIN].includes(role);
}

export function canManageCards(role) {
  return [ROLES.ADMIN, ROLES.OPERATIONS, ROLES.OPERATIONS_FALLBACK].includes(role);
}

export function canViewCards(role) {
  return [ROLES.CUSTOMER, ROLES.ADMIN, ROLES.OPERATIONS, ROLES.OPERATIONS_FALLBACK].includes(role);
}

export function canManageAccounts(role) {
  return [ROLES.ADMIN, ROLES.OPERATIONS, ROLES.OPERATIONS_FALLBACK].includes(role);
}

export function canViewAccounts(role) {
  return [ROLES.CUSTOMER, ROLES.ADMIN, ROLES.OPERATIONS, ROLES.OPERATIONS_FALLBACK].includes(role);
}

export function canAuthorizeTransactions(role) {
  return [ROLES.CUSTOMER, ROLES.ADMIN].includes(role);
}

export function canPostTransactions(role) {
  return [ROLES.ADMIN, ROLES.BRANCH].includes(role);
}

export function canManageHolds(role) {
  return [ROLES.ADMIN, ROLES.BRANCH, ROLES.RISK].includes(role);
}

export function canGenerateStatements(role) {
  return [ROLES.ADMIN, ROLES.BRANCH].includes(role);
}

export function canCapturePayments(role) {
  return [ROLES.CUSTOMER, ROLES.ADMIN, ROLES.BRANCH].includes(role);
}
