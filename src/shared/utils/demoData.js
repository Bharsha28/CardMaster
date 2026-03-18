const DEMO_STATE_KEY = "cardmaster_demo_state";
const DEMO_USER_EMAIL = "demo@cardmaster.com";
const DEMO_USER_PASSWORD = "demo12345";

const DEMO_CREDENTIALS = [
  { role: "ADMIN", email: DEMO_USER_EMAIL, password: DEMO_USER_PASSWORD, name: "Demo Admin", phone: "9999999999" },
  { role: "CUSTOMER", email: "customer@cardmaster.com", password: "customer123", name: "Aarav Sharma", phone: "9876500001" },
  { role: "OFFICER", email: "officer@cardmaster.com", password: "officer123", name: "Branch Officer", phone: "9876500002" },
  { role: "UNDERWRITER", email: "underwriter@cardmaster.com", password: "under123", name: "Casey Underwriter", phone: "9876500003" },
  { role: "RISK", email: "risk@cardmaster.com", password: "risk12345", name: "Risk Analyst", phone: "9876500004" },
  {
    role: "OPERATIONS_ANALYST",
    email: "operations@cardmaster.com",
    password: "ops12345",
    name: "Operations Analyst",
    phone: "9876500005",
  },
];

const defaultState = {
  users: DEMO_CREDENTIALS.map((entry, index) => ({
    userId: index + 1,
    name: entry.name,
    email: entry.email,
    phone: entry.phone,
    role: entry.role,
    password: entry.password,
  })),
  auditLogs: [
    {
      id: 1,
      username: "Demo Admin",
      action: "LOGIN",
      description: "Demo user login",
      timestamp: new Date().toISOString(),
    },
  ],
  customers: [
    {
      customerId: 1,
      userId: 2,
      name: "Aarav Sharma",
      dob: "1992-08-12",
      income: 950000,
      employmentType: "SALARIED",
      status: "ACTIVE",
      contactInfo: {
        email: "aarav@example.com",
        phone: "9876500001",
        address: "Bengaluru",
      },
    },
  ],
  applications: [
    {
      applicationId: 1,
      customerId: 1,
      productId: 1,
      requestedLimit: 250000,
      applicationDate: "2026-03-10",
      status: "APPROVED",
    },
  ],
  documents: [
    {
      documentId: 1,
      applicationId: 1,
      documentType: "IdentityProof",
      fileURI: "demo://aadhaar.pdf",
      uploadedDate: "2026-03-10",
      status: "VERIFIED",
    },
  ],
  products: [
    {
      productId: 1,
      name: "Signature Plus",
      category: "Gold",
      interestRate: 3.25,
      annualFee: 1999,
      status: "ACTIVE",
    },
  ],
  fees: [
    {
      feeId: 1,
      productId: 1,
      feeType: "ANNUAL",
      amount: 1999,
    },
  ],
  cards: [
    {
      cardId: 1,
      applicationId: 1,
      customerId: 1,
      productId: 1,
      maskedCardNumber: "4111 XXXX XXXX 1111",
      expiryDate: "2029-12-31",
      status: "ACTIVE",
    },
  ],
  accounts: [
    {
      accountId: 1,
      cardId: 1,
      applicationId: 1,
      creditLimit: 250000,
      availableLimit: 220000,
      openDate: "2026-03-12",
      status: "ACTIVE",
    },
  ],
  transactions: [
    {
      transactionId: 1,
      accountId: 1,
      amount: 30000,
      currency: "INR",
      merchant: "Demo Store",
      channel: "ONLINE",
      transactionDate: new Date().toISOString(),
      status: "POSTED",
    },
  ],
  holds: [
    {
      holdId: 1,
      transactionId: 1,
      amount: 30000,
      holdDate: new Date().toISOString(),
      releaseDate: null,
    },
  ],
  statements: [
    {
      statementId: 1,
      accountId: 1,
      periodStart: "2026-03-01",
      periodEnd: "2026-03-31",
      totalDue: 30000,
      minimumDue: 3000,
      generatedDate: "2026-03-31",
      status: "OPEN",
    },
  ],
  payments: [
    {
      paymentId: 1,
      accountId: 1,
      statementId: 1,
      amount: 5000,
      paymentDate: new Date().toISOString(),
      method: "UPI",
      status: "COMPLETED",
    },
  ],
};

export function getDemoCredentials() {
  return {
    email: DEMO_USER_EMAIL,
    password: DEMO_USER_PASSWORD,
  };
}

export function getAllDemoCredentials() {
  return DEMO_CREDENTIALS.map(({ role, email, password }) => ({ role, email, password }));
}

export function createDemoToken(user) {
  const state = getDemoState();
  const customer = state.customers.find((item) => item.userId === user.userId);
  const header = toBase64Url(JSON.stringify({ alg: "none", typ: "JWT" }));
  const payload = toBase64Url(
    JSON.stringify({
      sub: user.name,
      userId: user.userId,
      email: user.email,
      role: user.role,
      customerId: customer?.customerId || null,
      demo: true,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    }),
  );

  return `Bearer ${header}.${payload}.demo`;
}

export function isDemoToken(token) {
  if (!token) {
    return false;
  }

  try {
    const payload = JSON.parse(atob(token.replace(/^Bearer\s+/i, "").split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    return Boolean(payload.demo);
  } catch {
    return false;
  }
}

export function getDemoState() {
  const saved = localStorage.getItem(DEMO_STATE_KEY);
  if (!saved) {
    localStorage.setItem(DEMO_STATE_KEY, JSON.stringify(defaultState));
    return structuredClone(defaultState);
  }

  const parsed = JSON.parse(saved);
  const merged = mergeDemoState(parsed);
  localStorage.setItem(DEMO_STATE_KEY, JSON.stringify(merged));
  return merged;
}

export function saveDemoState(state) {
  localStorage.setItem(DEMO_STATE_KEY, JSON.stringify(state));
}

export function loginDemoUser(credentials) {
  const state = getDemoState();
  const user = state.users.find((item) => item.email === credentials.email && item.password === credentials.password);
  if (!user) {
    return null;
  }

  state.auditLogs.unshift({
    id: nextId(state.auditLogs, "id"),
    username: user.name,
    action: "LOGIN",
    description: "Demo login",
    timestamp: new Date().toISOString(),
  });
  saveDemoState(state);
  return createDemoToken(user);
}

export function registerDemoUser(payload) {
  const state = getDemoState();
  const user = {
    userId: nextId(state.users, "userId"),
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    role: payload.role || "CUSTOMER",
    password: payload.password,
  };
  state.users.push(user);
  if (user.role === "CUSTOMER") {
    state.customers.push({
      customerId: nextId(state.customers, "customerId"),
      userId: user.userId,
      name: user.name,
      dob: "1995-01-01",
      income: 0,
      employmentType: "SALARIED",
      status: "ACTIVE",
      contactInfo: {
        email: user.email,
        phone: user.phone,
        address: "",
      },
    });
  }
  state.auditLogs.unshift({
    id: nextId(state.auditLogs, "id"),
    username: user.name,
    action: "REGISTER",
    description: "Demo registration",
    timestamp: new Date().toISOString(),
  });
  saveDemoState(state);
  return user;
}

export function listDemo(resource) {
  return getDemoState()[resource] || [];
}

export function getCurrentDemoUser(token) {
  if (!token) {
    return null;
  }

  try {
    const payload = JSON.parse(atob(token.replace(/^Bearer\s+/i, "").split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    return {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
      customerId: payload.customerId,
      name: payload.sub,
    };
  } catch {
    return null;
  }
}

export function getDemoCustomerForUser(token) {
  const currentUser = getCurrentDemoUser(token);
  if (!currentUser) {
    return null;
  }

  const state = getDemoState();
  if (currentUser.customerId) {
    return state.customers.find((item) => item.customerId === currentUser.customerId) || null;
  }
  return state.customers.find((item) => item.userId === currentUser.userId) || null;
}

export function getDemoItem(resource, idField, id) {
  return listDemo(resource).find((item) => String(item[idField]) === String(id));
}

export function upsertDemoItem(resource, idField, payload) {
  const state = getDemoState();
  const list = state[resource];
  const item = {
    ...payload,
    [idField]: payload[idField] || nextId(list, idField),
  };
  const index = list.findIndex((entry) => String(entry[idField]) === String(item[idField]));
  if (index >= 0) {
    list[index] = item;
  } else {
    list.push(item);
  }
  saveDemoState(state);
  return item;
}

function nextId(list, key) {
  return list.length ? Math.max(...list.map((item) => Number(item[key]) || 0)) + 1 : 1;
}

function toBase64Url(value) {
  return btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function mergeDemoState(savedState) {
  const merged = { ...structuredClone(defaultState), ...savedState };

  merged.users = mergeByKey(defaultState.users, savedState.users || [], "email");
  merged.customers = mergeByKey(defaultState.customers, savedState.customers || [], "customerId");
  merged.auditLogs = mergeByKey(defaultState.auditLogs, savedState.auditLogs || [], "id");
  merged.applications = mergeByKey(defaultState.applications, savedState.applications || [], "applicationId");
  merged.documents = mergeByKey(defaultState.documents, savedState.documents || [], "documentId");
  merged.products = mergeByKey(defaultState.products, savedState.products || [], "productId");
  merged.fees = mergeByKey(defaultState.fees, savedState.fees || [], "feeId");
  merged.cards = mergeByKey(defaultState.cards, savedState.cards || [], "cardId");
  merged.accounts = mergeByKey(defaultState.accounts, savedState.accounts || [], "accountId");
  merged.transactions = mergeByKey(defaultState.transactions, savedState.transactions || [], "transactionId");
  merged.holds = mergeByKey(defaultState.holds, savedState.holds || [], "holdId");
  merged.statements = mergeByKey(defaultState.statements, savedState.statements || [], "statementId");
  merged.payments = mergeByKey(defaultState.payments, savedState.payments || [], "paymentId");

  return merged;
}

function mergeByKey(defaultItems, savedItems, key) {
  const map = new Map();

  for (const item of defaultItems) {
    map.set(String(item[key]), item);
  }

  for (const item of savedItems) {
    map.set(String(item[key]), item);
  }

  return Array.from(map.values());
}
