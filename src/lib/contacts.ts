// Single source of truth for public contact identifiers used across components.
export const CONTACT = {
  email: "info@veliorgroup.com",
  whatsapp: {
    it: { e164: "393203238814", display: "+39 320 323 8814" },
    al: { e164: "355696555559", display: "+355 69 655 5559" },
  },
} as const;

export const waLink = (e164: string) => `https://wa.me/${e164}`;
