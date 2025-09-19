import { and, eq } from "drizzle-orm";
import db from "@/lib/db/db.ts";
import { location } from "@/lib/db/schema/location.ts";
import { InsertLocation } from "@/lib/db/schema/location.ts";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
  "1234567890abcdefghijklmnopqrstuvwxyz",
  5,
);

export async function findLocationByName(
  existing: InsertLocation,
  userId: number,
) {
  return await db.query.location.findFirst({
    where: and(
      eq(location.name, existing.name),
      eq(location.userId, userId),
    ),
  });
}

export async function findLocationBySlug(slug: string) {
  return await db.query.location.findFirst({
    where: eq(location.slug, slug),
  });
}

export async function findUniqueSlug(slug: string) {
  let existing = !!(await findLocationBySlug(slug));

  while (existing) {
    const id = nanoid();
    const idSlug = `${slug}-${id}`;
    existing = !!(await findLocationBySlug(idSlug));
    if (!existing) {
      return idSlug;
    }
  }
  return slug;
}

export async function insertLocation(
  insertable: InsertLocation,
  userId: number,
  slug: string,
) {
  const [created] = await db.insert(location).values({
    ...insertable,
    userId: userId,
    slug: slug,
  }).returning();
  return created;
}
