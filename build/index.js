var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest,
  handleDataRequest: () => handleDataRequest
});
var import_remix = require("@mantine/remix"), import_react = require("@remix-run/react"), import_pretty_cache_header = require("pretty-cache-header"), import_server = require("react-dom/server");

// app/utils/mantine.ts
var import_core = require("@mantine/core"), emotionCache = (0, import_core.createEmotionCache)({ key: "mantine" });

// app/entry.server.tsx
var import_jsx_runtime = require("react/jsx-runtime"), server = (0, import_remix.createStylesServer)(emotionCache), handleDataRequest = async (response, { request }) => {
  let isGet = request.method.toLowerCase() === "get", isPrefetch = (request.headers.get("Purpose") || request.headers.get("X-Purpose") || request.headers.get("Sec-Purpose") || request.headers.get("Sec-Fetch-Purpose") || request.headers.get("Moz-Purpose")) === "prefetch";
  return isGet && isPrefetch && !response.headers.has("Cache-Control") && response.headers.set(
    "Cache-Control",
    (0, import_pretty_cache_header.cacheHeader)({
      private: !0,
      maxAge: "10s",
      sMaxage: "0s"
    })
  ), response;
};
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = (0, import_server.renderToString)(
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.RemixServer, { context: remixContext, url: request.url })
  );
  return responseHeaders.set("Content-Type", "text/html"), new Response(`<!DOCTYPE html>${(0, import_remix.injectStyles)(markup, server)}`, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  Document: () => Document,
  default: () => App,
  links: () => links,
  loader: () => loader,
  meta: () => meta
});
var import_core2 = require("@mantine/core"), import_modals = require("@mantine/modals"), import_remix2 = require("@mantine/remix"), import_node2 = require("@remix-run/node"), import_react2 = require("@remix-run/react");

// app.config.ts
var appConfig = {
  name: "Ticket Master",
  logo: "/logo.png",
  cardsLimit: 4
}, app_config_default = appConfig;

// app/session.server.ts
var import_node = require("@remix-run/node"), import_tiny_invariant = __toESM(require("tiny-invariant"));

// app/lib/user.server.ts
var bcrypt = __toESM(require("bcryptjs"));

// app/db.server.ts
var import_client = require("@prisma/client"), prisma;
prisma = new import_client.PrismaClient();

// app/utils/constants.ts
var Role = /* @__PURE__ */ ((Role2) => (Role2.AUDIENCE = "audience", Role2.ADMIN = "admin", Role2))(Role || {});

// app/lib/user.server.ts
async function getUserById(id, role = "audience" /* AUDIENCE */) {
  return role === "audience" /* AUDIENCE */ ? prisma.audience.findUnique({
    where: { id },
    select: {
      id: !0,
      firstName: !0,
      lastName: !0,
      email: !0
    }
  }) : prisma.admin.findUnique({
    where: { id },
    select: {
      id: !0,
      firstName: !0,
      lastName: !0,
      email: !0
    }
  });
}
async function getUserByEmail(email2, role = "audience" /* AUDIENCE */) {
  return role === "audience" /* AUDIENCE */ ? prisma.audience.findUnique({
    where: { email: email2 },
    select: {
      firstName: !0,
      lastName: !0,
      email: !0
    }
  }) : prisma.admin.findUnique({
    where: { email: email2 },
    select: {
      firstName: !0,
      lastName: !0,
      email: !0
    }
  });
}
async function verifyLogin({
  email: email2,
  password: password2,
  role = "audience" /* AUDIENCE */
}) {
  let userWithPassword;
  if (role === "audience" /* AUDIENCE */ ? userWithPassword = await prisma.audience.findUnique({
    where: { email: email2 }
  }) : role === "admin" /* ADMIN */ && (userWithPassword = await prisma.admin.findUnique({
    where: { email: email2 }
  })), !userWithPassword || !userWithPassword.password || !await bcrypt.compare(password2, userWithPassword.password))
    return null;
  let { password: _password, ...userWithoutPassword } = userWithPassword;
  return userWithoutPassword;
}

// app/session.server.ts
(0, import_tiny_invariant.default)(process.env.SESSION_SECRET, "SESSION_SECRET must be set");
var sessionStorage = (0, import_node.createCookieSessionStorage)({
  cookie: {
    name: "__session",
    httpOnly: !0,
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: !0
  }
}), USER_SESSION_KEY = "userId", USER_ROLE_KEY = "userRole", fourteenDaysInSeconds = 60 * 60 * 24 * 14, thirtyDaysInSeconds = 60 * 60 * 24 * 30;
async function getSession(request) {
  let cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}
async function getUserId(request) {
  return (await getSession(request)).get(USER_SESSION_KEY);
}
async function getUserRole(request) {
  return (await getSession(request)).get(USER_ROLE_KEY);
}
async function getUser(request) {
  let userId = await getUserId(request), userRole = await getUserRole(request);
  if (userId === void 0 || userRole === void 0)
    return null;
  let user = await getUserById(userId, userRole);
  if (user)
    return user;
  throw await logout(request);
}
async function requireUserId(request, redirectTo = new URL(request.url).pathname) {
  let userId = await getUserId(request);
  if (!userId) {
    let searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw (0, import_node.redirect)(`/login?${searchParams}`);
  }
  return userId;
}
async function requireUser(request, redirectTo = new URL(request.url).pathname) {
  let userId = await requireUserId(request, redirectTo), userRole = await getUserRole(request);
  if (userRole === "audience") {
    let user = await getUserById(userId, "audience" /* AUDIENCE */);
    if (user)
      return user;
  }
  if (userRole === "admin") {
    let user = await getUserById(userId, "admin" /* ADMIN */);
    if (user)
      return user;
  }
  throw await logout(request);
}
async function createUserSession({
  request,
  userId,
  remember = !1,
  redirectTo,
  role = "audience" /* AUDIENCE */
}) {
  let session = await getSession(request);
  return session.set(USER_SESSION_KEY, userId), session.set(USER_ROLE_KEY, role), (0, import_node.redirect)(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: remember ? fourteenDaysInSeconds : thirtyDaysInSeconds
      })
    }
  });
}
async function logout(request) {
  let session = await getSession(request);
  return session.unset(USER_SESSION_KEY), (0, import_node.redirect)("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session)
    }
  });
}
async function isAudience(request) {
  return (await getSession(request)).get(USER_ROLE_KEY) === "audience" /* AUDIENCE */;
}
async function isAdmin(request) {
  return (await getSession(request)).get(USER_ROLE_KEY) === "admin" /* ADMIN */;
}

// app/styles/font.css
var font_default = "/build/_assets/font-ZLCJIQE7.css";

// app/styles/tailwind.css
var tailwind_default = "/build/_assets/tailwind-SJQRKHE3.css";

// app/root.tsx
var import_sonner = require("sonner"), import_jsx_runtime2 = require("react/jsx-runtime"), appendCache = (0, import_core2.createEmotionCache)({ key: "mantine", prepend: !1 }), links = () => [
  { rel: "stylesheet", href: font_default },
  { rel: "stylesheet", href: tailwind_default }
], loader = async ({ request }) => {
  let user = await getUser(request);
  return (0, import_node2.json)({ user });
}, meta = () => ({
  charset: "utf-8",
  title: app_config_default.name,
  viewport: "width=device-width,initial-scale=1"
});
function Document({
  title,
  children
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    import_core2.MantineProvider,
    {
      withNormalizeCSS: !0,
      emotionCache: appendCache,
      theme: {
        primaryColor: "dark"
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("html", { lang: "en", className: "h-full", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("head", { children: [
          title ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("title", { children: title }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.Meta, {}),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.Links, {}),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_remix2.StylesPlaceholder, {})
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("body", { className: "h-full", children: [
          children,
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.ScrollRestoration, {}),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.Scripts, {}),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.LiveReload, {})
        ] })
      ] })
    }
  );
}
function App() {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(Document, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_sonner.Toaster, { richColors: !0, closeButton: !0, duration: 4e3, position: "top-right" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_modals.ModalsProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react2.Outlet, {}) })
  ] });
}

// app/routes/api/cancel-fixture.ts
var cancel_fixture_exports = {};
__export(cancel_fixture_exports, {
  action: () => action
});
var import_node4 = require("@remix-run/node"), import_tiny_invariant2 = __toESM(require("tiny-invariant"));

// app/lib/fixture.server.ts
var import_client5 = require("@prisma/client"), import_bson = require("bson");

// app/lib/order.server.ts
var import_client2 = require("@prisma/client"), import_client3 = require("@prisma/client"), import_client4 = require("@prisma/client");

// app/utils/misc.server.ts
var import_node3 = require("@remix-run/node"), bcrypt2 = __toESM(require("bcryptjs"));
var DEFAULT_REDIRECT = "/", badRequest = (data) => (0, import_node3.json)(data, { status: 400 });
function safeRedirect(to, defaultRedirect = DEFAULT_REDIRECT) {
  return !to || typeof to != "string" || !to.startsWith("/") || to.startsWith("//") ? defaultRedirect : to;
}
function createPasswordHash(password2) {
  return bcrypt2.hash(password2, 10);
}

// app/lib/order.server.ts
function getAllOrders() {
  return prisma.order.findMany({
    include: {
      audience: {
        select: {
          firstName: !0,
          lastName: !0,
          email: !0
        }
      },
      payment: !0,
      schedule: {
        include: {
          timeSlot: !0,
          teamOne: !0,
          teamTwo: !0,
          stadium: !0
        }
      },
      tickets: !0
    }
  });
}
function getOrdersById(audienceId) {
  return prisma.order.findMany({
    where: {
      audienceId
    },
    orderBy: [
      {
        status: "desc"
      },
      {
        createdAt: "desc"
      }
    ],
    include: {
      audience: {
        select: {
          firstName: !0,
          lastName: !0,
          email: !0
        }
      },
      payment: !0,
      schedule: {
        include: {
          timeSlot: !0,
          teamOne: !0,
          teamTwo: !0,
          stadium: !0
        }
      },
      tickets: !0
    }
  });
}
function cancelOrder(orderId, status = import_client3.OrderStatus.CANCELLED_BY_ADMIN) {
  return prisma.$transaction(async (tx) => {
    let order = await tx.order.findUnique({
      where: { id: orderId },
      select: {
        scheduleId: !0,
        noOfTickets: !0
      }
    });
    if (!order)
      throw new Error("Order not found");
    await tx.schedule.update({
      where: { id: order.scheduleId },
      data: {
        availableSeats: {
          increment: order.noOfTickets
        }
      }
    }), await tx.order.update({
      where: { id: orderId },
      data: {
        status,
        tickets: {
          deleteMany: {}
        },
        payment: {
          update: {
            status: import_client4.PaymentStatus.REFUNDED
          }
        }
      }
    });
  });
}
var generateSeats = (zone, noOfTickets, offset = 0) => {
  let seats = [], shortZone = zone.split(" ").map((word) => word.charAt(0)).join(""), numericOffset = Number.isFinite(offset) ? offset : 0;
  for (let i = 1; i <= noOfTickets; i++)
    seats.push(`${shortZone}${numericOffset + i}`);
  return seats;
};
async function createOrder({
  audienceId,
  fixtureId,
  noOfTickets
}) {
  let fixture = await prisma.schedule.findUnique({
    where: { id: fixtureId },
    select: {
      pricePerSeat: !0,
      stadium: !0,
      orders: {
        include: {
          tickets: !0
        }
      }
    }
  });
  if (!fixture)
    throw new Error("Fixture not found");
  let totalAmount = fixture.pricePerSeat * noOfTickets, lastSeat = 0, successfulOrders = fixture == null ? void 0 : fixture.orders.filter(
    (o) => o.status === import_client3.OrderStatus.SUCCESS
  );
  if (!(!successfulOrders || successfulOrders.length === 0)) {
    let seatsAlloted = successfulOrders.map((o) => o.tickets.map((t) => t.seatNo)).flat();
    lastSeat = Math.max(...seatsAlloted.map((seat) => Number(seat)));
  }
  let seats = generateSeats(fixture.stadium.name, noOfTickets, lastSeat);
  return prisma.$transaction(async (tx) => (await tx.schedule.update({
    where: { id: fixtureId },
    data: {
      availableSeats: {
        decrement: noOfTickets
      }
    }
  }), tx.order.create({
    data: {
      audienceId,
      scheduleId: fixtureId,
      noOfTickets,
      status: import_client3.OrderStatus.SUCCESS,
      tickets: {
        createMany: {
          data: seats.map((seat) => ({ seatNo: seat }))
        }
      },
      payment: {
        create: {
          audienceId,
          status: import_client4.PaymentStatus.PAID,
          method: import_client2.PaymentMethod.CREDIT_CARD,
          amount: totalAmount
        }
      }
    }
  })));
}
var createWalkInOrder = async ({
  customerCity,
  customerDob,
  customerEmail,
  customerFirstName,
  customerLastName,
  customerPhone,
  customerState,
  customerZipCode,
  fixtureId,
  noOfTickets
}) => {
  let passwordHash = await createPasswordHash("password"), audience = await prisma.audience.upsert({
    where: {
      email: customerEmail
    },
    update: {
      firstName: customerFirstName,
      lastName: customerLastName,
      email: customerEmail,
      city: customerCity,
      state: customerState,
      zipCode: customerZipCode,
      password: passwordHash,
      phoneNo: customerPhone
    },
    create: {
      firstName: customerFirstName,
      lastName: customerLastName,
      email: customerEmail,
      city: customerCity,
      state: customerState,
      zipCode: customerZipCode,
      dob: customerDob,
      password: passwordHash,
      phoneNo: customerPhone
    }
  });
  return createOrder({
    audienceId: audience.id,
    fixtureId,
    noOfTickets
  });
};

// app/lib/fixture.server.ts
function getAllFixtures() {
  return prisma.schedule.findMany({
    orderBy: [
      {
        status: "desc"
      },
      {
        timeSlot: {
          date: "desc"
        }
      }
    ],
    include: {
      stadium: !0,
      teamOne: !0,
      teamTwo: !0,
      timeSlot: !0,
      orders: {
        include: {
          tickets: !0
        }
      }
    }
  });
}
function getAllUpcomingFixtures() {
  return prisma.schedule.findMany({
    where: {
      AND: [
        {
          status: import_client5.ScheduleStatus.CONFIRMED
        }
      ]
    },
    orderBy: [
      {
        status: "desc"
      },
      {
        timeSlot: {
          date: "desc"
        }
      }
    ],
    include: {
      stadium: !0,
      teamOne: !0,
      teamTwo: !0,
      timeSlot: !0,
      orders: {
        include: {
          tickets: !0
        }
      }
    }
  });
}
function cancelFixture(fixtureId) {
  return prisma.$transaction(async (tx) => {
    let fixture = await tx.schedule.findUnique({
      where: { id: fixtureId },
      include: {
        timeSlot: !0,
        orders: !0
      }
    });
    if (!fixture)
      throw new Error("Fixture not found");
    await tx.schedule.update({
      where: { id: fixtureId },
      data: {
        status: import_client5.ScheduleStatus.CANCELLED
      }
    });
    let orderIds = fixture.orders.map((order) => order.id);
    for (let orderId of orderIds)
      await cancelOrder(orderId, import_client5.OrderStatus.MATCH_CANCELLED);
  });
}
async function createOrUpdateFixture(data) {
  let id = new import_bson.ObjectId(), stadium = await prisma.stadium.findUnique({
    where: {
      id: data.stadiumId
    },
    select: {
      size: !0
    }
  });
  if (!stadium)
    throw new Error("Stadium not found");
  return prisma.schedule.upsert({
    where: {
      id: data.fixtureId || id.toString()
    },
    update: {
      teamOneId: data.teamOneId,
      teamTwoId: data.teamTwoId,
      stadiumId: data.stadiumId,
      pricePerSeat: data.pricePerSeat,
      stadiumOpenTime: data.stadiumOpenTime,
      timeSlot: {
        update: {
          date: data.fixtureDate,
          start: data.fixtureStartTime,
          end: data.fixtureEndTime
        }
      }
    },
    create: {
      teamOneId: data.teamOneId,
      teamTwoId: data.teamTwoId,
      stadiumId: data.stadiumId,
      availableSeats: stadium.size,
      pricePerSeat: data.pricePerSeat,
      stadiumOpenTime: data.stadiumOpenTime,
      timeSlot: {
        create: {
          date: data.fixtureDate,
          start: data.fixtureStartTime,
          end: data.fixtureEndTime
        }
      }
    }
  });
}

// app/routes/api/cancel-fixture.ts
var action = async ({ request }) => {
  var _a;
  requireUser(request);
  let fixtureId = (_a = (await request.formData()).get("fixtureId")) == null ? void 0 : _a.toString();
  return (0, import_tiny_invariant2.default)(fixtureId, "Invalid fixtureId"), cancelFixture(fixtureId).then(() => (0, import_node4.json)({ success: !0 })).catch((e) => (console.error(e), (0, import_node4.json)({ success: !1, error: e.message })));
};

// app/routes/api/cancel-order.ts
var cancel_order_exports = {};
__export(cancel_order_exports, {
  action: () => action2
});
var import_client6 = require("@prisma/client"), import_node5 = require("@remix-run/node"), import_tiny_invariant3 = __toESM(require("tiny-invariant"));
var action2 = async ({ request }) => {
  var _a, _b;
  let formData = await request.formData(), intent = (_a = formData.get("intent")) == null ? void 0 : _a.toString();
  switch ((0, import_tiny_invariant3.default)(intent, "Invalid intent"), intent) {
    case "cancel-order": {
      let orderId = (_b = formData.get("orderId")) == null ? void 0 : _b.toString();
      return (0, import_tiny_invariant3.default)(orderId, "Invalid order id"), cancelOrder(orderId, import_client6.OrderStatus.CANCELLED_BY_USER).then(() => (0, import_node5.json)({ success: !0 })).catch((e) => (console.error(e), (0, import_node5.json)({ success: !1, error: e.message })));
    }
    default:
      return (0, import_node5.json)({ success: !1, message: "Invalid intent" }, { status: 400 });
  }
};

// app/routes/api/auth/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  action: () => action3,
  loader: () => loader2
});
var import_node6 = require("@remix-run/node");
var action3 = async ({ request }) => logout(request), loader2 = async () => (0, import_node6.redirect)("/");

// app/routes/__auth.tsx
var auth_exports = {};
__export(auth_exports, {
  default: () => AuthLayout,
  loader: () => loader3
});
var import_core3 = require("@mantine/core"), import_node7 = require("@remix-run/node"), import_react3 = require("@remix-run/react");
var import_jsx_runtime3 = require("react/jsx-runtime"), loader3 = async ({ request }) => await getUser(request) ? (0, import_node7.redirect)("/") : null;
function AuthLayout() {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("main", { className: "h-screen bg-white", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "container relative h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "relative hidden h-full flex-col p-10 text-gray-200 lg:flex", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "absolute inset-0 flex items-center justify-center bg-zinc-800", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "img",
        {
          src: "https://images.unsplash.com/photo-1548077880-656c402b344e?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          alt: "Ticket Master",
          className: "block w-full object-contain"
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "relative z-20 flex items-center gap-4 text-lg font-medium", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          import_core3.Avatar,
          {
            src: null,
            alt: "Ticket Master",
            size: "md",
            classNames: {
              placeholder: "!text-xl !text-stone-700",
              root: "!h-8 !flex !items-center !justify-center"
            },
            children: "TM"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "font-cal text-xl text-gray-200", children: "Ticket Master" })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "p-8", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_react3.Outlet, {}) })
  ] }) }) });
}

// app/routes/__auth/register.tsx
var register_exports = {};
__export(register_exports, {
  action: () => action4,
  default: () => Register
});
var import_core4 = require("@mantine/core"), import_dates = require("@mantine/dates"), import_node8 = require("@remix-run/node"), import_react4 = require("@remix-run/react");

// app/lib/audience.server.ts
async function createAudience({
  city,
  dob,
  email: email2,
  firstName,
  lastName,
  password: password2,
  phoneNo,
  state,
  zipCode
}) {
  let passwordHash = await createPasswordHash(password2);
  return prisma.audience.create({
    data: {
      city,
      dob,
      email: email2,
      firstName,
      lastName,
      password: passwordHash,
      phoneNo,
      state,
      zipCode
    }
  });
}

// app/lib/zod.schema.ts
var import_slugify = __toESM(require("slugify")), import_zod = require("zod");
var name = import_zod.z.string().min(1, "Name is required"), email = import_zod.z.string().email("Invalid email"), password = import_zod.z.string().min(8, "Password must be at least 8 characters"), LoginSchema = import_zod.z.object({
  email,
  password,
  remember: import_zod.z.enum(["on"]).optional(),
  role: import_zod.z.nativeEnum(Role).optional(),
  redirectTo: import_zod.z.string().default("/")
}), RegisterUserSchema = import_zod.z.object({
  firstName: name,
  lastName: name,
  email,
  password,
  phoneNo: import_zod.z.string().min(10, "Phone number must be 10 digits"),
  city: import_zod.z.string().min(1, "City is required"),
  state: import_zod.z.string().min(1, "State is required"),
  zipCode: import_zod.z.string().min(1, "Zip code is required"),
  dob: import_zod.z.string().min(1, "Date of birth is required").transform((value) => new Date(value).toISOString()),
  confirmPassword: password
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["password", "confirmPassword"]
}), ManageStadiumSchema = import_zod.z.object({
  stadiumId: import_zod.z.string().optional(),
  name: import_zod.z.string().min(1, "Name is required"),
  abbr: import_zod.z.string().min(1, "Abbreviation is required").transform(
    (value) => (0, import_slugify.default)(value, { lower: !0, trim: !0, replacement: "" })
  ),
  size: import_zod.z.preprocess(
    Number,
    import_zod.z.number().min(1, "No of seats must be at least 1")
  )
}), ManageTeamSchema = import_zod.z.object({
  teamId: import_zod.z.string().optional(),
  name: import_zod.z.string().min(1, "Name is required"),
  abbr: import_zod.z.string().min(1, "Abbreviation is required").transform(
    (value) => (0, import_slugify.default)(value.toUpperCase(), { trim: !0, replacement: "" })
  )
}), ManageFixtureSchema = import_zod.z.object({
  fixtureId: import_zod.z.string().optional(),
  teamOneId: import_zod.z.string().min(1, "Host Team is required"),
  teamTwoId: import_zod.z.string().min(1, "Away Team is required"),
  stadiumId: import_zod.z.string().min(1, "Stadium is required"),
  fixtureDate: import_zod.z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date)
      return new Date(arg);
  }, import_zod.z.date()),
  stadiumOpenTime: import_zod.z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date)
      return new Date(arg);
  }, import_zod.z.date()),
  fixtureStartTime: import_zod.z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date)
      return new Date(arg);
  }, import_zod.z.date()),
  pricePerSeat: import_zod.z.preprocess(
    Number,
    import_zod.z.number().min(0, "Price per ticket must be at least 0")
  ),
  fixtureEndTime: import_zod.z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date)
      return new Date(arg);
  }, import_zod.z.date())
});

// app/utils/validation.ts
async function validateAction(request, schema) {
  let formData = await request.formData(), fields = Object.fromEntries(formData), result = schema.safeParse(fields);
  return result.success ? {
    fields: result.data,
    fieldErrors: null
  } : {
    fields: null,
    fieldErrors: result.error.issues.reduce(
      (acc, issue) => {
        let key = issue.path[0] ?? issue.code;
        return acc[key] = issue.message, acc;
      },
      {}
    )
  };
}

// app/routes/__auth/register.tsx
var import_jsx_runtime4 = require("react/jsx-runtime"), action4 = async ({ request }) => {
  let { fieldErrors, fields } = await validateAction(
    request,
    RegisterUserSchema
  );
  if (fieldErrors)
    return badRequest({ fieldErrors });
  let { email: email2 } = fields;
  if (await getUserByEmail(email2))
    return badRequest({
      fieldErrors: { email: "A user already exists with this email" }
    });
  let user = await createAudience(fields);
  return createUserSession({
    request,
    userId: user.id,
    role: "audience" /* AUDIENCE */,
    redirectTo: "/"
  });
};
function Register() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t;
  let fetcher = (0, import_react4.useFetcher)(), isSubmitting = fetcher.state !== "idle";
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex flex-col space-y-2 text-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h1", { className: "text-2xl font-semibold tracking-tight", children: "New here?" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-muted-foreground text-sm", children: "Enter your details below to create an account" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(fetcher.Form, { replace: !0, method: "post", className: "mt-8", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("fieldset", { disabled: isSubmitting, className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_core4.TextInput,
        {
          name: "firstName",
          autoComplete: "given-name",
          label: "First name",
          error: (_b = (_a = fetcher.data) == null ? void 0 : _a.fieldErrors) == null ? void 0 : _b.firstName,
          required: !0
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_core4.TextInput,
        {
          name: "lastName",
          autoComplete: "given-name",
          label: "Last name",
          error: (_d = (_c = fetcher.data) == null ? void 0 : _c.fieldErrors) == null ? void 0 : _d.lastName,
          required: !0
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_core4.TextInput,
        {
          name: "email",
          type: "email",
          autoComplete: "email",
          label: "Email address",
          error: (_f = (_e = fetcher.data) == null ? void 0 : _e.fieldErrors) == null ? void 0 : _f.email,
          required: !0
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_core4.PasswordInput,
        {
          name: "password",
          label: "Password",
          error: (_h = (_g = fetcher.data) == null ? void 0 : _g.fieldErrors) == null ? void 0 : _h.password,
          autoComplete: "current-password",
          required: !0
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_core4.PasswordInput,
        {
          name: "confirmPassword",
          label: "Confirm password",
          error: (_j = (_i = fetcher.data) == null ? void 0 : _i.fieldErrors) == null ? void 0 : _j.password,
          autoComplete: "current-password",
          required: !0
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_core4.TextInput,
        {
          name: "phoneNo",
          type: "tel",
          autoComplete: "tel-national",
          label: "Phone number",
          error: (_l = (_k = fetcher.data) == null ? void 0 : _k.fieldErrors) == null ? void 0 : _l.phoneNo,
          required: !0
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_core4.TextInput,
        {
          name: "city",
          label: "City",
          error: (_n = (_m = fetcher.data) == null ? void 0 : _m.fieldErrors) == null ? void 0 : _n.city,
          required: !0
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_core4.TextInput,
        {
          name: "state",
          label: "State",
          error: (_p = (_o = fetcher.data) == null ? void 0 : _o.fieldErrors) == null ? void 0 : _p.state,
          required: !0
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_core4.TextInput,
        {
          name: "zipCode",
          label: "Zip code",
          error: (_r = (_q = fetcher.data) == null ? void 0 : _q.fieldErrors) == null ? void 0 : _r.zipCode,
          required: !0
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_dates.DatePicker,
        {
          name: "dob",
          label: "Date of birth",
          error: (_t = (_s = fetcher.data) == null ? void 0 : _s.fieldErrors) == null ? void 0 : _t.dob,
          required: !0
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "my-4 flex items-center justify-end", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_react4.Link,
        {
          to: "/login",
          prefetch: "intent",
          className: "font-roboto text-sm font-semibold text-blue-500 hover:underline",
          children: "Already have an account? Login"
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_core4.Button,
        {
          type: "submit",
          loading: isSubmitting,
          fullWidth: !0,
          loaderPosition: "right",
          mt: "1rem",
          children: "Register"
        }
      )
    ] }) })
  ] }) });
}

// app/routes/__auth/login.tsx
var login_exports = {};
__export(login_exports, {
  action: () => action5,
  default: () => Login
});
var import_core5 = require("@mantine/core"), import_react5 = require("@remix-run/react"), import_lucide_react = require("lucide-react"), React = __toESM(require("react"));
var import_jsx_runtime5 = require("react/jsx-runtime"), action5 = async ({ request }) => {
  let { fieldErrors, fields } = await validateAction(request, LoginSchema);
  if (fieldErrors)
    return badRequest({ fieldErrors });
  let { email: email2, password: password2, redirectTo, remember, role } = fields, user = await verifyLogin({ email: email2, password: password2, role });
  return user ? createUserSession({
    request,
    userId: user.id,
    role,
    remember: remember === "on",
    redirectTo: safeRedirect(redirectTo)
  }) : badRequest({
    fieldErrors: {
      password: "Invalid username or password"
    }
  });
};
function Login() {
  var _a, _b, _c, _d;
  let fetcher = (0, import_react5.useFetcher)(), isSubmitting = fetcher.state !== "idle", [role, setRole] = React.useState("audience" /* AUDIENCE */);
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_jsx_runtime5.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col space-y-2 text-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h1", { className: "text-2xl font-semibold tracking-tight", children: "Welcome back!" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-muted-foreground text-sm", children: "Enter your credentials below to continue" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
      fetcher.Form,
      {
        method: "post",
        className: "w-full rounded bg-white px-6 pb-8 pt-6 text-black",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              import_core5.SegmentedControl,
              {
                fullWidth: !0,
                name: "role",
                value: role,
                onChange: (val) => setRole(val),
                mb: 12,
                data: [
                  { label: "Customer", value: "audience" },
                  { label: "Admin", value: "admin" }
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              import_core5.TextInput,
              {
                type: "email",
                name: "email",
                label: "Email",
                autoFocus: !0,
                placeholder: "Enter your email",
                error: (_b = (_a = fetcher.data) == null ? void 0 : _a.fieldErrors) == null ? void 0 : _b.email,
                withAsterisk: !1,
                required: !0
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              import_core5.PasswordInput,
              {
                name: "password",
                label: "Password",
                withAsterisk: !1,
                placeholder: "Enter your password",
                error: (_d = (_c = fetcher.data) == null ? void 0 : _c.fieldErrors) == null ? void 0 : _d.password,
                required: !0
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "my-4 flex items-center justify-end", children: role === "audience" /* AUDIENCE */ && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            import_react5.Link,
            {
              to: "/register",
              prefetch: "intent",
              className: "font-roboto text-sm font-semibold text-blue-500 hover:underline",
              children: "Register?"
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            import_core5.Button,
            {
              fullWidth: !0,
              type: "submit",
              loading: isSubmitting,
              leftIcon: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_lucide_react.Lock, { size: 16 }),
              children: "Login"
            }
          )
        ]
      }
    )
  ] }) });
}

// app/routes/admin.tsx
var admin_exports = {};
__export(admin_exports, {
  ROUTE: () => ROUTE,
  default: () => AdminLayout,
  loader: () => loader4
});
var import_node9 = require("@remix-run/node"), import_react10 = require("@remix-run/react"), import_lucide_react4 = require("lucide-react");

// app/components/Nav.tsx
var import_core6 = require("@mantine/core"), import_react8 = require("@remix-run/react"), import_lucide_react3 = require("lucide-react"), React3 = __toESM(require("react")), import_react9 = require("react");

// app/components/LogoutButton.tsx
var import_react6 = require("@remix-run/react"), import_lucide_react2 = require("lucide-react"), import_jsx_runtime6 = require("react/jsx-runtime");
function LogoutButton() {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_react6.Form, { method: "post", action: "/api/auth/logout", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    "button",
    {
      type: "submit",
      className: "rounded-lg p-1.5 text-gray-300 transition-all duration-150 ease-in-out hover:bg-stone-700 active:bg-stone-800",
      children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_lucide_react2.LogOutIcon, { width: 18 })
    }
  ) });
}

// app/utils/hooks.ts
var import_react7 = require("@remix-run/react"), React2 = __toESM(require("react"));
function useMatchesData(routeId) {
  let matchingRoutes = (0, import_react7.useMatches)(), route = React2.useMemo(
    () => matchingRoutes.find((route2) => route2.id === routeId),
    [matchingRoutes, routeId]
  );
  return route == null ? void 0 : route.data;
}
function useOptionalUser() {
  return useMatchesData("root");
}
function useUser() {
  let { user } = useOptionalUser();
  if (!user)
    throw new Error("No user found");
  return {
    ...user,
    name: `${user.firstName} ${user.lastName}`
  };
}
function useAppData() {
  return useMatchesData("routes/__app");
}
function useAdminData() {
  return useMatchesData("routes/admin");
}

// app/utils/misc.ts
var import_client7 = require("@prisma/client"), import_clsx = __toESM(require("clsx")), import_tailwind_merge = require("tailwind-merge");
function titleCase(string) {
  string = string.toLowerCase();
  let wordsArray = string.split(" ");
  for (var i = 0; i < wordsArray.length; i++)
    wordsArray[i] = wordsArray[i].charAt(0).toUpperCase() + wordsArray[i].slice(1);
  return wordsArray.join(" ");
}
function formatDate(date) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "2-digit",
    day: "numeric"
  }).format(new Date(date));
}
function formatTime(date) {
  return new Intl.DateTimeFormat("en", {
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(date));
}
function formatList(list) {
  return new Intl.ListFormat("en").format(list);
}
function formatCurrency(amount) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD"
  }).format(amount);
}
function orderStatusLookup(status) {
  return {
    [import_client7.OrderStatus.SUCCESS]: "Success",
    [import_client7.OrderStatus.MATCH_POSTPONED]: "Match Postponed",
    [import_client7.OrderStatus.MATCH_CANCELLED]: "Match Cancelled",
    [import_client7.OrderStatus.CANCELLED_BY_ADMIN]: "Cancelled by Admin",
    [import_client7.OrderStatus.CANCELLED_BY_USER]: "Cancelled by User"
  }[status];
}
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.default)(inputs));
}
function getInitials(name2) {
  let nameParts = name2.split(/[^a-zA-Z]+/), initials = "";
  for (let part of nameParts)
    if (part.length > 0 && (initials += part[0]), initials.length >= 2)
      break;
  return initials.toUpperCase();
}

// app/components/Nav.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
function Nav(props) {
  let { menuItems } = props, [showSidebar, setShowSidebar] = (0, import_react9.useState)(!1), user = useUser(), location = (0, import_react8.useLocation)();
  return (0, import_react9.useEffect)(() => {
    setShowSidebar(!1);
  }, [location.pathname]), /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      "button",
      {
        className: cn("fixed z-20 sm:hidden", showSidebar && "right-7 top-7"),
        onClick: () => setShowSidebar(!showSidebar),
        children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_lucide_react3.Menu, { width: 20 })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      "div",
      {
        className: cn(
          "fixed z-10 flex h-full w-full transform flex-col gap-4 transition-all sm:w-64 sm:translate-x-0",
          showSidebar ? "translate-x-0" : "-translate-x-full"
        ),
        children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex h-full flex-col bg-stone-900 p-4 ring-1 ring-stone-700", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
            import_react8.Link,
            {
              to: "/",
              prefetch: "intent",
              className: "relative flex cursor-pointer items-center gap-4 py-1.5",
              children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "font-cal text-xl tracking-wide text-gray-200", children: "Ticket Master" })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_core6.ScrollArea, { classNames: { root: "flex-1 mt-8" }, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "flex flex-col gap-4", children: menuItems.map(({ title, items }, idx) => {
            let showDivider = idx !== menuItems.length - 1;
            return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(React3.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex flex-col gap-1", children: [
                title && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "text-xss font-semibold uppercase text-gray-300", children: title }),
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "flex flex-col gap-1", children: items.map(({ name: name2, href, icon }) => /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
                  import_react8.NavLink,
                  {
                    to: href,
                    end: !0,
                    prefetch: "intent",
                    className: ({ isActive }) => cn(
                      "flex items-center space-x-3 rounded-lg px-2 py-1.5 text-gray-300 transition-all duration-150 ease-in-out hover:bg-stone-700 active:bg-stone-800",
                      isActive && "bg-stone-700 text-gray-100"
                    ),
                    children: [
                      icon,
                      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "text-sm font-medium", children: name2 })
                    ]
                  },
                  name2
                )) })
              ] }),
              showDivider && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_core6.Divider, {})
            ] }, idx);
          }) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "my-2 border-t border-stone-700" }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex w-full items-center justify-between", children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex w-full flex-1 items-center space-x-3 truncate rounded-lg px-2 py-1.5 text-white", children: [
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                  import_core6.Avatar,
                  {
                    src: void 0,
                    alt: `${user.name}'s avatar`,
                    radius: "xl",
                    color: "dark",
                    size: 32,
                    children: getInitials(user.name)
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "truncate text-sm font-medium", children: user.name })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(LogoutButton, {})
            ] })
          ] })
        ] })
      }
    )
  ] });
}

// app/lib/stadium.server.ts
var import_bson2 = require("bson");
function getAllStadiums() {
  return prisma.stadium.findMany({
    include: {
      schedules: !0
    }
  });
}
function createOrUpdateStadium(data) {
  let { stadiumId, ...rest } = data, id = new import_bson2.ObjectId();
  return prisma.stadium.upsert({
    where: {
      id: stadiumId || id.toString()
    },
    update: { ...rest },
    create: { ...rest }
  });
}

// app/lib/team.server.ts
var import_bson3 = require("bson");
function getAllTeams() {
  return prisma.team.findMany({
    orderBy: {
      name: "asc"
    },
    include: {
      teamOneSchedules: !0,
      teamTwoSchedules: !0
    }
  });
}
function createOrUpdateTeam(data) {
  let { teamId, ...rest } = data, id = new import_bson3.ObjectId();
  return prisma.team.upsert({
    where: {
      id: teamId || id.toString()
    },
    update: { ...rest },
    create: { ...rest }
  });
}

// app/routes/admin.tsx
var import_jsx_runtime8 = require("react/jsx-runtime"), ROUTE = "/admin", loader4 = async ({ request }) => {
  if (await requireUser(request), await isAudience(request))
    throw (0, import_node9.redirect)("/");
  let [stadiums, teams, fixtures, orders] = await Promise.all([
    getAllStadiums(),
    getAllTeams(),
    getAllFixtures(),
    getAllOrders()
  ]);
  return (0, import_node9.json)({ stadiums, teams, fixtures, orders });
}, navMenu = [
  {
    title: "Manage",
    items: [
      {
        name: "Overview",
        href: `${ROUTE}`,
        icon: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_lucide_react4.LayoutDashboardIcon, { width: 18 })
      },
      {
        name: "Walk In",
        href: `${ROUTE}/walk-in`,
        icon: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_lucide_react4.UserCog2Icon, { width: 18 })
      },
      {
        name: "Schedules",
        href: `${ROUTE}/fixtures`,
        icon: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_lucide_react4.UserCog2Icon, { width: 18 })
      },
      {
        name: "Teams",
        href: `${ROUTE}/teams`,
        icon: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_lucide_react4.UserCogIcon, { width: 18 })
      },
      {
        name: "Stadiums",
        href: `${ROUTE}/stadiums`,
        icon: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_lucide_react4.BuildingIcon, { width: 18 })
      }
    ]
  }
];
function AdminLayout() {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_jsx_runtime8.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Nav, { menuItems: navMenu }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "min-h-screen bg-stone-50 sm:pl-64", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_react10.Outlet, {}) })
  ] }) });
}

// app/routes/admin/fixtures.tsx
var fixtures_exports = {};
__export(fixtures_exports, {
  action: () => action6,
  default: () => ManageFixtures
});
var import_outline = require("@heroicons/react/24/outline"), import_core7 = require("@mantine/core"), import_dates2 = require("@mantine/dates"), import_hooks2 = require("@mantine/hooks"), import_client8 = require("@prisma/client"), import_node10 = require("@remix-run/node"), import_react11 = require("@remix-run/react"), import_lucide_react6 = require("lucide-react"), React5 = __toESM(require("react"));

// app/components/ui/EmptyState.tsx
var import_lucide_react5 = require("lucide-react"), import_jsx_runtime9 = require("react/jsx-runtime");
function EmptyState(props) {
  let { label, icon } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center", children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "flex items-center justify-center", children: icon ?? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_lucide_react5.XIcon, { size: 70, className: "text-gray-600" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "mt-4 block text-sm font-semibold text-gray-500", children: label })
  ] });
}

// app/components/ui/PageHeading.tsx
var import_jsx_runtime10 = require("react/jsx-runtime");
function PageHeading(props) {
  let { title, rightSection } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("h1", { className: "font-cal text-3xl font-bold", children: title }),
    rightSection
  ] });
}

// app/components/ui/table.tsx
var React4 = __toESM(require("react"));
var import_jsx_runtime11 = require("react/jsx-runtime"), TableRowContext = React4.createContext(void 0);
function useTableRow() {
  let context = React4.useContext(TableRowContext);
  if (!context)
    throw new Error("Components must be rendered within a <Table> component");
  return context;
}
var Table = React4.forwardRef((props, ref) => {
  let { children, className, ...delegateProps } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    "table",
    {
      ref,
      className: cn("min-w-full border-separate border-spacing-0", className),
      ...delegateProps,
      children
    }
  );
}), TableRow = React4.forwardRef(
  (props, ref) => {
    let {
      children,
      className,
      hasBorder: hasBorderProp,
      ...delegateProps
    } = props, [hasBorder] = React4.useState(hasBorderProp ?? !1);
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(TableRowContext.Provider, { value: { hasBorder }, children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("tr", { ref, className, ...delegateProps, children }) });
  }
), TableBody = React4.forwardRef(
  (props, ref) => {
    let { children, className, ...delegateProps } = props;
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("tbody", { ref, className: cn(className), ...delegateProps, children });
  }
), TableThead = React4.forwardRef(
  (props, ref) => {
    let { children, className, ...delegateProps } = props;
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("thead", { ref, className: cn(className), ...delegateProps, children });
  }
), TableTh = React4.forwardRef(
  (props, ref) => {
    let { children, pos = "middle", className, ...delegateProps } = props;
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      "th",
      {
        ref,
        scope: "col",
        className: cn(
          "sticky top-0 z-10 border-b border-gray-300 bg-stone-50 bg-opacity-75 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter",
          pos === "first" && "pl-4 pr-3 sm:pl-6 lg:pl-8",
          pos === "middle" && "hidden px-3 lg:table-cell",
          pos === "last" && "pl-3 pr-4 sm:pr-6 lg:pr-8",
          className
        ),
        ...delegateProps,
        children
      }
    );
  }
), TableData = React4.forwardRef(
  (props, ref) => {
    let {
      children,
      pos = "middle",
      hasBorder: hasBorderProp,
      className,
      ...delegateProps
    } = props, context = useTableRow(), hasBorder = hasBorderProp ?? context.hasBorder;
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      "td",
      {
        ref,
        className: cn(
          "whitespace-nowrap py-6 text-sm text-gray-500",
          pos === "first" && "pl-4 pr-3 font-medium text-gray-800 sm:pl-6 lg:pl-8",
          pos === "middle" && "hidden px-3 lg:table-cell",
          pos === "last" && "px-3 pl-3 pr-4 text-right font-medium sm:pr-8 lg:pr-8",
          hasBorder && "border-b border-gray-200",
          className
        ),
        ...delegateProps,
        children
      }
    );
  }
);

// app/routes/admin/fixtures.tsx
var import_jsx_runtime12 = require("react/jsx-runtime");
var action6 = async ({ request }) => {
  let { fields, fieldErrors } = await validateAction(
    request,
    ManageFixtureSchema
  );
  return fieldErrors ? badRequest({ success: !1, fieldErrors }) : (await createOrUpdateFixture(fields), (0, import_node10.json)({ success: !0 }));
};
function ManageFixtures() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q;
  let fetcher = (0, import_react11.useFetcher)(), { fixtures, stadiums, teams } = useAdminData(), [isModalOpen, handleModal] = (0, import_hooks2.useDisclosure)(!1), [selectedFixtureId, setSelectedFixtureId] = React5.useState(null), [selectedFixture, setSelectedFixture] = React5.useState(null), [mode, setMode] = React5.useState(0 /* edit */), [stadiumId, setStadiumId] = React5.useState(), [teamOneId, setTeamOneId] = React5.useState(null), [teamTwoId, setTeamTwoId] = React5.useState(null), [pricePerSeat, setPricePerSeat] = React5.useState(), [fixtureDate, setFixtureDate] = React5.useState(null), [fixtureStartTime, setFixtureStartTime] = React5.useState(
    null
  ), [fixtureEndTime, setFixtureEndTime] = React5.useState(null), [stadiumOpenTime, setStadiumOpenTime] = React5.useState(
    null
  ), [enableSubmit, setEnableSubmit] = React5.useState(!1), [error, setError] = React5.useState(null), isSubmitting = fetcher.state !== "idle";
  return React5.useEffect(() => {
    !teamOneId || !teamTwoId || teamOneId === teamTwoId && setTeamTwoId(null);
  }, [teamOneId, teamTwoId]), React5.useEffect(() => {
    var _a2;
    isSubmitting || (_a2 = fetcher.data) != null && _a2.success && (setSelectedFixtureId(null), handleModal.close());
  }, [(_a = fetcher.data) == null ? void 0 : _a.success, fetcher.state, fetcher.submission]), React5.useEffect(() => {
    var _a2, _b2, _c2;
    if (!selectedFixtureId) {
      setSelectedFixture(null), setTeamOneId(null), setTeamTwoId(null), setFixtureDate(null), setPricePerSeat(void 0), setFixtureStartTime(null), setFixtureEndTime(null), setStadiumId(stadiums[0].id);
      return;
    }
    let fixture = fixtures.find((schedule) => schedule.id === selectedFixtureId);
    fixture && (setSelectedFixture(fixture), setTeamOneId(fixture.teamOneId), setTeamTwoId(fixture.teamTwoId), setPricePerSeat(fixture.pricePerSeat), setFixtureDate(new Date(((_a2 = fixture.timeSlot) == null ? void 0 : _a2.date) ?? "")), setFixtureStartTime(new Date(((_b2 = fixture.timeSlot) == null ? void 0 : _b2.start) ?? "")), setFixtureEndTime(new Date(((_c2 = fixture.timeSlot) == null ? void 0 : _c2.end) ?? "")), setStadiumId(fixture.stadiumId), handleModal.open());
  }, [fixtures, selectedFixtureId]), React5.useEffect(() => {
    if (setEnableSubmit(!1), setError(null), !fixtureDate || !fixtureStartTime || !fixtureEndTime || !pricePerSeat || !teamOneId && !teamTwoId && !stadiumId)
      return;
    if (fixtureStartTime.getTime() >= fixtureEndTime.getTime()) {
      setError("Fixture start-time must be before end-time");
      return;
    }
    let isConflict = (teamId) => fixtures.filter(
      (fixture) => {
        var _a2;
        return ((_a2 = fixture.timeSlot) == null ? void 0 : _a2.date) === fixtureDate.toISOString() && fixture.id !== selectedFixtureId && (fixture.teamOneId === teamId || fixture.teamTwoId === teamId) && fixture.status !== import_client8.ScheduleStatus.CANCELLED;
      }
    ).some((fixture) => {
      var _a2, _b2;
      let startTime = new Date(((_a2 = fixture.timeSlot) == null ? void 0 : _a2.start) ?? ""), endTime = new Date(((_b2 = fixture.timeSlot) == null ? void 0 : _b2.end) ?? "");
      return startTime.getTime() >= fixtureStartTime.getTime() && startTime.getTime() < fixtureEndTime.getTime() || endTime.getTime() > fixtureStartTime.getTime() && endTime.getTime() <= fixtureEndTime.getTime() || startTime.getTime() <= fixtureStartTime.getTime() && endTime.getTime() >= fixtureEndTime.getTime();
    });
    if (stadiumId && fixtures.filter(
      (fixture) => {
        var _a2;
        return ((_a2 = fixture.timeSlot) == null ? void 0 : _a2.date) === fixtureDate.toISOString() && fixture.id !== selectedFixtureId && stadiumId === fixture.stadiumId && fixture.status !== import_client8.ScheduleStatus.CANCELLED;
      }
    ).some((fixture) => {
      var _a2, _b2;
      let startTime = new Date(((_a2 = fixture.timeSlot) == null ? void 0 : _a2.start) ?? ""), endTime = new Date(((_b2 = fixture.timeSlot) == null ? void 0 : _b2.end) ?? "");
      return startTime.getTime() >= fixtureStartTime.getTime() && startTime.getTime() < fixtureEndTime.getTime() || endTime.getTime() > fixtureStartTime.getTime() && endTime.getTime() <= fixtureEndTime.getTime() || startTime.getTime() <= fixtureStartTime.getTime() && endTime.getTime() >= fixtureEndTime.getTime();
    })) {
      setError("Stadium has a fixture at the same time");
      return;
    }
    if (teamOneId && isConflict(teamOneId)) {
      setError("Host Team has another fixture on the same date and time");
      return;
    }
    if (teamTwoId && isConflict(teamTwoId)) {
      setError("Away Team has another fixture on the same date and time");
      return;
    }
    setStadiumOpenTime(
      new Date(fixtureStartTime.getTime() - 2 * 60 * 60 * 1e3)
    ), setEnableSubmit(!0);
  }, [
    fixtureDate,
    fixtureEndTime,
    fixtureStartTime,
    fixtures,
    selectedFixtureId,
    stadiumId,
    teamOneId,
    teamTwoId,
    pricePerSeat
  ]), /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_jsx_runtime12.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "flex max-w-screen-xl flex-col gap-12 p-10", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex flex-col gap-8", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
        PageHeading,
        {
          title: "Fixtures",
          rightSection: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            import_core7.Button,
            {
              color: "dark",
              radius: "md",
              onClick: () => {
                setMode(1 /* add */), handleModal.open();
              },
              leftIcon: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_lucide_react6.Plus, { size: 18 }),
              children: "Create"
            }
          )
        }
      ),
      fixtures.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "flow-root", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "inline-block min-w-full py-2 align-middle", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(Table, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(TableThead, { children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(TableRow, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(TableTh, { pos: "first", children: "Fixtures" }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(TableTh, { children: "Details" }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(TableTh, { children: "Match Status" }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(TableTh, { pos: "last", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "sr-only", children: "Actions" }) })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(TableBody, { children: fixtures.map((fixture, idx) => {
          var _a2, _b2, _c2;
          let isLastIndex = idx === fixtures.length - 1, isCancelled = fixture.status === import_client8.ScheduleStatus.CANCELLED;
          return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(TableRow, { hasBorder: !isLastIndex, children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(TableData, { pos: "first", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "font-medium text-gray-900", children: [
                fixture.teamOne.name,
                " vs ",
                fixture.teamTwo.name
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "font-medium text-gray-500", children: fixture.stadium.name })
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(TableData, { children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "font-medium text-gray-900", children: formatDate(
                ((_a2 = fixture.timeSlot) == null ? void 0 : _a2.date) ?? /* @__PURE__ */ new Date()
              ) }),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "text-gray-500", children: [
                formatTime(
                  ((_b2 = fixture.timeSlot) == null ? void 0 : _b2.start) ?? /* @__PURE__ */ new Date()
                ),
                " ",
                "-",
                " ",
                formatTime(
                  ((_c2 = fixture.timeSlot) == null ? void 0 : _c2.end) ?? /* @__PURE__ */ new Date()
                )
              ] })
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(TableData, { children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              import_core7.Badge,
              {
                className: "max-w-min",
                variant: "dot",
                fullWidth: !1,
                color: fixture.status === import_client8.ScheduleStatus.CONFIRMED ? "green" : "red",
                children: titleCase(fixture.status)
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(TableData, { children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex items-center justify-end gap-4", children: [
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                import_core7.Button,
                {
                  loading: isSubmitting,
                  variant: "subtle",
                  color: "gray",
                  compact: !0,
                  loaderPosition: "right",
                  disabled: isCancelled,
                  onClick: () => {
                    setSelectedFixtureId(fixture.id), setMode(0 /* edit */);
                  },
                  children: "Edit"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                import_core7.Button,
                {
                  variant: "subtle",
                  color: "red",
                  compact: !0,
                  loaderPosition: "right",
                  loading: isSubmitting,
                  disabled: isCancelled,
                  onClick: () => fetcher.submit(
                    {
                      fixtureId: fixture.id
                    },
                    {
                      method: "post",
                      replace: !0,
                      action: "/api/cancel-fixture"
                    }
                  ),
                  children: "Cancel Fixture"
                }
              )
            ] }) })
          ] });
        }) })
      ] }) }) }) : /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
        EmptyState,
        {
          label: "No fixtures have been added yet",
          icon: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_lucide_react6.ListXIcon, { size: 70, className: "text-gray-600" })
        }
      )
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
      import_core7.Drawer,
      {
        opened: isModalOpen,
        onClose: () => {
          setSelectedFixtureId(null), handleModal.close();
        },
        title: (0, import_core7.clsx)({
          "Edit fixture": mode === 0 /* edit */,
          "Add fixture": mode === 1 /* add */
        }),
        position: "right",
        padding: "xl",
        size: "xl",
        children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(fetcher.Form, { method: "post", replace: !0, children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("fieldset", { disabled: isSubmitting, className: "flex flex-col gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("input", { hidden: !0, name: "fixtureId", value: selectedFixture == null ? void 0 : selectedFixture.id }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            import_core7.NativeSelect,
            {
              name: "stadiumId",
              label: "Stadium",
              value: stadiumId,
              placeholder: "Select stadium",
              onChange: (e) => setStadiumId(e.target.value),
              error: (_c = (_b = fetcher.data) == null ? void 0 : _b.fieldErrors) == null ? void 0 : _c.stadiumId,
              data: stadiums.map((stadium) => ({
                label: stadium.name,
                value: stadium.id
              })),
              required: !0
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            import_core7.Select,
            {
              name: "teamOneId",
              label: "Host Team",
              value: teamOneId,
              onChange: (e) => setTeamOneId(e),
              error: (_e = (_d = fetcher.data) == null ? void 0 : _d.fieldErrors) == null ? void 0 : _e.teamOneId,
              data: teams.map((team) => ({
                label: team.name,
                value: team.id
              })),
              required: !0
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            import_core7.Select,
            {
              name: "teamTwoId",
              label: "Away Team",
              value: teamTwoId,
              onChange: (e) => setTeamTwoId(e),
              error: (_g = (_f = fetcher.data) == null ? void 0 : _f.fieldErrors) == null ? void 0 : _g.teamTwoId,
              disabled: !teamOneId,
              data: teams.map((team) => ({
                label: team.name,
                value: team.id,
                disabled: team.id === teamOneId
              })),
              required: !0
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            import_core7.NumberInput,
            {
              name: "pricePerSeat",
              label: "Price Per Seat",
              icon: "$",
              value: pricePerSeat,
              onChange: (val) => setPricePerSeat(val),
              min: 0,
              error: (_i = (_h = fetcher.data) == null ? void 0 : _h.fieldErrors) == null ? void 0 : _i.pricePerSeat,
              required: !0
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            import_dates2.DatePicker,
            {
              label: "Date",
              name: "fixtureDate",
              value: fixtureDate,
              placeholder: "Select date",
              onChange: setFixtureDate,
              minDate: new Date((/* @__PURE__ */ new Date()).getTime() + 24 * 60 * 60 * 1e3),
              icon: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_outline.CalendarDaysIcon, { className: "h-4 w-4" }),
              error: (_k = (_j = fetcher.data) == null ? void 0 : _j.fieldErrors) == null ? void 0 : _k.fixtureDate,
              hideOutsideDates: !0,
              withAsterisk: !0
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              import_dates2.TimeInput,
              {
                icon: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_outline.ClockIcon, { className: "h-4 w-4" }),
                label: "Start Time",
                format: "12",
                withAsterisk: !0,
                value: fixtureStartTime,
                onChange: setFixtureStartTime,
                error: (_m = (_l = fetcher.data) == null ? void 0 : _l.fieldErrors) == null ? void 0 : _m.fixtureStartTime,
                placeholder: "Select start time"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              "input",
              {
                hidden: !0,
                name: "fixtureStartTime",
                value: fixtureStartTime == null ? void 0 : fixtureStartTime.toISOString()
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              import_dates2.TimeInput,
              {
                icon: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_outline.ClockIcon, { className: "h-4 w-4" }),
                label: "End Time",
                format: "12",
                value: fixtureEndTime,
                onChange: setFixtureEndTime,
                error: (_o = (_n = fetcher.data) == null ? void 0 : _n.fieldErrors) == null ? void 0 : _o.fixtureEndTime,
                placeholder: "Select end time",
                withAsterisk: !0
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              "input",
              {
                hidden: !0,
                name: "fixtureEndTime",
                value: fixtureEndTime == null ? void 0 : fixtureEndTime.toISOString()
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            import_dates2.TimeInput,
            {
              icon: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_lucide_react6.BuildingIcon, { className: "h-4 w-4" }),
              label: "Stadium Open Time",
              format: "12",
              withAsterisk: !0,
              value: stadiumOpenTime,
              onChange: setStadiumOpenTime,
              error: (_q = (_p = fetcher.data) == null ? void 0 : _p.fieldErrors) == null ? void 0 : _q.stadiumOpenTime,
              placeholder: "Select stadium open time"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            "input",
            {
              hidden: !0,
              name: "stadiumOpenTime",
              value: stadiumOpenTime == null ? void 0 : stadiumOpenTime.toISOString()
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "text-sm text-red-500", children: error }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mt-1 flex items-center justify-end gap-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              import_core7.Button,
              {
                variant: "subtle",
                disabled: isSubmitting,
                onClick: () => {
                  setSelectedFixture(null), handleModal.close();
                },
                color: "red",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              import_core7.Button,
              {
                type: "submit",
                loading: isSubmitting,
                loaderPosition: "right",
                disabled: !enableSubmit,
                children: mode === 0 /* edit */ ? "Save changes" : "Add fixture"
              }
            )
          ] })
        ] }) })
      }
    )
  ] });
}

// app/routes/admin/stadiums.tsx
var stadiums_exports = {};
__export(stadiums_exports, {
  action: () => action7,
  default: () => ManageStadiums
});
var import_core8 = require("@mantine/core"), import_hooks4 = require("@mantine/hooks"), import_node11 = require("@remix-run/node"), import_react12 = require("@remix-run/react"), import_lucide_react7 = require("lucide-react"), React6 = __toESM(require("react"));
var import_jsx_runtime13 = require("react/jsx-runtime");
var action7 = async ({ request }) => {
  let { fields, fieldErrors } = await validateAction(
    request,
    ManageStadiumSchema
  );
  return fieldErrors ? badRequest({ success: !1, fieldErrors }) : (await createOrUpdateStadium(fields), (0, import_node11.json)({ success: !0 }));
};
function ManageStadiums() {
  var _a, _b, _c, _d, _e, _f, _g;
  let fetcher = (0, import_react12.useFetcher)(), { stadiums } = useAdminData(), [selectedStadiumId, setSelectedStadiumId] = React6.useState(null), [selectedStadium, setSelectedStadium] = React6.useState(
    null
  ), [mode, setMode] = React6.useState(0 /* edit */), [isModalOpen, handleModal] = (0, import_hooks4.useDisclosure)(!1), isSubmitting = fetcher.state !== "idle";
  return React6.useEffect(() => {
    var _a2;
    fetcher.state !== "idle" && fetcher.submission === void 0 || (_a2 = fetcher.data) != null && _a2.success && (setSelectedStadiumId(null), handleModal.close());
  }, [(_a = fetcher.data) == null ? void 0 : _a.success, fetcher.state, fetcher.submission]), React6.useEffect(() => {
    if (!selectedStadiumId) {
      setSelectedStadium(null);
      return;
    }
    let stadium = stadiums.find((stadium2) => stadium2.id === selectedStadiumId);
    stadium && (setSelectedStadium(stadium), handleModal.open());
  }, [stadiums, selectedStadiumId]), /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_jsx_runtime13.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "flex max-w-screen-xl flex-col gap-12 p-10", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex flex-col gap-8", children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
        PageHeading,
        {
          title: "Stadiums",
          rightSection: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            import_core8.Button,
            {
              color: "dark",
              radius: "md",
              onClick: () => {
                setMode(1 /* add */), handleModal.open();
              },
              leftIcon: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_lucide_react7.Plus, { size: 18 }),
              children: "Create"
            }
          )
        }
      ),
      stadiums.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "flow-root", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "inline-block min-w-full py-2 align-middle", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(Table, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(TableThead, { children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(TableRow, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(TableTh, { pos: "first", children: "Name" }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(TableTh, { children: "Abbreviation" }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(TableTh, { children: "No of Seats" }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(TableTh, { pos: "last", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: "sr-only", children: "Actions" }) })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(TableBody, { children: stadiums.map((stadium, idx) => {
          let isLastIndex = idx === stadiums.length - 1;
          return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(TableRow, { hasBorder: !isLastIndex, children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(TableData, { pos: "first", children: stadium.name }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(TableData, { children: stadium.abbr.toUpperCase() }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(TableData, { children: stadium.size }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(TableData, { children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "flex items-center justify-end gap-4", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
              import_core8.Button,
              {
                loading: isSubmitting,
                variant: "subtle",
                color: "gray",
                compact: !0,
                loaderPosition: "right",
                onClick: () => {
                  setSelectedStadiumId(stadium.id), setMode(0 /* edit */);
                },
                children: "Edit"
              }
            ) }) })
          ] });
        }) })
      ] }) }) }) : /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
        EmptyState,
        {
          label: "No stadiums have been added yet",
          icon: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_lucide_react7.ListXIcon, { size: 70, className: "text-gray-600" })
        }
      )
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
      import_core8.Modal,
      {
        opened: isModalOpen,
        onClose: () => {
          setSelectedStadiumId(null), handleModal.close();
        },
        title: (0, import_core8.clsx)({
          "Edit stadium": mode === 0 /* edit */,
          "Add stadium": mode === 1 /* add */
        }),
        centered: !0,
        overlayBlur: 1.2,
        overlayOpacity: 0.6,
        children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(fetcher.Form, { method: "post", replace: !0, children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("fieldset", { disabled: isSubmitting, className: "flex flex-col gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("input", { type: "hidden", name: "stadiumId", value: selectedStadium == null ? void 0 : selectedStadium.id }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            import_core8.TextInput,
            {
              name: "name",
              label: "Name",
              defaultValue: selectedStadium == null ? void 0 : selectedStadium.name,
              error: (_c = (_b = fetcher.data) == null ? void 0 : _b.fieldErrors) == null ? void 0 : _c.name,
              required: !0
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            import_core8.TextInput,
            {
              name: "abbr",
              label: "Abbreviation",
              defaultValue: selectedStadium == null ? void 0 : selectedStadium.abbr,
              error: (_e = (_d = fetcher.data) == null ? void 0 : _d.fieldErrors) == null ? void 0 : _e.abbr,
              required: !0
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            import_core8.NumberInput,
            {
              name: "size",
              label: "No of Seats",
              defaultValue: selectedStadium == null ? void 0 : selectedStadium.size,
              min: 1,
              error: (_g = (_f = fetcher.data) == null ? void 0 : _f.fieldErrors) == null ? void 0 : _g.size,
              required: !0
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "mt-1 flex items-center justify-end gap-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
              import_core8.Button,
              {
                variant: "subtle",
                disabled: isSubmitting,
                onClick: () => {
                  setSelectedStadium(null), handleModal.close();
                },
                color: "red",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
              import_core8.Button,
              {
                type: "submit",
                loading: isSubmitting,
                loaderPosition: "right",
                children: mode === 0 /* edit */ ? "Save changes" : "Add stadium"
              }
            )
          ] })
        ] }) })
      }
    )
  ] });
}

// app/routes/admin/walk-in.tsx
var walk_in_exports = {};
__export(walk_in_exports, {
  action: () => action8,
  default: () => WalkIn,
  loader: () => loader5
});
var import_core9 = require("@mantine/core"), import_client9 = require("@prisma/client"), import_node12 = require("@remix-run/node"), import_react13 = require("@remix-run/react"), React7 = __toESM(require("react")), import_react_input_mask = __toESM(require("react-input-mask")), import_zod6 = require("zod");
var import_jsx_runtime14 = require("react/jsx-runtime"), loader5 = async () => {
  let customers = await prisma.audience.findMany();
  return (0, import_node12.json)({
    customers
  });
}, CreateOrderSchema = import_zod6.z.object({
  customerFirstName: import_zod6.z.string().min(1, "Customer name is required"),
  customerLastName: import_zod6.z.string().min(1, "Customer name is required"),
  customerEmail: import_zod6.z.string().email("Invalid email address"),
  customerCity: import_zod6.z.string().min(1, "City is required"),
  customerDob: import_zod6.z.string().min(1, "Date of birth is required").transform((value) => new Date(value).toISOString()),
  customerState: import_zod6.z.string().min(1, "State is required"),
  customerZipCode: import_zod6.z.string().min(1, "Zip code is required"),
  customerPhone: import_zod6.z.string().min(1, "Phone number is required"),
  fixtureId: import_zod6.z.string().min(1, "Fixture is required"),
  noOfTickets: import_zod6.z.preprocess(
    Number,
    import_zod6.z.number().min(1, "No of tickets is required")
  )
}), action8 = async ({ request }) => {
  let { fields, fieldErrors } = await validateAction(request, CreateOrderSchema);
  return fieldErrors ? badRequest({ success: !1, fieldErrors }) : createWalkInOrder({
    customerEmail: fields.customerEmail,
    customerFirstName: fields.customerFirstName,
    customerLastName: fields.customerLastName,
    customerCity: fields.customerCity,
    customerState: fields.customerState,
    customerZipCode: fields.customerZipCode,
    customerDob: fields.customerDob,
    customerPhone: fields.customerPhone,
    fixtureId: fields.fixtureId,
    noOfTickets: fields.noOfTickets
  }).then(() => (0, import_node12.redirect)("/admin")).catch((error) => (console.error(error), badRequest({ success: !1 })));
};
function WalkIn() {
  var _a, _b, _c, _d, _e;
  let { customers } = (0, import_react13.useLoaderData)(), id = React7.useId(), fetcher = (0, import_react13.useFetcher)(), { fixtures } = useAdminData(), [selectedFixtureId, setSelectedFixtureId] = React7.useState(((_a = fixtures[0]) == null ? void 0 : _a.id) ?? null), [selectedFixture, setSelectedFixture] = React7.useState(), [noOfTickets, setNoOfTickets] = React7.useState(1), isSubmitting = fetcher.state !== "idle", totalPrice = React7.useMemo(() => !selectedFixture || !noOfTickets ? 0 : selectedFixture.pricePerSeat * noOfTickets, [selectedFixture, noOfTickets]), upcomingFixtures = React7.useMemo(
    () => fixtures.filter(
      (fixture) => {
        var _a2;
        return (_a2 = fixture.timeSlot) != null && _a2.date ? new Date(fixture.timeSlot.date) > /* @__PURE__ */ new Date() : !1;
      }
    ),
    [fixtures]
  );
  React7.useEffect(() => {
    selectedFixtureId && setSelectedFixture(fixtures.find((f) => f.id === selectedFixtureId));
  }, [selectedFixtureId, fixtures]);
  let [selectedUser, setSelectedUser] = React7.useState(null);
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_jsx_runtime14.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "flex max-w-screen-xl flex-col gap-12 p-10", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex flex-col gap-8", children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(PageHeading, { title: "Walk In" }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(fetcher.Form, { method: "post", replace: !0, children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("fieldset", { disabled: isSubmitting, className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          import_core9.Select,
          {
            name: "fixtureId",
            label: "Fixture",
            itemComponent: SelectItem,
            value: selectedFixtureId,
            onChange: (e) => setSelectedFixtureId(e),
            data: upcomingFixtures.map((f) => {
              var _a2, _b2, _c2, _d2, _e2, _f, _g, _h;
              return {
                fixtureDate: (_a2 = f.timeSlot) == null ? void 0 : _a2.date,
                fixtureStartTime: (_b2 = f.timeSlot) == null ? void 0 : _b2.start,
                fixtureEndTime: (_c2 = f.timeSlot) == null ? void 0 : _c2.end,
                stadium: (_d2 = f.stadium) == null ? void 0 : _d2.name,
                teamOne: (_e2 = f.teamOne) == null ? void 0 : _e2.name,
                teamTwo: (_f = f.teamTwo) == null ? void 0 : _f.name,
                label: `${(_g = f.teamOne) == null ? void 0 : _g.name} vs ${(_h = f.teamTwo) == null ? void 0 : _h.name}`,
                value: f.id
              };
            }),
            error: (_c = (_b = fetcher.data) == null ? void 0 : _b.fieldErrors) == null ? void 0 : _c.fixtureId,
            required: !0
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          import_core9.NumberInput,
          {
            name: "noOfTickets",
            label: "No of tickets",
            value: noOfTickets,
            onChange: (e) => setNoOfTickets(e),
            error: (_e = (_d = fetcher.data) == null ? void 0 : _d.fieldErrors) == null ? void 0 : _e.noOfTickets,
            min: 1,
            required: !0
          }
        ),
        selectedFixture ? /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("p", { className: "text-sm", children: [
          "Available Seats: ",
          selectedFixture.availableSeats
        ] }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "text-sm", children: totalPrice ? `Total price: ${formatCurrency(totalPrice)}` : null }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          import_core9.Select,
          {
            label: "Payment method",
            clearable: !1,
            required: !0,
            defaultValue: import_client9.PaymentMethod.CREDIT_CARD,
            data: Object.values(import_client9.PaymentMethod).map((method) => ({
              label: titleCase(method.replace(/_/g, " ")),
              value: method
            }))
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_core9.Input.Wrapper, { id, label: "Credit card number", required: !0, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          import_core9.Input,
          {
            id,
            component: import_react_input_mask.default,
            mask: "9999 9999 9999 9999",
            placeholder: "XXXX XXXX XXXX XXXX",
            defaultValue: "4242 4242 4242 4242",
            alwaysShowMask: !1
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_core9.Input.Wrapper, { id: id + "cvv", label: "CVV", required: !0, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            import_core9.Input,
            {
              id: id + "cvv",
              name: "cvv",
              component: import_react_input_mask.default,
              mask: "999",
              placeholder: "XXX",
              defaultValue: "123",
              alwaysShowMask: !1
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_core9.Input.Wrapper, { id: id + "cvv", label: "Expiry", required: !0, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            import_core9.Input,
            {
              id: id + "expiryDate",
              name: "expiryDate",
              component: import_react_input_mask.default,
              mask: "99/9999",
              placeholder: "MM/YYYY",
              alwaysShowMask: !1,
              defaultValue: "12/2029"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", {}),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "mt-12 flex w-full items-center justify-end gap-4", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        import_core9.Button,
        {
          type: "submit",
          loading: isSubmitting,
          loaderPosition: "right",
          children: "Buy tickets"
        }
      ) })
    ] })
  ] }) }) });
}
var SelectItem = React7.forwardRef(
  (props, ref) => {
    let {
      teamOne,
      teamTwo,
      fixtureDate,
      fixtureStartTime,
      fixtureEndTime,
      stadium,
      ...others
    } = props;
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { ref, ...others, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_core9.Group, { noWrap: !0, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_core9.Text, { size: "sm", children: [
        teamOne,
        " vs ",
        teamTwo
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_core9.Text, { size: "xs", opacity: 0.65, children: stadium }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_core9.Text, { size: "xs", opacity: 0.65, children: [
        formatDate(fixtureDate),
        " (",
        formatTime(fixtureStartTime),
        " -",
        " ",
        formatTime(fixtureEndTime),
        ")"
      ] })
    ] }) }) });
  }
);

// app/routes/admin/orders.tsx
var orders_exports = {};
__export(orders_exports, {
  action: () => action9,
  default: () => ManageOrders
});
var import_solid = require("@heroicons/react/24/solid"), import_core11 = require("@mantine/core"), import_hooks7 = require("@mantine/hooks"), import_client10 = require("@prisma/client"), import_node13 = require("@remix-run/node"), import_react14 = require("@remix-run/react"), import_tiny_invariant4 = __toESM(require("tiny-invariant"));

// app/components/TailwindContainer.tsx
var import_core10 = require("@mantine/core"), import_jsx_runtime15 = require("react/jsx-runtime");
function TailwindContainer({
  children,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: (0, import_core10.clsx)("mx-auto max-w-2xl lg:max-w-7xl", className), children });
}

// app/routes/admin/orders.tsx
var import_jsx_runtime16 = require("react/jsx-runtime"), action9 = async ({ request }) => {
  var _a, _b;
  let formData = await request.formData(), intent = (_a = formData.get("intent")) == null ? void 0 : _a.toString();
  switch ((0, import_tiny_invariant4.default)(intent, "Invalid intent"), intent) {
    case "cancel-order": {
      let orderId = (_b = formData.get("orderId")) == null ? void 0 : _b.toString();
      return (0, import_tiny_invariant4.default)(orderId, "Invalid order id"), cancelOrder(orderId).then(() => (0, import_node13.json)({ success: !0 })).catch((e) => (console.error(e), (0, import_node13.json)({ success: !1, error: e.message })));
    }
    default:
      return (0, import_node13.json)({ success: !1, message: "Invalid intent" }, { status: 400 });
  }
};
function ManageOrders() {
  let { orders } = useAdminData();
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_jsx_runtime16.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(TailwindContainer, { className: "mt-16", children: /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "sm:flex sm:items-center", children: /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
        import_core11.Button,
        {
          leftIcon: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_solid.ArrowLeftIcon, { className: "h-4 w-4" }),
          variant: "subtle",
          size: "md",
          component: import_react14.Link,
          to: "..",
          pl: 0,
          mb: 20,
          color: "gray",
          children: "Back"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("h1", { className: "text-3xl font-semibold text-gray-900", children: "Orders" }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("p", { className: "mt-1 text-sm text-gray-700", children: "View and manage all the orders placed" })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "mt-8 flex flex-col", children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8", children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "inline-block min-w-full py-2 align-middle md:px-6 lg:px-8", children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "shadow ring-1 ring-black ring-opacity-5 md:rounded-lg", children: orders.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("table", { className: "min-w-full divide-y divide-gray-300", children: [
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("thead", { className: "bg-gray-50", children: /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
          "th",
          {
            scope: "col",
            className: "py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6",
            children: "Name"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
          "th",
          {
            scope: "col",
            className: "px-3 py-3.5 text-left text-sm font-semibold text-gray-900",
            children: "Fixture"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
          "th",
          {
            scope: "col",
            className: "px-3 py-3.5 text-left text-sm font-semibold text-gray-900",
            children: "No of tickets"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
          "th",
          {
            scope: "col",
            className: "px-3 py-3.5 text-left text-sm font-semibold text-gray-900",
            children: "Amount"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
          "th",
          {
            scope: "col",
            className: "px-3 py-3.5 text-left text-sm font-semibold text-gray-900",
            children: "Payment Status"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
          "th",
          {
            scope: "col",
            className: "px-3 py-3.5 text-left text-sm font-semibold text-gray-900",
            children: "Order Status"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
          "th",
          {
            scope: "col",
            className: "relative py-3.5 pl-3 pr-4 sm:pr-6"
          }
        )
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("tbody", { className: "divide-y divide-gray-200 bg-white", children: orders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(OrderRow, { order }, order.id)) })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "relative block w-full rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center", children: [
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_solid.DocumentChartBarIcon, { className: "mx-auto h-9 w-9 text-gray-500" }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("span", { className: "mt-4 block text-sm font-medium text-gray-500", children: [
        "No order found. ",
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("br", {}),
        "Come back later."
      ] })
    ] }) }) }) }) })
  ] }) }) });
}
function OrderRow({
  order
}) {
  var _a, _b, _c, _d, _e;
  let fetcher = (0, import_react14.useFetcher)(), [showSeats, handleShowSeats] = (0, import_hooks7.useDisclosure)(!1), seats = order.tickets.map((t) => t.seatNo), isSubmitting = fetcher.state !== "idle", isOrderCompleted = order.status === import_client10.OrderStatus.SUCCESS;
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("tr", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("td", { className: "whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6", children: /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "font-medium text-gray-900", children: [
        order.audience.firstName,
        " ",
        order.audience.lastName
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "text-gray-500", children: order.audience.email })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("td", { className: "whitespace-nowrap px-3 py-4 text-sm text-gray-500", children: /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "font-medium text-gray-900", children: [
        order.schedule.teamOne.name,
        " vs ",
        order.schedule.teamTwo.name
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "font-medium text-gray-500", children: order.schedule.stadium.name }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "text-gray-500", children: [
        formatTime(((_a = order.schedule.timeSlot) == null ? void 0 : _a.start) ?? /* @__PURE__ */ new Date()),
        " -",
        " ",
        formatTime(((_b = order.schedule.timeSlot) == null ? void 0 : _b.end) ?? /* @__PURE__ */ new Date())
      ] })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("td", { className: "whitespace-nowrap px-3 py-4 text-sm text-gray-500", children: order.noOfTickets.toString().padStart(2, "0") }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("td", { className: "whitespace-nowrap px-3 py-4 text-sm text-gray-500", children: [
      "$",
      (_c = order.payment) == null ? void 0 : _c.amount.toFixed(2)
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("td", { className: "whitespace-nowrap px-3 py-4 text-sm text-gray-500", children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
      import_core11.Badge,
      {
        className: "max-w-min",
        variant: "outline",
        fullWidth: !1,
        color: ((_d = order.payment) == null ? void 0 : _d.status) === import_client10.PaymentStatus.PAID ? "green" : import_client10.PaymentStatus.REFUNDED ? "red" : "blue",
        children: titleCase(((_e = order.payment) == null ? void 0 : _e.status) ?? "")
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("td", { className: "whitespace-nowrap px-3 py-4 text-sm text-gray-500", children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
      import_core11.Badge,
      {
        className: "max-w-min",
        variant: "dot",
        fullWidth: !1,
        color: order.status === import_client10.OrderStatus.SUCCESS ? "green" : "red",
        children: orderStatusLookup(order.status)
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("td", { className: "relative whitespace-nowrap py-4 pl-3 pr-6 text-sm font-medium", children: /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "flex items-center justify-end gap-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)(
        import_core11.Popover,
        {
          width: 200,
          position: "bottom-start",
          withArrow: !0,
          shadow: "md",
          opened: showSeats,
          disabled: !isOrderCompleted,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(import_core11.Popover.Target, { children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
              import_core11.Button,
              {
                onMouseEnter: () => handleShowSeats.open(),
                onMouseLeave: () => handleShowSeats.close(),
                variant: "white",
                compact: !0,
                disabled: !isOrderCompleted,
                children: "View Seats"
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
              import_core11.Popover.Dropdown,
              {
                sx: { pointerEvents: "none" },
                className: "whitespace-normal break-words",
                children: formatList(seats)
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
        import_core11.Button,
        {
          variant: "white",
          compact: !0,
          color: "red",
          loaderPosition: "right",
          loading: isSubmitting,
          disabled: !isOrderCompleted,
          onClick: () => fetcher.submit(
            {
              orderId: order.id,
              intent: "cancel-order"
            },
            {
              method: "post",
              replace: !0
            }
          ),
          children: "Cancel Order"
        }
      )
    ] }) })
  ] }, order.id);
}

// app/routes/admin/index.tsx
var admin_exports2 = {};
__export(admin_exports2, {
  default: () => AdminOverview,
  loader: () => loader6,
  meta: () => meta2
});
var import_node14 = require("@remix-run/node"), import_react15 = require("@remix-run/react");

// app/components/ui/Container.tsx
var import_jsx_runtime17 = require("react/jsx-runtime");
function Container({
  children,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: cn("flex max-w-screen-xl flex-col gap-12 p-10", className), children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("div", { className: "flex flex-col gap-8", children }) });
}

// app/components/ui/overview-card.tsx
var import_jsx_runtime18 = require("react/jsx-runtime");
function OverviewCardContainer({ children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("dl", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children });
}
function OverviewCard(props) {
  let { name: name2, stat } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsxs)(
    "div",
    {
      className: "px-4 py-5 sm:p-6 bg-white rounded-md ring-stone-300/50 shadow ring-1 ring-",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("dt", { className: "text-base font-normal text-gray-900", children: name2 }),
        /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("dd", { className: "mt-1 flex items-baseline justify-between md:block lg:flex", children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("div", { className: "flex items-baseline text-2xl font-semibold text-indigo-600", children: stat }) })
      ]
    },
    name2
  );
}

// app/routes/admin/index.tsx
var import_jsx_runtime19 = require("react/jsx-runtime"), meta2 = () => ({
  title: "Overview | Ticket Master"
}), loader6 = async () => {
  let [scheduleCount, orderCount, teamCount, ticketCount, audienceCount] = await Promise.all([
    prisma.schedule.count(),
    prisma.order.count(),
    prisma.team.count(),
    prisma.ticket.count(),
    prisma.audience.count()
  ]);
  return (0, import_node14.json)({
    scheduleCount,
    orderCount,
    teamCount,
    ticketCount,
    audienceCount
  });
};
function AdminOverview() {
  let loaderData = (0, import_react15.useLoaderData)(), adminStats = [
    {
      name: "Customers",
      stat: loaderData.audienceCount
    },
    {
      name: "Orders",
      stat: loaderData.orderCount
    },
    {
      name: "Schedules",
      stat: loaderData.scheduleCount
    },
    {
      name: "Teams",
      stat: loaderData.teamCount
    },
    {
      name: "Tickets",
      stat: loaderData.ticketCount
    }
  ];
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_jsx_runtime19.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(Container, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(PageHeading, { title: "Overview" }),
    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(OverviewCardContainer, { children: adminStats.map((item) => /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(OverviewCard, { name: item.name, stat: item.stat }, item.name)) })
  ] }) });
}

// app/routes/admin/teams.tsx
var teams_exports = {};
__export(teams_exports, {
  action: () => action10,
  default: () => ManageTeams
});
var import_core12 = require("@mantine/core"), import_hooks9 = require("@mantine/hooks"), import_node15 = require("@remix-run/node"), import_react16 = require("@remix-run/react"), import_lucide_react8 = require("lucide-react"), React8 = __toESM(require("react"));
var import_jsx_runtime20 = require("react/jsx-runtime");
var action10 = async ({ request }) => {
  let { fields, fieldErrors } = await validateAction(request, ManageTeamSchema);
  return fieldErrors ? badRequest({ success: !1, fieldErrors }) : (await createOrUpdateTeam(fields), (0, import_node15.json)({ success: !0 }));
};
function ManageTeams() {
  var _a, _b, _c, _d, _e;
  let fetcher = (0, import_react16.useFetcher)(), { teams } = useAdminData(), [selectedTeamId, setSelectedTeamId] = React8.useState(
    null
  ), [selectedTeam, setSelectedTeam] = React8.useState(null), [mode, setMode] = React8.useState(0 /* edit */), [isModalOpen, handleModal] = (0, import_hooks9.useDisclosure)(!1), isSubmitting = fetcher.state !== "idle";
  return React8.useEffect(() => {
    var _a2;
    fetcher.state !== "idle" && fetcher.submission === void 0 || (_a2 = fetcher.data) != null && _a2.success && (setSelectedTeamId(null), handleModal.close());
  }, [(_a = fetcher.data) == null ? void 0 : _a.success, fetcher.state, fetcher.submission]), React8.useEffect(() => {
    if (!selectedTeamId) {
      setSelectedTeam(null);
      return;
    }
    let team = teams.find((team2) => team2.id === selectedTeamId);
    team && (setSelectedTeam(team), handleModal.open());
  }, [teams, selectedTeamId]), /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(import_jsx_runtime20.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "flex max-w-screen-xl flex-col gap-12 p-10", children: /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "flex flex-col gap-8", children: [
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
        PageHeading,
        {
          title: "Teams",
          rightSection: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
            import_core12.Button,
            {
              color: "dark",
              radius: "md",
              onClick: () => {
                setMode(1 /* add */), handleModal.open();
              },
              leftIcon: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_lucide_react8.Plus, { size: 18 }),
              children: "Create"
            }
          )
        }
      ),
      teams.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "flow-root", children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "inline-block min-w-full py-2 align-middle", children: /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(Table, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(TableThead, { children: /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(TableRow, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(TableTh, { pos: "first", children: "Name" }),
          /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(TableTh, { children: "Abbreviation" }),
          /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(TableTh, { pos: "last", children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("span", { className: "sr-only", children: "Actions" }) })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(TableBody, { children: teams.map((team, idx) => {
          let isLastIndex = idx === teams.length - 1;
          return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(TableRow, { hasBorder: !isLastIndex, children: [
            /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(TableData, { pos: "first", children: team.name }),
            /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(TableData, { children: team.abbr }),
            /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(TableData, { children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "flex items-center justify-end gap-4", children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
              import_core12.Button,
              {
                loading: isSubmitting,
                variant: "subtle",
                color: "gray",
                compact: !0,
                loaderPosition: "right",
                onClick: () => {
                  setSelectedTeamId(team.id), setMode(0 /* edit */);
                },
                children: "Edit"
              }
            ) }) })
          ] });
        }) })
      ] }) }) }) : /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
        EmptyState,
        {
          label: "No teams have been added yet",
          icon: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_lucide_react8.ListXIcon, { size: 70, className: "text-gray-600" })
        }
      )
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
      import_core12.Modal,
      {
        opened: isModalOpen,
        onClose: () => {
          setSelectedTeamId(null), handleModal.close();
        },
        title: (0, import_core12.clsx)({
          "Edit team": mode === 0 /* edit */,
          "Add team": mode === 1 /* add */
        }),
        centered: !0,
        overlayBlur: 1.2,
        overlayOpacity: 0.6,
        children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(fetcher.Form, { method: "post", replace: !0, children: /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("fieldset", { disabled: isSubmitting, className: "flex flex-col gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("input", { type: "hidden", name: "teamId", value: selectedTeam == null ? void 0 : selectedTeam.id }),
          /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
            import_core12.TextInput,
            {
              name: "name",
              label: "Name",
              defaultValue: selectedTeam == null ? void 0 : selectedTeam.name,
              error: (_c = (_b = fetcher.data) == null ? void 0 : _b.fieldErrors) == null ? void 0 : _c.name,
              required: !0
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
            import_core12.TextInput,
            {
              name: "abbr",
              label: "Abbreviation",
              defaultValue: selectedTeam == null ? void 0 : selectedTeam.abbr,
              error: (_e = (_d = fetcher.data) == null ? void 0 : _d.fieldErrors) == null ? void 0 : _e.abbr,
              required: !0
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "mt-1 flex items-center justify-end gap-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
              import_core12.Button,
              {
                variant: "subtle",
                disabled: isSubmitting,
                onClick: () => {
                  setSelectedTeam(null), handleModal.close();
                },
                color: "red",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
              import_core12.Button,
              {
                type: "submit",
                loading: isSubmitting,
                loaderPosition: "right",
                children: mode === 0 /* edit */ ? "Save changes" : "Add teams"
              }
            )
          ] })
        ] }) })
      }
    )
  ] });
}

// app/routes/__app.tsx
var app_exports = {};
__export(app_exports, {
  default: () => AdminLayout2,
  loader: () => loader7
});
var import_node16 = require("@remix-run/node"), import_react17 = require("@remix-run/react"), import_lucide_react9 = require("lucide-react");

// app/lib/payment.server.ts
function getAudiencePayments(audienceId) {
  return prisma.payment.findMany({
    where: {
      audienceId
    },
    include: {
      order: {
        include: {
          schedule: {
            include: {
              teamOne: !0,
              teamTwo: !0,
              stadium: !0,
              timeSlot: !0
            }
          }
        }
      }
    }
  });
}

// app/routes/__app.tsx
var import_jsx_runtime21 = require("react/jsx-runtime"), loader7 = async ({ request }) => {
  let audienceId = await requireUserId(request);
  if (await isAdmin(request))
    return (0, import_node16.redirect)("/admin");
  let fixtures = await getAllUpcomingFixtures(), orders = await getOrdersById(audienceId), payments = await getAudiencePayments(audienceId);
  return (0, import_node16.json)({
    fixtures,
    orders,
    payments
  });
}, navMenu2 = [
  {
    items: [
      {
        name: "Overview",
        href: "/",
        icon: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_lucide_react9.LayoutDashboardIcon, { width: 18 })
      },
      {
        name: "My Tickets",
        href: "/tickets",
        icon: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_lucide_react9.TicketIcon, { width: 18 })
      },
      {
        name: "Payments",
        href: "/payment-history",
        icon: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_lucide_react9.ReceiptIcon, { width: 18 })
      }
    ]
  }
];
function AdminLayout2() {
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_jsx_runtime21.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(Nav, { menuItems: navMenu2 }),
    /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("div", { className: "min-h-screen bg-stone-50 sm:pl-64", children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(import_react17.Outlet, {}) })
  ] }) });
}

// app/routes/__app/payment-history.tsx
var payment_history_exports = {};
__export(payment_history_exports, {
  default: () => OrderHistory
});
var import_core13 = require("@mantine/core"), import_client11 = require("@prisma/client"), import_lucide_react10 = require("lucide-react");
var import_jsx_runtime22 = require("react/jsx-runtime");
function OrderHistory() {
  let { payments } = useAppData();
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_jsx_runtime22.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "flex max-w-screen-xl flex-col gap-12 p-10", children: /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { className: "flex flex-col gap-8", children: [
    /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(PageHeading, { title: "Payment History" }),
    payments.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "flow-root", children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "inline-block min-w-full py-2 align-middle", children: /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(Table, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(TableThead, { children: /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(TableRow, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(TableTh, { pos: "first", children: "ID" }),
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(TableTh, { children: "Amount" }),
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(TableTh, { children: "Date" }),
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(TableTh, { children: "Status" }),
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(TableTh, { children: "Schedule" }),
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(TableTh, { pos: "last", children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("span", { className: "sr-only", children: "Actions" }) })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(TableBody, { children: payments.map((payment, idx) => {
        var _a, _b, _c;
        let isLastIndex = idx === payments.length - 1;
        return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(TableRow, { hasBorder: !isLastIndex, children: [
          /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(TableData, { pos: "first", children: payment.id.slice(-10).toUpperCase() }),
          /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(TableData, { children: formatCurrency(payment.amount) }),
          /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(TableData, { children: formatDate(payment.createdAt) }),
          /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(TableData, { children: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
            import_core13.Badge,
            {
              color: payment.status === import_client11.PaymentStatus.PAID ? "green" : "red",
              radius: "xs",
              children: titleCase(payment.status)
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(TableData, { children: /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("p", { className: "truncate text-sm font-medium text-blue-600", children: [
              payment.order.schedule.teamOne.name,
              " vs",
              " ",
              payment.order.schedule.teamTwo.name
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("p", { className: "flex items-center text-sm text-gray-500", children: payment.order.schedule.stadium.name }),
            /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)("p", { className: "flex items-center text-sm text-gray-500", children: [
              formatDate(
                ((_a = payment.order.schedule.timeSlot) == null ? void 0 : _a.date) ?? /* @__PURE__ */ new Date("2021-01-01")
              ),
              " ",
              "(",
              formatTime(
                ((_b = payment.order.schedule.timeSlot) == null ? void 0 : _b.start) ?? ""
              ),
              " ",
              "-",
              " ",
              formatTime(
                ((_c = payment.order.schedule.timeSlot) == null ? void 0 : _c.end) ?? ""
              ),
              ")"
            ] })
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(TableData, { pos: "last" })
        ] });
      }) })
    ] }) }) }) : /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
      EmptyState,
      {
        label: "No purchases yet",
        icon: /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(import_lucide_react10.ReceiptIcon, { size: 70, className: "text-gray-600" })
      }
    )
  ] }) }) });
}

// app/routes/__app/tickets.tsx
var tickets_exports = {};
__export(tickets_exports, {
  action: () => action11,
  default: () => BuyTickets
});
var import_core14 = require("@mantine/core"), import_hooks12 = require("@mantine/hooks"), import_client12 = require("@prisma/client"), import_node17 = require("@remix-run/node"), import_react18 = require("@remix-run/react"), import_lucide_react11 = require("lucide-react"), React9 = __toESM(require("react")), import_react_input_mask2 = __toESM(require("react-input-mask")), import_zod8 = require("zod");
var import_jsx_runtime23 = require("react/jsx-runtime"), CreateOrderSchema2 = import_zod8.z.object({
  fixtureId: import_zod8.z.string().min(1, "Fixture is required"),
  noOfTickets: import_zod8.z.preprocess(
    Number,
    import_zod8.z.number().min(1, "No of tickets is required")
  )
}), action11 = async ({ request }) => {
  let audienceId = await requireUserId(request), { fields, fieldErrors } = await validateAction(request, CreateOrderSchema2);
  return fieldErrors ? badRequest({ success: !1, fieldErrors }) : createOrder({
    audienceId,
    fixtureId: fields.fixtureId,
    noOfTickets: fields.noOfTickets
  }).then(() => (0, import_node17.json)({ success: !0 })).catch((error) => (console.error(error), badRequest({ success: !1 })));
};
function BuyTickets() {
  var _a, _b, _c, _d, _e, _f;
  let id = React9.useId(), fetcher = (0, import_react18.useFetcher)(), { orders, fixtures } = useAppData(), [selectedFixtureId, setSelectedFixtureId] = React9.useState(((_a = fixtures[0]) == null ? void 0 : _a.id) ?? null), [selectedFixture, setSelectedFixture] = React9.useState(), [noOfTickets, setNoOfTickets] = React9.useState(1), [isModalOpen, handleModal] = (0, import_hooks12.useDisclosure)(!1, {
    onClose: () => {
      setSelectedFixtureId(null), setNoOfTickets(1);
    }
  }), isSubmitting = fetcher.state !== "idle", totalPrice = React9.useMemo(() => !selectedFixture || !noOfTickets ? 0 : selectedFixture.pricePerSeat * noOfTickets, [selectedFixture, noOfTickets]), upcomingFixtures = React9.useMemo(
    () => fixtures.filter(
      (fixture) => {
        var _a2;
        return (_a2 = fixture.timeSlot) != null && _a2.date ? new Date(fixture.timeSlot.date) > /* @__PURE__ */ new Date() : !1;
      }
    ),
    [fixtures]
  );
  return React9.useEffect(() => {
    selectedFixtureId && setSelectedFixture(fixtures.find((f) => f.id === selectedFixtureId));
  }, [selectedFixtureId, fixtures]), React9.useEffect(() => {
    var _a2;
    fetcher.state !== "idle" && fetcher.submission === void 0 || (_a2 = fetcher.data) != null && _a2.success && handleModal.close();
  }, [(_b = fetcher.data) == null ? void 0 : _b.success, fetcher.state, fetcher.submission]), /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(import_jsx_runtime23.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "flex max-w-screen-xl flex-col gap-12 p-10", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "flex flex-col gap-8", children: [
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
        PageHeading,
        {
          title: "My Tickets",
          rightSection: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
            import_core14.Button,
            {
              color: "dark",
              radius: "md",
              onClick: () => handleModal.open(),
              leftIcon: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_lucide_react11.Plus, { size: 18 }),
              children: "Create"
            }
          )
        }
      ),
      orders.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "flow-root", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "inline-block min-w-full py-2 align-middle", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(Table, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(TableThead, { children: /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(TableRow, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(TableTh, { pos: "first", children: "Ticket ID" }),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(TableTh, { children: "Match" }),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(TableTh, { children: "No of Tickets" }),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(TableTh, { children: "Total Price" }),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(TableTh, { children: "Status" }),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(TableTh, { pos: "last", children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("span", { className: "sr-only", children: "Actions" }) })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(TableBody, { children: orders.map((order, idx) => /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(TicketRow, { order, idx }, order.id)) })
      ] }) }) }) : /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
        EmptyState,
        {
          label: "No tickets have been purchased yet",
          icon: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_lucide_react11.ListXIcon, { size: 70, className: "text-gray-600" })
        }
      )
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
      import_core14.Modal,
      {
        opened: isModalOpen,
        onClose: () => handleModal.close(),
        title: "Buy tickets",
        centered: !0,
        overlayBlur: 1.2,
        overlayOpacity: 0.6,
        children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(fetcher.Form, { method: "post", replace: !0, children: /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("fieldset", { disabled: isSubmitting, className: "flex flex-col gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
            import_core14.Select,
            {
              name: "fixtureId",
              label: "Fixture",
              itemComponent: SelectItem2,
              value: selectedFixtureId,
              onChange: (e) => setSelectedFixtureId(e),
              data: upcomingFixtures.map((f) => {
                var _a2, _b2, _c2, _d2, _e2, _f2, _g, _h;
                return {
                  fixtureDate: (_a2 = f.timeSlot) == null ? void 0 : _a2.date,
                  fixtureStartTime: (_b2 = f.timeSlot) == null ? void 0 : _b2.start,
                  fixtureEndTime: (_c2 = f.timeSlot) == null ? void 0 : _c2.end,
                  stadium: (_d2 = f.stadium) == null ? void 0 : _d2.name,
                  teamOne: (_e2 = f.teamOne) == null ? void 0 : _e2.name,
                  teamTwo: (_f2 = f.teamTwo) == null ? void 0 : _f2.name,
                  label: `${(_g = f.teamOne) == null ? void 0 : _g.name} vs ${(_h = f.teamTwo) == null ? void 0 : _h.name}`,
                  value: f.id
                };
              }),
              error: (_d = (_c = fetcher.data) == null ? void 0 : _c.fieldErrors) == null ? void 0 : _d.fixtureId,
              required: !0
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
            import_core14.NumberInput,
            {
              name: "noOfTickets",
              label: "No of tickets",
              value: noOfTickets,
              onChange: (e) => setNoOfTickets(e),
              error: (_f = (_e = fetcher.data) == null ? void 0 : _e.fieldErrors) == null ? void 0 : _f.noOfTickets,
              min: 1,
              required: !0
            }
          ),
          selectedFixture ? /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("p", { className: "text-sm", children: [
            "Available Seats: ",
            selectedFixture.availableSeats
          ] }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("p", { className: "text-sm", children: totalPrice ? `Total price: ${formatCurrency(totalPrice)}` : null }),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
            import_core14.Select,
            {
              label: "Payment method",
              clearable: !1,
              required: !0,
              defaultValue: import_client12.PaymentMethod.CREDIT_CARD,
              data: Object.values(import_client12.PaymentMethod).map((method) => ({
                label: titleCase(method.replace(/_/g, " ")),
                value: method
              }))
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_core14.Input.Wrapper, { id, label: "Credit card number", required: !0, children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
            import_core14.Input,
            {
              id,
              component: import_react_input_mask2.default,
              mask: "9999 9999 9999 9999",
              placeholder: "XXXX XXXX XXXX XXXX",
              defaultValue: "4242 4242 4242 4242",
              alwaysShowMask: !1
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_core14.Input.Wrapper, { id: id + "cvv", label: "CVV", required: !0, children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
              import_core14.Input,
              {
                id: id + "cvv",
                name: "cvv",
                component: import_react_input_mask2.default,
                mask: "999",
                placeholder: "XXX",
                defaultValue: "123",
                alwaysShowMask: !1
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_core14.Input.Wrapper, { id: id + "cvv", label: "Expiry", required: !0, children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
              import_core14.Input,
              {
                id: id + "expiryDate",
                name: "expiryDate",
                component: import_react_input_mask2.default,
                mask: "99/9999",
                placeholder: "MM/YYYY",
                alwaysShowMask: !1,
                defaultValue: "12/2029"
              }
            ) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "mt-1 flex items-center justify-end gap-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
              import_core14.Button,
              {
                variant: "subtle",
                disabled: isSubmitting,
                onClick: () => handleModal.close(),
                color: "red",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
              import_core14.Button,
              {
                type: "submit",
                loading: isSubmitting,
                loaderPosition: "right",
                children: "Buy tickets"
              }
            )
          ] })
        ] }) })
      }
    )
  ] });
}
function TicketRow({
  order,
  idx
}) {
  var _a, _b, _c, _d, _e;
  let { orders } = useAppData(), fetcher = (0, import_react18.useFetcher)(), [showSeats, handleShowSeats] = (0, import_hooks12.useDisclosure)(!1), seats = order.tickets.map((t) => t.seatNo), isOrderCompleted = order.status === import_client12.OrderStatus.SUCCESS, only24HoursLeft = new Date(((_a = order.schedule.timeSlot) == null ? void 0 : _a.date) ?? /* @__PURE__ */ new Date()) < new Date(Date.now() + 24 * 60 * 60 * 1e3), isSubmitting = fetcher.state !== "idle", [isTicketModalOpen, handleTicketModal] = (0, import_hooks12.useDisclosure)(!1), isLastIndex = orders.length - 1 === idx;
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(import_jsx_runtime23.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(TableRow, { hasBorder: !isLastIndex, children: [
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(TableData, { pos: "first", children: order.scheduleId.slice(0, 8).toUpperCase() }),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(TableData, { children: /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "font-medium text-gray-900", children: [
          order.schedule.teamOne.name,
          " vs ",
          order.schedule.teamTwo.name
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "font-medium text-gray-500", children: order.schedule.stadium.name }),
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "font-medium text-gray-500", children: formatDate(((_b = order.schedule.timeSlot) == null ? void 0 : _b.date) ?? /* @__PURE__ */ new Date()) }),
        /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "text-gray-500", children: [
          formatTime(((_c = order.schedule.timeSlot) == null ? void 0 : _c.start) ?? /* @__PURE__ */ new Date()),
          " -",
          " ",
          formatTime(((_d = order.schedule.timeSlot) == null ? void 0 : _d.end) ?? /* @__PURE__ */ new Date())
        ] })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(TableData, { children: order.noOfTickets }),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(TableData, { children: formatCurrency(((_e = order.payment) == null ? void 0 : _e.amount) ?? 0) }),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(TableData, { children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
        import_core14.Badge,
        {
          className: "max-w-min",
          variant: "dot",
          fullWidth: !1,
          color: order.status === import_client12.OrderStatus.SUCCESS ? "green" : "red",
          children: orderStatusLookup(order.status)
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(TableData, { pos: "last", children: [
        /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
          import_core14.Popover,
          {
            width: 200,
            position: "bottom-start",
            withArrow: !0,
            shadow: "md",
            opened: showSeats,
            disabled: !isOrderCompleted,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_core14.Popover.Target, { children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
                import_core14.Button,
                {
                  onMouseEnter: () => handleShowSeats.open(),
                  onMouseLeave: () => handleShowSeats.close(),
                  variant: "subtle",
                  color: "gray",
                  compact: !0,
                  disabled: !isOrderCompleted,
                  children: "View Seats"
                }
              ) }),
              /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
                import_core14.Popover.Dropdown,
                {
                  sx: { pointerEvents: "none" },
                  className: "whitespace-normal break-words",
                  children: formatList(seats)
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
          import_core14.Button,
          {
            variant: "subtle",
            color: "gray",
            compact: !0,
            loaderPosition: "right",
            loading: isSubmitting,
            disabled: !isOrderCompleted,
            onClick: () => handleTicketModal.open(),
            children: "View Tickets"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
          import_core14.Button,
          {
            variant: "subtle",
            color: "red",
            compact: !0,
            loaderPosition: "right",
            loading: isSubmitting,
            disabled: !isOrderCompleted || only24HoursLeft,
            onClick: () => fetcher.submit(
              {
                orderId: order.id,
                intent: "cancel-order"
              },
              {
                method: "post",
                replace: !0,
                action: "/api/cancel-order"
              }
            ),
            children: "Cancel Order"
          }
        )
      ] })
    ] }, order.id),
    /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
      import_core14.Modal,
      {
        opened: isTicketModalOpen,
        onClose: () => handleTicketModal.close(),
        title: "Ticket Details",
        centered: !0,
        children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "grid grid-cols-2 gap-8", children: order.tickets.map((ticket, index) => /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(React9.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_core14.Text, { size: "sm", opacity: 0.9, children: "Ticket ID" }),
            /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_core14.Text, { size: "sm", opacity: 0.9, children: "Seat No." })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_core14.Text, { size: "sm", opacity: 0.7, children: ticket.id.slice(0, 8).toUpperCase() }),
            /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_core14.Text, { size: "sm", opacity: 0.7, children: ticket.seatNo })
          ] })
        ] }, index)) })
      }
    )
  ] });
}
var SelectItem2 = React9.forwardRef(
  (props, ref) => {
    let {
      teamOne,
      teamTwo,
      fixtureDate,
      fixtureStartTime,
      fixtureEndTime,
      stadium,
      ...others
    } = props;
    return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { ref, ...others, children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_core14.Group, { noWrap: !0, children: /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(import_core14.Text, { size: "sm", children: [
        teamOne,
        " vs ",
        teamTwo
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(import_core14.Text, { size: "xs", opacity: 0.65, children: stadium }),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(import_core14.Text, { size: "xs", opacity: 0.65, children: [
        formatDate(fixtureDate),
        " (",
        formatTime(fixtureStartTime),
        " -",
        " ",
        formatTime(fixtureEndTime),
        ")"
      ] })
    ] }) }) });
  }
);

// app/routes/__app/index.tsx
var app_exports2 = {};
__export(app_exports2, {
  Card: () => Card,
  default: () => CustomerOverview,
  loader: () => loader8
});
var import_solid2 = require("@heroicons/react/20/solid"), import_solid3 = require("@heroicons/react/24/solid"), import_core15 = require("@mantine/core"), import_node18 = require("@remix-run/node"), import_react19 = require("@remix-run/react"), import_lucide_react12 = require("lucide-react"), React10 = __toESM(require("react"));
var import_hooks14 = require("@mantine/hooks"), import_client13 = require("@prisma/client"), import_react_input_mask3 = __toESM(require("react-input-mask"));
var import_jsx_runtime24 = require("react/jsx-runtime");
var loader8 = async ({ request }) => {
  let upcomingFixtures = await getAllUpcomingFixtures();
  return (0, import_node18.json)({ upcomingFixtures });
};
function CustomerOverview() {
  let { upcomingFixtures } = (0, import_react19.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_jsx_runtime24.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "flex max-w-screen-xl flex-col gap-12 p-10", children: /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "flex flex-col gap-8", children: [
    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(PageHeading, { title: "Overview" }),
    upcomingFixtures.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "grid grid-cols-3 gap-8", children: upcomingFixtures.map((fixture) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(Card, { fixture }, fixture.id)) }) : /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
      EmptyState,
      {
        label: "No upcoming matches, check back later",
        icon: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_lucide_react12.CalendarRangeIcon, { size: 70, className: "text-gray-600" })
      }
    )
  ] }) }) });
}
function Card({
  fixture
}) {
  var _a, _b, _c, _d, _e, _f, _g;
  let navigate = (0, import_react19.useNavigate)(), { upcomingFixtures } = (0, import_react19.useLoaderData)(), fetcher = (0, import_react19.useFetcher)(), id = React10.useId(), [selectedFixtureId, setSelectedFixtureId] = React10.useState(fixture.id), [selectedFixture, setSelectedFixture] = React10.useState(), [noOfTickets, setNoOfTickets] = React10.useState(1), [isModalOpen, handleModal] = (0, import_hooks14.useDisclosure)(!1, {
    onClose: () => {
      setSelectedFixtureId(null), setNoOfTickets(1);
    }
  }), isSubmitting = fetcher.state !== "idle", totalPrice = React10.useMemo(() => !selectedFixture || !noOfTickets ? 0 : selectedFixture.pricePerSeat * noOfTickets, [selectedFixture, noOfTickets]);
  return React10.useEffect(() => {
    selectedFixtureId && setSelectedFixture(upcomingFixtures.find((f) => f.id === selectedFixtureId));
  }, [selectedFixtureId, upcomingFixtures]), React10.useEffect(() => {
    isSubmitting || fetcher.data && (console.log(fetcher.data), fetcher.data.success && (handleModal.close(), navigate("/tickets")));
  }, [fetcher.data, isSubmitting]), /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_jsx_runtime24.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "rounded-lg bg-white shadow-sm ring-1 ring-gray-900/5", children: [
      /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("dl", { className: "flex flex-wrap", children: [
        /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "flex-auto pl-6 pt-6", children: /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("dt", { className: "text-base font-semibold leading-6 text-gray-900", children: [
          fixture.teamOne.abbr.toUpperCase(),
          " vs",
          " ",
          fixture.teamTwo.abbr.toUpperCase()
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "mt-8 flex w-full flex-none gap-x-4 px-6", children: [
          /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("dt", { className: "flex-none", children: [
            /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("span", { className: "sr-only", children: "Due date" }),
            /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
              import_solid2.CalendarDaysIcon,
              {
                className: "h-6 w-5 text-gray-400",
                "aria-hidden": "true"
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("dd", { className: "flex items-center gap-4 text-sm leading-6 text-gray-500", children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("span", { children: formatDate((_a = fixture.timeSlot) == null ? void 0 : _a.date) }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "mt-4 flex w-full flex-none gap-x-4 px-6", children: [
          /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("dt", { className: "flex-none", children: [
            /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("span", { className: "sr-only", children: "Time" }),
            /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_lucide_react12.ClockIcon, { className: "h-6 w-5 text-gray-400", "aria-hidden": "true" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("dd", { className: "text-sm leading-6 text-gray-500", children: /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("span", { children: [
            formatTime((_b = fixture.timeSlot) == null ? void 0 : _b.start),
            " -",
            " ",
            formatTime((_c = fixture.timeSlot) == null ? void 0 : _c.end)
          ] }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "mt-4 flex w-full flex-none gap-x-4 px-6", children: [
          /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("dt", { className: "flex-none", children: [
            /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("span", { className: "sr-only", children: "Status" }),
            /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
              import_lucide_react12.BuildingIcon,
              {
                className: "h-6 w-5 text-gray-400",
                "aria-hidden": "true"
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("dd", { className: "text-sm leading-6 text-gray-500", children: fixture.stadium.name })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "mt-4 flex w-full flex-none gap-x-4 px-6", children: [
          /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("dt", { className: "flex-none", children: [
            /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("span", { className: "sr-only", children: "Available Tickets" }),
            /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
              import_solid3.TicketIcon,
              {
                className: "h-6 w-5 text-gray-400",
                "aria-hidden": "true"
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("dd", { className: "text-sm leading-6 text-gray-500", children: fixture.availableSeats > 0 ? `${fixture.availableSeats} seats available` : "Sold out" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "mt-4 flex w-full flex-none gap-x-4 px-6", children: [
          /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("dt", { className: "flex-none", children: [
            /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("span", { className: "sr-only", children: "Stadium Opens At" }),
            /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
              import_lucide_react12.AlarmClockIcon,
              {
                className: "h-6 w-5 text-gray-400",
                "aria-hidden": "true"
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("dd", { className: "text-sm leading-6 text-gray-500", children: [
            "Stadium opens at ",
            formatTime(fixture.stadiumOpenTime)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "mt-6 border-t border-gray-900/5 px-6 py-6", children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
        import_core15.Button,
        {
          variant: "white",
          disabled: fixture.availableSeats === 0,
          compact: !0,
          onClick: () => handleModal.open(),
          rightIcon: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_lucide_react12.ArrowRightIcon, { size: 16 }),
          children: fixture.availableSeats > 0 ? "Buy tickets" : "Sold out"
        }
      ) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
      import_core15.Modal,
      {
        opened: isModalOpen,
        onClose: () => handleModal.close(),
        title: "Buy tickets",
        centered: !0,
        overlayBlur: 1.2,
        overlayOpacity: 0.6,
        children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(fetcher.Form, { method: "post", replace: !0, action: "/tickets", children: /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("fieldset", { disabled: isSubmitting, className: "flex flex-col gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
            import_core15.Select,
            {
              name: "fixtureId",
              label: "Fixture",
              itemComponent: SelectItem3,
              value: selectedFixtureId,
              onChange: (e) => setSelectedFixtureId(e),
              data: upcomingFixtures.map((f) => {
                var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h;
                return {
                  fixtureDate: (_a2 = f.timeSlot) == null ? void 0 : _a2.date,
                  fixtureStartTime: (_b2 = f.timeSlot) == null ? void 0 : _b2.start,
                  fixtureEndTime: (_c2 = f.timeSlot) == null ? void 0 : _c2.end,
                  stadium: (_d2 = f.stadium) == null ? void 0 : _d2.name,
                  teamOne: (_e2 = f.teamOne) == null ? void 0 : _e2.name,
                  teamTwo: (_f2 = f.teamTwo) == null ? void 0 : _f2.name,
                  label: `${(_g2 = f.teamOne) == null ? void 0 : _g2.name} vs ${(_h = f.teamTwo) == null ? void 0 : _h.name}`,
                  value: f.id
                };
              }),
              error: (_e = (_d = fetcher.data) == null ? void 0 : _d.fieldErrors) == null ? void 0 : _e.fixtureId,
              readOnly: !0,
              required: !0
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
            import_core15.NumberInput,
            {
              name: "noOfTickets",
              label: "No of tickets",
              value: noOfTickets,
              max: fixture.availableSeats,
              onChange: (e) => setNoOfTickets(e),
              error: (_g = (_f = fetcher.data) == null ? void 0 : _f.fieldErrors) == null ? void 0 : _g.noOfTickets,
              min: 1,
              required: !0
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("p", { className: "text-sm", children: [
            "Available Seats: ",
            fixture.availableSeats
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("p", { className: "text-sm", children: totalPrice ? `Total price: ${formatCurrency(totalPrice)}` : null }),
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
            import_core15.Select,
            {
              label: "Payment method",
              clearable: !1,
              required: !0,
              defaultValue: import_client13.PaymentMethod.CREDIT_CARD,
              data: Object.values(import_client13.PaymentMethod).map((method) => ({
                label: titleCase(method.replace(/_/g, " ")),
                value: method
              }))
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_core15.Input.Wrapper, { id, label: "Credit card number", required: !0, children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
            import_core15.Input,
            {
              id,
              component: import_react_input_mask3.default,
              mask: "9999 9999 9999 9999",
              placeholder: "XXXX XXXX XXXX XXXX",
              alwaysShowMask: !1,
              defaultValue: "4242 4242 4242 4242"
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_core15.Input.Wrapper, { id: id + "cvv", label: "CVV", required: !0, children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
              import_core15.Input,
              {
                id: id + "cvv",
                name: "cvv",
                component: import_react_input_mask3.default,
                mask: "999",
                placeholder: "XXX",
                defaultValue: "123",
                alwaysShowMask: !1
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_core15.Input.Wrapper, { id: id + "cvv", label: "Expiry", required: !0, children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
              import_core15.Input,
              {
                id: id + "expiryDate",
                name: "expiryDate",
                component: import_react_input_mask3.default,
                mask: "99/9999",
                placeholder: "MM/YYYY",
                alwaysShowMask: !1,
                defaultValue: "12/2029"
              }
            ) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "mt-1 flex items-center justify-end gap-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
              import_core15.Button,
              {
                variant: "subtle",
                disabled: isSubmitting,
                onClick: () => handleModal.close(),
                color: "red",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
              import_core15.Button,
              {
                type: "submit",
                loading: isSubmitting,
                loaderPosition: "right",
                children: "Buy tickets"
              }
            )
          ] })
        ] }) })
      }
    )
  ] });
}
var SelectItem3 = React10.forwardRef(
  (props, ref) => {
    let {
      teamOne,
      teamTwo,
      fixtureDate,
      fixtureStartTime,
      fixtureEndTime,
      stadium,
      ...others
    } = props;
    return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { ref, ...others, children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_core15.Group, { noWrap: !0, children: /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_core15.Text, { size: "sm", children: [
        teamOne,
        " vs ",
        teamTwo
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_core15.Text, { size: "xs", opacity: 0.65, children: stadium }),
      /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(import_core15.Text, { size: "xs", opacity: 0.65, children: [
        formatDate(fixtureDate),
        " (",
        formatTime(fixtureStartTime),
        " -",
        " ",
        formatTime(fixtureEndTime),
        ")"
      ] })
    ] }) }) });
  }
);

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-KPTO2ODS.js", imports: ["/build/_shared/chunk-6XQUNIF7.js", "/build/_shared/chunk-Z6MCQOJL.js", "/build/_shared/chunk-6KANJRLS.js", "/build/_shared/chunk-Q3IECNXJ.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-V6E4TQBI.js", imports: ["/build/_shared/chunk-PGOH7JLP.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/__app": { id: "routes/__app", parentId: "root", path: void 0, index: void 0, caseSensitive: void 0, module: "/build/routes/__app-AUJUQT2O.js", imports: ["/build/_shared/chunk-ZHUSK2G4.js", "/build/_shared/chunk-YQX6ADP4.js", "/build/_shared/chunk-6HJM7BVW.js", "/build/_shared/chunk-XX5622KO.js", "/build/_shared/chunk-P5YPHNIW.js", "/build/_shared/chunk-BU5VY3X4.js", "/build/_shared/chunk-FPOB764B.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/__app/index": { id: "routes/__app/index", parentId: "routes/__app", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/__app/index-STOM66YT.js", imports: ["/build/_shared/chunk-KYBFV6QH.js", "/build/_shared/chunk-BQZB7SZU.js", "/build/_shared/chunk-A62XF3CA.js", "/build/_shared/chunk-J4UCJ3T4.js", "/build/_shared/chunk-PGOH7JLP.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/__app/payment-history": { id: "routes/__app/payment-history", parentId: "routes/__app", path: "payment-history", index: void 0, caseSensitive: void 0, module: "/build/routes/__app/payment-history-TDQCKCXL.js", imports: ["/build/_shared/chunk-4XRWHIFM.js", "/build/_shared/chunk-A62XF3CA.js", "/build/_shared/chunk-J4UCJ3T4.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/__app/tickets": { id: "routes/__app/tickets", parentId: "routes/__app", path: "tickets", index: void 0, caseSensitive: void 0, module: "/build/routes/__app/tickets-T32DTR2X.js", imports: ["/build/_shared/chunk-OLVAEH7O.js", "/build/_shared/chunk-KYBFV6QH.js", "/build/_shared/chunk-4XRWHIFM.js", "/build/_shared/chunk-A62XF3CA.js", "/build/_shared/chunk-J4UCJ3T4.js", "/build/_shared/chunk-PGOH7JLP.js", "/build/_shared/chunk-JA4FJ5TH.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/__auth": { id: "routes/__auth", parentId: "root", path: void 0, index: void 0, caseSensitive: void 0, module: "/build/routes/__auth-LEUD4QZY.js", imports: ["/build/_shared/chunk-FPOB764B.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/__auth/login": { id: "routes/__auth/login", parentId: "routes/__auth", path: "login", index: void 0, caseSensitive: void 0, module: "/build/routes/__auth/login-KANIYHGT.js", imports: ["/build/_shared/chunk-BU5VY3X4.js", "/build/_shared/chunk-HU4UBVUI.js", "/build/_shared/chunk-JA4FJ5TH.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/__auth/register": { id: "routes/__auth/register", parentId: "routes/__auth", path: "register", index: void 0, caseSensitive: void 0, module: "/build/routes/__auth/register-KZ5M7Y26.js", imports: ["/build/_shared/chunk-B3DSF6V2.js", "/build/_shared/chunk-PGOH7JLP.js", "/build/_shared/chunk-HU4UBVUI.js", "/build/_shared/chunk-JA4FJ5TH.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/admin": { id: "routes/admin", parentId: "root", path: "admin", index: void 0, caseSensitive: void 0, module: "/build/routes/admin-D4Q3WJ7S.js", imports: ["/build/_shared/chunk-HJLIZX7G.js", "/build/_shared/chunk-5UXHC3PJ.js", "/build/_shared/chunk-ZHUSK2G4.js", "/build/_shared/chunk-YQX6ADP4.js", "/build/_shared/chunk-6HJM7BVW.js", "/build/_shared/chunk-XX5622KO.js", "/build/_shared/chunk-P5YPHNIW.js", "/build/_shared/chunk-BU5VY3X4.js", "/build/_shared/chunk-FPOB764B.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/admin/fixtures": { id: "routes/admin/fixtures", parentId: "routes/admin", path: "fixtures", index: void 0, caseSensitive: void 0, module: "/build/routes/admin/fixtures-5ELAGFO4.js", imports: ["/build/_shared/chunk-4XRWHIFM.js", "/build/_shared/chunk-A62XF3CA.js", "/build/_shared/chunk-J4UCJ3T4.js", "/build/_shared/chunk-B3DSF6V2.js", "/build/_shared/chunk-PGOH7JLP.js", "/build/_shared/chunk-JA4FJ5TH.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/admin/index": { id: "routes/admin/index", parentId: "routes/admin", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/admin/index-ADBHNVLM.js", imports: ["/build/_shared/chunk-MTWLPFJP.js", "/build/_shared/chunk-J4UCJ3T4.js", "/build/_shared/chunk-PGOH7JLP.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/admin/orders": { id: "routes/admin/orders", parentId: "routes/admin", path: "orders", index: void 0, caseSensitive: void 0, module: "/build/routes/admin/orders-2EKTOV5I.js", imports: ["/build/_shared/chunk-BQZB7SZU.js", "/build/_shared/chunk-PGOH7JLP.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/admin/stadiums": { id: "routes/admin/stadiums", parentId: "routes/admin", path: "stadiums", index: void 0, caseSensitive: void 0, module: "/build/routes/admin/stadiums-L5ZYZWW7.js", imports: ["/build/_shared/chunk-4XRWHIFM.js", "/build/_shared/chunk-A62XF3CA.js", "/build/_shared/chunk-J4UCJ3T4.js", "/build/_shared/chunk-PGOH7JLP.js", "/build/_shared/chunk-JA4FJ5TH.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/admin/teams": { id: "routes/admin/teams", parentId: "routes/admin", path: "teams", index: void 0, caseSensitive: void 0, module: "/build/routes/admin/teams-3A2QEPME.js", imports: ["/build/_shared/chunk-4XRWHIFM.js", "/build/_shared/chunk-A62XF3CA.js", "/build/_shared/chunk-J4UCJ3T4.js", "/build/_shared/chunk-PGOH7JLP.js", "/build/_shared/chunk-JA4FJ5TH.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/admin/walk-in": { id: "routes/admin/walk-in", parentId: "routes/admin", path: "walk-in", index: void 0, caseSensitive: void 0, module: "/build/routes/admin/walk-in-HH2RAAGV.js", imports: ["/build/_shared/chunk-OLVAEH7O.js", "/build/_shared/chunk-KYBFV6QH.js", "/build/_shared/chunk-MTWLPFJP.js", "/build/_shared/chunk-J4UCJ3T4.js", "/build/_shared/chunk-PGOH7JLP.js", "/build/_shared/chunk-JA4FJ5TH.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/api/auth/logout": { id: "routes/api/auth/logout", parentId: "root", path: "api/auth/logout", index: void 0, caseSensitive: void 0, module: "/build/routes/api/auth/logout-IGEG4FNO.js", imports: void 0, hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/api/cancel-fixture": { id: "routes/api/cancel-fixture", parentId: "root", path: "api/cancel-fixture", index: void 0, caseSensitive: void 0, module: "/build/routes/api/cancel-fixture-4BQZ75UO.js", imports: void 0, hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/api/cancel-order": { id: "routes/api/cancel-order", parentId: "root", path: "api/cancel-order", index: void 0, caseSensitive: void 0, module: "/build/routes/api/cancel-order-OGAX45DZ.js", imports: void 0, hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, version: "8d7ad4f9", hmr: void 0, url: "/build/manifest-8D7AD4F9.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public\\build", future = { v2_dev: !1, unstable_postcss: !1, unstable_tailwind: !1, v2_errorBoundary: !1, v2_headers: !0, v2_meta: !1, v2_normalizeFormMethod: !1, v2_routeConvention: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/api/cancel-fixture": {
    id: "routes/api/cancel-fixture",
    parentId: "root",
    path: "api/cancel-fixture",
    index: void 0,
    caseSensitive: void 0,
    module: cancel_fixture_exports
  },
  "routes/api/cancel-order": {
    id: "routes/api/cancel-order",
    parentId: "root",
    path: "api/cancel-order",
    index: void 0,
    caseSensitive: void 0,
    module: cancel_order_exports
  },
  "routes/api/auth/logout": {
    id: "routes/api/auth/logout",
    parentId: "root",
    path: "api/auth/logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports
  },
  "routes/__auth": {
    id: "routes/__auth",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: auth_exports
  },
  "routes/__auth/register": {
    id: "routes/__auth/register",
    parentId: "routes/__auth",
    path: "register",
    index: void 0,
    caseSensitive: void 0,
    module: register_exports
  },
  "routes/__auth/login": {
    id: "routes/__auth/login",
    parentId: "routes/__auth",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: login_exports
  },
  "routes/admin": {
    id: "routes/admin",
    parentId: "root",
    path: "admin",
    index: void 0,
    caseSensitive: void 0,
    module: admin_exports
  },
  "routes/admin/fixtures": {
    id: "routes/admin/fixtures",
    parentId: "routes/admin",
    path: "fixtures",
    index: void 0,
    caseSensitive: void 0,
    module: fixtures_exports
  },
  "routes/admin/stadiums": {
    id: "routes/admin/stadiums",
    parentId: "routes/admin",
    path: "stadiums",
    index: void 0,
    caseSensitive: void 0,
    module: stadiums_exports
  },
  "routes/admin/walk-in": {
    id: "routes/admin/walk-in",
    parentId: "routes/admin",
    path: "walk-in",
    index: void 0,
    caseSensitive: void 0,
    module: walk_in_exports
  },
  "routes/admin/orders": {
    id: "routes/admin/orders",
    parentId: "routes/admin",
    path: "orders",
    index: void 0,
    caseSensitive: void 0,
    module: orders_exports
  },
  "routes/admin/index": {
    id: "routes/admin/index",
    parentId: "routes/admin",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: admin_exports2
  },
  "routes/admin/teams": {
    id: "routes/admin/teams",
    parentId: "routes/admin",
    path: "teams",
    index: void 0,
    caseSensitive: void 0,
    module: teams_exports
  },
  "routes/__app": {
    id: "routes/__app",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: app_exports
  },
  "routes/__app/payment-history": {
    id: "routes/__app/payment-history",
    parentId: "routes/__app",
    path: "payment-history",
    index: void 0,
    caseSensitive: void 0,
    module: payment_history_exports
  },
  "routes/__app/tickets": {
    id: "routes/__app/tickets",
    parentId: "routes/__app",
    path: "tickets",
    index: void 0,
    caseSensitive: void 0,
    module: tickets_exports
  },
  "routes/__app/index": {
    id: "routes/__app/index",
    parentId: "routes/__app",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: app_exports2
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  future,
  publicPath,
  routes
});
