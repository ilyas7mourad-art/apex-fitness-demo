/**
 * Apply the initial schema migration to Supabase via the SQL HTTP API.
 * Uses the Management API's database/query endpoint.
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import { readFileSync } from "fs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

// Extract project ref from URL
const projectRef = supabaseUrl.replace("https://", "").replace(".supabase.co", "");
console.log(`Project ref: ${projectRef}`);

async function runSQL(sql: string): Promise<void> {
  const endpoint = `https://${projectRef}.supabase.co/rest/v1/rpc/query`;

  // Use the SQL via pg REST API directly
  const response = await fetch(
    `https://${projectRef}.supabase.co/pg/query`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: serviceRoleKey!,
        Authorization: `Bearer ${serviceRoleKey}`,
      },
      body: JSON.stringify({ query: sql }),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP ${response.status}: ${text}`);
  }
}

async function applyMigration(): Promise<void> {
  const migrationSQL = readFileSync(
    "supabase/migrations/0001_initial_schema.sql",
    "utf-8"
  );

  console.log("Applying migration via Supabase SQL API...");

  // Split the SQL into individual statements
  // Note: This is a simple split - handles most cases
  const statements = migrationSQL
    .split(/;\s*\n/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !s.startsWith("--"));

  console.log(`Found ${statements.length} SQL statements to execute.`);

  let success = 0;
  let failed = 0;

  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i].trim();
    if (!stmt) continue;

    try {
      await runSQL(stmt);
      success++;
      process.stdout.write(`  [${i + 1}/${statements.length}] OK\r`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      // Ignore "already exists" errors
      if (msg.includes("already exists") || msg.includes("does not exist")) {
        success++;
      } else {
        console.warn(`\n  Statement ${i + 1} failed: ${msg.slice(0, 100)}`);
        failed++;
      }
    }
  }

  console.log(`\nMigration complete: ${success} OK, ${failed} failed.`);
}

applyMigration().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
