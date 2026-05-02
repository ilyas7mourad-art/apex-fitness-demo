import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";
import type { Database } from "../../lib/types";

// ----------------------------------------------------------------
// CLI flags
// ----------------------------------------------------------------
const args = process.argv.slice(2);
const forceFlag = args.includes("--force");

if (!forceFlag) {
  console.log("This script will TRUNCATE all tables and reseed the database.");
  console.log('Run with --force to skip this confirmation and proceed.');
  process.exit(0);
}

// ----------------------------------------------------------------
// Admin client (service_role bypasses RLS)
// ----------------------------------------------------------------
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const db = createClient<Database>(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ----------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------
function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function subtractDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() - days);
  return d;
}

function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60000);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function batchInsert<T extends object>(
  table: string,
  rows: T[],
  batchSize = 500,
): Promise<void> {
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    const { error } = await db.from(table).insert(batch as never[]);
    if (error) {
      console.error(`Error inserting batch into ${table}:`, error.message);
      throw error;
    }
    process.stdout.write(`  ${table}: ${Math.min(i + batchSize, rows.length)}/${rows.length}\r`);
  }
  console.log(`  ${table}: ${rows.length} rows inserted.        `);
}

// ----------------------------------------------------------------
// Truncate all tables in reverse FK order
// ----------------------------------------------------------------
async function truncateAll(): Promise<void> {
  console.log("Truncating all tables...");
  const tables = [
    "events",
    "set_logs",
    "sessions",
    "member_programs",
    "program_exercises",
    "programs",
    "members",
    "machines",
    "gyms",
  ];

  for (const table of tables) {
    const { error } = await db.from(table).delete().neq("id", "00000000-0000-0000-0000-000000000000");
    if (error) {
      console.warn(`  Warning truncating ${table}: ${error.message}`);
    } else {
      console.log(`  Cleared: ${table}`);
    }
  }
}

// ----------------------------------------------------------------
// Seed data definitions
// ----------------------------------------------------------------

const MACHINE_DATA = [
  {
    name: "Treadmill",
    slug: "treadmill",
    category: "cardio",
    muscle_groups: ["quadriceps", "hamstrings", "calves", "glutes"],
    instructions: "Set your desired speed and incline. Start at a comfortable walking pace to warm up, then gradually increase to your target speed. Keep your posture upright, shoulders relaxed, and gaze forward. Land mid-foot beneath your hips, not out in front of you. Swing arms naturally at roughly 90 degrees.",
    common_mistakes: "Holding the handrails (reduces calorie burn and distorts gait). Setting incline too steep too soon — builds form issues. Looking down at your feet. Overstriding by landing heel-first well ahead of the body.",
    variations: "Incline walking (12% at 3–4 mph for low-impact cardio). Interval sprints (30 sec fast / 90 sec slow). Steady-state Zone 2 (60–70% max HR for fat oxidation).",
  },
  {
    name: "Rowing Machine",
    slug: "rowing-machine",
    category: "cardio",
    muscle_groups: ["back", "biceps", "core", "quadriceps", "glutes"],
    instructions: "Sit on the seat with feet strapped in at the footrests. Grip the handle with an overhand grip. The drive phase: push legs first, then lean back to 11 o'clock, then pull handle to lower ribs. The recovery phase: extend arms, lean forward, then bend knees. Maintain a smooth, continuous rhythm.",
    common_mistakes: "Using arms instead of legs — legs generate ~60% of power. Rounding the lower back on the drive. Jerking the handle. Rushing the recovery (recovery should be roughly twice as long as the drive).",
    variations: "Power 10 (every 10 strokes take 10 high-power strokes). 500m time trials. Steady 20–24 strokes per minute for endurance.",
  },
  {
    name: "Stationary Bike",
    slug: "stationary-bike",
    category: "cardio",
    muscle_groups: ["quadriceps", "hamstrings", "calves", "glutes"],
    instructions: "Adjust seat height so your knee is slightly bent (about 5–10 degrees) at the bottom of the pedal stroke. Set handlebar height for a comfortable forward lean. Keep pedal strokes smooth and circular — think scraping mud off the bottom of your shoe at the bottom of each stroke.",
    common_mistakes: "Seat too low (stresses knees). Riding with heels instead of balls of feet on pedals. Bouncing on the saddle (resistance too low). Hunching over the handlebars.",
    variations: "Spin intervals (30 sec max effort, 1 min easy). Tabata (20 sec on, 10 sec off, 8 rounds). Steady Zone 2 ride for 30–60 min.",
  },
  {
    name: "Cable Machine",
    slug: "cable-machine",
    category: "strength",
    muscle_groups: ["chest", "back", "shoulders", "biceps", "triceps", "core"],
    instructions: "Set the pulley to the desired height. Choose your attachment (straight bar, rope, single handle). Stand or sit in a stable position. Keep your core braced throughout the movement. Control the weight on both the concentric (pulling) and eccentric (returning) phases — don't let the stack crash.",
    common_mistakes: "Using too much weight and compensating with body swing. Not controlling the eccentric return. Standing too close to the stack (reduces range of motion). Letting elbows flare excessively.",
    variations: "Cable rows (mid pulley), cable chest flyes (high pulley), cable curls (low pulley), cable triceps pushdown (high pulley), face pulls (high pulley with rope).",
  },
  {
    name: "Lat Pulldown",
    slug: "lat-pulldown",
    category: "strength",
    muscle_groups: ["latissimus_dorsi", "biceps", "rear_deltoids"],
    instructions: "Sit down and adjust the thigh pad to secure your legs. Grip the bar slightly wider than shoulder width with an overhand grip. Lean back slightly (about 10–15 degrees). Pull the bar to your upper chest, leading with your elbows and squeezing your lats. Slowly return to the start position.",
    common_mistakes: "Pulling behind the neck (stresses cervical spine). Using too much body swing. Not achieving full range of motion. Gripping the bar too wide — reduces lat activation. Shrugging the shoulders on the pull.",
    variations: "Underhand grip (more biceps involvement), neutral grip, single-arm lat pulldown, straight-arm pulldown.",
  },
  {
    name: "Chest Press Machine",
    slug: "chest-press-machine",
    category: "strength",
    muscle_groups: ["pectorals", "triceps", "anterior_deltoids"],
    instructions: "Adjust the seat so handles are at mid-chest height. Sit with back flat against the pad. Grip handles with palms facing forward or inward (depending on the machine). Press forward and slightly up, extending arms without locking elbows. Slowly return, letting your chest fully stretch at the bottom.",
    common_mistakes: "Seat position too high or too low (stresses shoulder joint). Bouncing the weight stack. Flaring elbows excessively — keep them at about 45 degrees from the torso. Not controlling the eccentric.",
    variations: "Incline chest press (higher seat position), pec deck variation, unilateral single-arm press.",
  },
  {
    name: "Leg Press",
    slug: "leg-press",
    category: "strength",
    muscle_groups: ["quadriceps", "hamstrings", "glutes"],
    instructions: "Sit in the seat with your back and head against the pad. Place feet shoulder-width apart on the platform. Lower the platform by releasing the safety handles. Bend knees to about 90 degrees while controlling the descent. Press back up without locking your knees at the top.",
    common_mistakes: "Allowing knees to cave inward. Letting hips lift off the seat (reduces range and stresses lower back). Locking the knees fully at the top — keeps tension on the muscles. Placing feet too high (changes emphasis but isn't wrong if intentional).",
    variations: "Feet high and wide (more hamstrings/glutes), feet low and narrow (more quads), single-leg press for imbalances.",
  },
  {
    name: "Leg Curl Machine",
    slug: "leg-curl-machine",
    category: "strength",
    muscle_groups: ["hamstrings", "calves"],
    instructions: "Sit or lie (depending on machine type) with the pad just above your heels. Adjust the pad position so ankles sit comfortably. Curl your heels toward your glutes as far as the machine allows. Squeeze hamstrings at the top. Slowly extend back to the start position.",
    common_mistakes: "Using hip flexors to initiate the movement (swinging hips). Not reaching full range of motion. Rushing the eccentric. Letting hips lift off the pad on seated machines.",
    variations: "Seated leg curl (more hip flexion, different stretch). Standing single-leg curl for balance and imbalance correction.",
  },
  {
    name: "Shoulder Press Machine",
    slug: "shoulder-press-machine",
    category: "strength",
    muscle_groups: ["deltoids", "triceps", "upper_trapezius"],
    instructions: "Sit with back firmly against the pad. Adjust seat height so handles start at shoulder height. Grip handles with neutral or overhand grip. Press overhead until arms are nearly extended. Lower slowly back to shoulder height.",
    common_mistakes: "Arching the lower back (too heavy or seat too low). Locking elbows at the top. Shrugging shoulders up to ears instead of pressing up and out. Using momentum rather than controlled reps.",
    variations: "Single-arm press for core stability challenge. Alternating press. Adding a pause at the top for time under tension.",
  },
  {
    name: "Smith Machine",
    slug: "smith-machine",
    category: "strength",
    muscle_groups: ["pectorals", "quadriceps", "glutes", "deltoids"],
    instructions: "Position the bar at the appropriate height for your chosen exercise. For squats: bar across upper traps, feet shoulder-width forward of the bar. For bench: lie on a bench with the bar above mid-chest. Always rotate the bar to engage/disengage the hooks before and after each set.",
    common_mistakes: "Squatting with feet too close under the bar (causes forward lean). Not disengaging the safety hooks before starting. Using it as a substitute for all free-weight work — the fixed path can cause unnatural movement patterns.",
    variations: "Romanian deadlift, incline press, bent-over row, hip thrust.",
  },
  {
    name: "Assisted Pull-Up / Dip Machine",
    slug: "assisted-pullup-dip",
    category: "strength",
    muscle_groups: ["latissimus_dorsi", "biceps", "triceps", "chest"],
    instructions: "For pull-ups: select a counterweight (higher weight = easier). Kneel or stand on the platform. Grip the overhead bar wider than shoulder width. Pull yourself up until chin clears the bar, then lower with control. For dips: use the lower handles, keep torso slightly forward for chest focus or upright for more triceps.",
    common_mistakes: "Selecting too much counterweight — you should still feel challenged. Not achieving full range of motion. Kipping or swinging to assist the movement. Letting the platform slam on the way up.",
    variations: "Narrow grip pull-up (more biceps), wide grip (more lats), parallel grip chin-up, weighted using a vest once you build strength.",
  },
  {
    name: "Hack Squat",
    slug: "hack-squat",
    category: "strength",
    muscle_groups: ["quadriceps", "glutes", "hamstrings"],
    instructions: "Step into the machine, position shoulders under the pads, and place feet shoulder-width on the platform. Release the safety handles. Lower yourself by bending knees to at least 90 degrees, keeping chest up and knees tracking over your toes. Drive through your heels to return to the start.",
    common_mistakes: "Knees caving inward. Not going deep enough. Heels rising off the platform. Rounding the lower back at the bottom.",
    variations: "Narrow stance (quad emphasis), wide stance (glute/adductor emphasis), pause reps at the bottom for strength.",
  },
  {
    name: "Hyperextension Bench",
    slug: "hyperextension-bench",
    category: "strength",
    muscle_groups: ["erector_spinae", "glutes", "hamstrings"],
    instructions: "Position hip pads just above your hips so you can bend freely at the waist. Hook your feet under the leg pad. Fold your arms across your chest or hold a weight plate. Lower your torso until parallel to the floor (or slightly below). Squeeze your glutes and raise back up until your body is in a straight line — do not hyperextend.",
    common_mistakes: "Hyperextending the back at the top (causes spinal compression). Using momentum to jerk up. Rounding the back on the descent. Holding breath — exhale on the way up.",
    variations: "Bodyweight, weighted (hold plate at chest), oblique twist at the top for core activation.",
  },
  {
    name: "Seated Cable Row",
    slug: "seated-cable-row",
    category: "strength",
    muscle_groups: ["latissimus_dorsi", "middle_trapezius", "rhomboids", "biceps"],
    instructions: "Sit at the machine with feet on the platform. Grasp the close-grip handle and sit up straight. Pull the handle to your lower abdomen, driving elbows back and squeezing shoulder blades together. Pause briefly. Slowly extend arms back out, feeling the stretch in your back.",
    common_mistakes: "Rounding forward on the eccentric — maintain a neutral spine throughout. Using excessive body swing (rocking forward and back). Pulling too high toward the chest instead of the abs. Shrugging instead of retracting.",
    variations: "Wide grip bar (more upper back), single arm, overhand grip (more lower trap activation).",
  },
  {
    name: "Pec Deck / Chest Fly Machine",
    slug: "pec-deck",
    category: "strength",
    muscle_groups: ["pectorals", "anterior_deltoids"],
    instructions: "Adjust the seat so handles are at chest height with arms slightly bent. Sit with back flat against the pad. Grip the handles or place forearms on the pads (depending on machine). Bring arms together in a hugging motion, squeezing your chest at the front. Slowly return and feel the chest stretch.",
    common_mistakes: "Going too heavy and losing the arc motion. Letting elbows go too far back (stresses the shoulder joint). Not maintaining contact with the back pad. Stopping short of full contraction at the center.",
    variations: "Flat pec deck, cable chest fly (more constant tension), single-arm cable fly for imbalances.",
  },
  {
    name: "Abdominal Crunch Machine",
    slug: "ab-crunch-machine",
    category: "strength",
    muscle_groups: ["rectus_abdominis", "obliques"],
    instructions: "Adjust the seat and knee pad. Sit upright and grip the handles by your head. Exhale and crunch forward, contracting your abs and bringing your chest toward your knees. Pause at the fully crunched position. Inhale as you slowly return to the upright position, maintaining ab tension.",
    common_mistakes: "Pulling on your head/neck with the handles. Using hip flexors instead of abs (check if your abs are actually contracting). Moving too fast — make each rep slow and deliberate. Not achieving full extension on return.",
    variations: "Oblique crunch (rotate slightly to each side), cable crunch, bodyweight crunch on a mat.",
  },
  {
    name: "Battle Ropes",
    slug: "battle-ropes",
    category: "cardio",
    muscle_groups: ["shoulders", "core", "arms", "back"],
    instructions: "Stand at the end of the ropes, feet hip-width apart, knees slightly bent, hips back (athletic stance). Grip the rope ends with an overhand grip. Alternate arms to create waves that travel to the anchor point. Keep your core braced and stay low in your hips throughout.",
    common_mistakes: "Standing with feet together and knees locked — reduces power and increases injury risk. Making small, weak waves — dig deep and use the whole arm. Letting the upper body hunch forward. Forgetting to breathe.",
    variations: "Alternating waves, simultaneous double waves, lateral slams, power slams, rope circles.",
  },
  {
    name: "Kettlebell Rack",
    slug: "kettlebell-rack",
    category: "free_weights",
    muscle_groups: ["full_body"],
    instructions: "Select an appropriate kettlebell weight. For swings: hinge at hips (not squatting), grip handle, hike bell between legs, then drive hips forward explosively to swing to chest height. The power comes from the hip hinge. For goblet squats: hold at chest, feet slightly wider than hip-width, squat deep with an upright torso.",
    common_mistakes: "Squatting instead of hinging in the swing (uses quads instead of posterior chain). Letting the bell pull you forward — maintain a neutral spine. Using too heavy a weight before mastering technique. Not bracing the core throughout.",
    variations: "Two-handed swing, single-arm swing, Turkish get-up, goblet squat, Romanian deadlift, clean and press.",
  },
];

const MEMBER_NAMES = [
  // Gulf/Arab (30)
  { name: "Ahmed Al-Mansoori", gender: "male" as const },
  { name: "Fatima Al-Rashidi", gender: "female" as const },
  { name: "Mohammed Al-Hamad", gender: "male" as const },
  { name: "Hessa Al-Zaabi", gender: "female" as const },
  { name: "Khalid Al-Nuaimi", gender: "male" as const },
  { name: "Maryam Al-Ketbi", gender: "female" as const },
  { name: "Sultan Al-Dhaheri", gender: "male" as const },
  { name: "Noura Al-Qubaisi", gender: "female" as const },
  { name: "Omar Al-Mazrouei", gender: "male" as const },
  { name: "Latifa Al-Falasi", gender: "female" as const },
  { name: "Yusuf Hassan", gender: "male" as const },
  { name: "Aisha Mohammed", gender: "female" as const },
  { name: "Hamad Al-Shamsi", gender: "male" as const },
  { name: "Sara Al-Mulla", gender: "female" as const },
  { name: "Ali Al-Blooshi", gender: "male" as const },
  { name: "Fatema Al-Suwaidi", gender: "female" as const },
  { name: "Saif Al-Ketbi", gender: "male" as const },
  { name: "Mariam Al-Shamsi", gender: "female" as const },
  { name: "Zayed Al-Mansoori", gender: "male" as const },
  { name: "Shaikha Al-Habtoor", gender: "female" as const },
  { name: "Abdullah Al-Zarouni", gender: "male" as const },
  { name: "Layla Al-Maamari", gender: "female" as const },
  { name: "Saeed Al-Qubaisi", gender: "male" as const },
  { name: "Dana Al-Farsi", gender: "female" as const },
  { name: "Rashid Al-Nuaimi", gender: "male" as const },
  { name: "Hind Al-Mazrouei", gender: "female" as const },
  { name: "Tariq Al-Muhairi", gender: "male" as const },
  { name: "Reem Al-Ali", gender: "female" as const },
  { name: "Walid Al-Shehhi", gender: "male" as const },
  { name: "Nadia Al-Hammadi", gender: "female" as const },
  // UK/Irish (15)
  { name: "James Thomson", gender: "male" as const },
  { name: "Sarah Clark", gender: "female" as const },
  { name: "Thomas Webb", gender: "male" as const },
  { name: "Emma Davies", gender: "female" as const },
  { name: "Alexander Scott", gender: "male" as const },
  { name: "Charlotte Brown", gender: "female" as const },
  { name: "Oliver Reid", gender: "male" as const },
  { name: "Sophie Taylor", gender: "female" as const },
  { name: "Jack Morrison", gender: "male" as const },
  { name: "Amelia Hughes", gender: "female" as const },
  { name: "William Cooper", gender: "male" as const },
  { name: "Grace Mitchell", gender: "female" as const },
  { name: "Harry Nelson", gender: "male" as const },
  { name: "Isla Campbell", gender: "female" as const },
  { name: "Ethan Walker", gender: "male" as const },
  // South Asian (15)
  { name: "Priya Sharma", gender: "female" as const },
  { name: "Arjun Patel", gender: "male" as const },
  { name: "Deepa Nair", gender: "female" as const },
  { name: "Rahul Singh", gender: "male" as const },
  { name: "Meera Iyer", gender: "female" as const },
  { name: "Vikram Mehta", gender: "male" as const },
  { name: "Anjali Kumar", gender: "female" as const },
  { name: "Rohan Verma", gender: "male" as const },
  { name: "Pooja Reddy", gender: "female" as const },
  { name: "Sameer Khan", gender: "male" as const },
  { name: "Aditya Rajan", gender: "male" as const },
  { name: "Kavya Pillai", gender: "female" as const },
  { name: "Siddharth Bose", gender: "male" as const },
  { name: "Divya Krishnan", gender: "female" as const },
  { name: "Nikhil Joshi", gender: "male" as const },
  // French/European (10)
  { name: "Léa Bernard", gender: "female" as const },
  { name: "Pierre Dubois", gender: "male" as const },
  { name: "Marie Laurent", gender: "female" as const },
  { name: "François Martin", gender: "male" as const },
  { name: "Sophie Lefebvre", gender: "female" as const },
  { name: "Antoine Rousseau", gender: "male" as const },
  { name: "Claire Moreau", gender: "female" as const },
  { name: "Jean-Baptiste Roux", gender: "male" as const },
  { name: "Isabelle Fontaine", gender: "female" as const },
  { name: "Maxime Girard", gender: "male" as const },
  // Other (10)
  { name: "Carlos Mendez", gender: "male" as const },
  { name: "Ana Ruiz", gender: "female" as const },
  { name: "Jun Nakamura", gender: "male" as const },
  { name: "Yuki Tanaka", gender: "female" as const },
  { name: "Chen Wei", gender: "male" as const },
  { name: "Li Mei", gender: "female" as const },
  { name: "Brendan O'Sullivan", gender: "male" as const },
  { name: "Fatou Diallo", gender: "female" as const },
  { name: "Amara Dieng", gender: "male" as const },
  { name: "Tariq Osman", gender: "male" as const },
];

const DEMO_FEATURED_NAMES = new Set([
  "Ahmed Al-Mansoori",
  "Sarah Clark",
  "Priya Sharma",
  "James Thomson",
  "Léa Bernard",
  "Mohammed Al-Hamad",
  "Arjun Patel",
  "Emma Davies",
  "Fatima Al-Rashidi",
  "Carlos Mendez",
]);

const GOALS = [
  "Weight Loss",
  "Muscle Gain",
  "Endurance",
  "Strength",
  "General Fitness",
  "Flexibility",
  "Athletic Performance",
];

const FITNESS_LEVELS = ["beginner", "intermediate", "advanced"] as const;

const PROGRAM_DATA = [
  {
    name: "Build & Burn",
    slug: "build-and-burn",
    description: "A high-intensity hybrid program combining strength training and metabolic conditioning to build muscle while torching fat. Perfect for those who want the best of both worlds.",
    target_level: "intermediate" as const,
    duration_weeks: 8,
    sessions_per_week: 4,
  },
  {
    name: "Lean Foundations",
    slug: "lean-foundations",
    description: "A structured beginner-friendly program focused on building lean muscle, mastering movement patterns, and establishing healthy habits. The ideal starting point.",
    target_level: "beginner" as const,
    duration_weeks: 6,
    sessions_per_week: 3,
  },
  {
    name: "Strong Start",
    slug: "strong-start",
    description: "A strength-first program for beginners ready to build a solid foundation of functional strength. Progressive overload with compound movements at the core.",
    target_level: "beginner" as const,
    duration_weeks: 8,
    sessions_per_week: 3,
  },
  {
    name: "Power Push",
    slug: "power-push",
    description: "An advanced program designed to push your limits with heavy compound lifts, power movements, and strategic deload phases. For experienced gym-goers ready to level up.",
    target_level: "advanced" as const,
    duration_weeks: 12,
    sessions_per_week: 5,
  },
];

// ----------------------------------------------------------------
// Main seed function
// ----------------------------------------------------------------
async function seed(): Promise<void> {
  console.log("\n=== Apex Fitness Demo — Database Seed ===\n");

  // 1. Truncate
  await truncateAll();
  console.log();

  // 2. Gym
  console.log("Inserting gym...");
  const { data: gymData, error: gymError } = await db
    .from("gyms")
    .insert({
      name: "Apex Fitness Dubai",
      slug: "apex-fitness-dubai",
      city: "Dubai",
      country: "AE",
      timezone: "Asia/Dubai",
    })
    .select("id")
    .single();

  if (gymError || !gymData) {
    console.error("Failed to insert gym:", gymError?.message);
    process.exit(1);
  }
  const gymId = gymData.id;
  console.log(`  Gym created: ${gymId}`);

  // 3. Machines (18)
  console.log("\nInserting machines...");
  const machineInserts = MACHINE_DATA.map((m) => ({
    gym_id: gymId,
    ...m,
  }));
  const { data: machinesData, error: machinesError } = await db
    .from("machines")
    .insert(machineInserts)
    .select("id, slug");

  if (machinesError || !machinesData) {
    console.error("Failed to insert machines:", machinesError?.message);
    process.exit(1);
  }
  console.log(`  ${machinesData.length} machines inserted.`);
  const machineIdBySlug: Record<string, string> = {};
  machinesData.forEach((m) => { machineIdBySlug[m.slug] = m.id; });

  // 4. Programs
  console.log("\nInserting programs...");
  const programInserts = PROGRAM_DATA.map((p) => ({
    gym_id: gymId,
    ...p,
  }));
  const { data: programsData, error: programsError } = await db
    .from("programs")
    .insert(programInserts)
    .select("id, slug");

  if (programsError || !programsData) {
    console.error("Failed to insert programs:", programsError?.message);
    process.exit(1);
  }
  console.log(`  ${programsData.length} programs inserted.`);
  const programIdBySlug: Record<string, string> = {};
  programsData.forEach((p) => { programIdBySlug[p.slug] = p.id; });

  // 5. Program exercises
  console.log("\nInserting program exercises...");
  const programExercises = [
    // Build & Burn — 4 days
    // Day 1: Upper Push
    { program_id: programIdBySlug["build-and-burn"], machine_id: machineIdBySlug["chest-press-machine"], name: "Chest Press", day_number: 1, order_index: 1, sets: 4, reps_min: 8, reps_max: 12, rest_seconds: 90 },
    { program_id: programIdBySlug["build-and-burn"], machine_id: machineIdBySlug["shoulder-press-machine"], name: "Shoulder Press", day_number: 1, order_index: 2, sets: 3, reps_min: 10, reps_max: 15, rest_seconds: 75 },
    { program_id: programIdBySlug["build-and-burn"], machine_id: machineIdBySlug["pec-deck"], name: "Pec Deck Fly", day_number: 1, order_index: 3, sets: 3, reps_min: 12, reps_max: 15, rest_seconds: 60 },
    { program_id: programIdBySlug["build-and-burn"], machine_id: machineIdBySlug["cable-machine"], name: "Cable Triceps Pushdown", day_number: 1, order_index: 4, sets: 3, reps_min: 12, reps_max: 15, rest_seconds: 60 },
    { program_id: programIdBySlug["build-and-burn"], machine_id: machineIdBySlug["battle-ropes"], name: "Battle Ropes Finisher", day_number: 1, order_index: 5, sets: 4, reps_min: null, reps_max: null, rest_seconds: 60, notes: "30 sec on, 30 sec off" },
    // Day 2: Lower
    { program_id: programIdBySlug["build-and-burn"], machine_id: machineIdBySlug["leg-press"], name: "Leg Press", day_number: 2, order_index: 1, sets: 4, reps_min: 10, reps_max: 15, rest_seconds: 90 },
    { program_id: programIdBySlug["build-and-burn"], machine_id: machineIdBySlug["leg-curl-machine"], name: "Leg Curl", day_number: 2, order_index: 2, sets: 3, reps_min: 12, reps_max: 15, rest_seconds: 75 },
    { program_id: programIdBySlug["build-and-burn"], machine_id: machineIdBySlug["hack-squat"], name: "Hack Squat", day_number: 2, order_index: 3, sets: 3, reps_min: 10, reps_max: 12, rest_seconds: 90 },
    { program_id: programIdBySlug["build-and-burn"], machine_id: machineIdBySlug["treadmill"], name: "Treadmill Sprints", day_number: 2, order_index: 4, sets: 8, reps_min: null, reps_max: null, rest_seconds: 90, notes: "30 sec sprint / 90 sec walk" },
    // Day 3: Upper Pull
    { program_id: programIdBySlug["build-and-burn"], machine_id: machineIdBySlug["lat-pulldown"], name: "Lat Pulldown", day_number: 3, order_index: 1, sets: 4, reps_min: 8, reps_max: 12, rest_seconds: 90 },
    { program_id: programIdBySlug["build-and-burn"], machine_id: machineIdBySlug["seated-cable-row"], name: "Seated Cable Row", day_number: 3, order_index: 2, sets: 4, reps_min: 10, reps_max: 12, rest_seconds: 90 },
    { program_id: programIdBySlug["build-and-burn"], machine_id: machineIdBySlug["cable-machine"], name: "Cable Bicep Curl", day_number: 3, order_index: 3, sets: 3, reps_min: 12, reps_max: 15, rest_seconds: 60 },
    { program_id: programIdBySlug["build-and-burn"], machine_id: machineIdBySlug["rowing-machine"], name: "Rowing HIIT", day_number: 3, order_index: 4, sets: 5, reps_min: null, reps_max: null, rest_seconds: 60, notes: "1 min hard / 1 min easy" },
    // Day 4: Full Body Conditioning
    { program_id: programIdBySlug["build-and-burn"], machine_id: machineIdBySlug["kettlebell-rack"], name: "Kettlebell Swings", day_number: 4, order_index: 1, sets: 4, reps_min: 15, reps_max: 20, rest_seconds: 60 },
    { program_id: programIdBySlug["build-and-burn"], machine_id: machineIdBySlug["ab-crunch-machine"], name: "Ab Crunch", day_number: 4, order_index: 2, sets: 3, reps_min: 15, reps_max: 20, rest_seconds: 45 },
    { program_id: programIdBySlug["build-and-burn"], machine_id: machineIdBySlug["hyperextension-bench"], name: "Back Extension", day_number: 4, order_index: 3, sets: 3, reps_min: 12, reps_max: 15, rest_seconds: 60 },
    { program_id: programIdBySlug["build-and-burn"], machine_id: machineIdBySlug["stationary-bike"], name: "Bike Finisher", day_number: 4, order_index: 4, sets: 1, reps_min: null, reps_max: null, rest_seconds: 0, notes: "20 min steady Zone 2" },

    // Lean Foundations — 3 days
    { program_id: programIdBySlug["lean-foundations"], machine_id: machineIdBySlug["treadmill"], name: "Treadmill Warm-Up", day_number: 1, order_index: 1, sets: 1, reps_min: null, reps_max: null, rest_seconds: 0, notes: "10 min brisk walk" },
    { program_id: programIdBySlug["lean-foundations"], machine_id: machineIdBySlug["chest-press-machine"], name: "Chest Press", day_number: 1, order_index: 2, sets: 3, reps_min: 10, reps_max: 15, rest_seconds: 90 },
    { program_id: programIdBySlug["lean-foundations"], machine_id: machineIdBySlug["lat-pulldown"], name: "Lat Pulldown", day_number: 1, order_index: 3, sets: 3, reps_min: 10, reps_max: 15, rest_seconds: 90 },
    { program_id: programIdBySlug["lean-foundations"], machine_id: machineIdBySlug["leg-press"], name: "Leg Press", day_number: 1, order_index: 4, sets: 3, reps_min: 12, reps_max: 15, rest_seconds: 90 },
    { program_id: programIdBySlug["lean-foundations"], machine_id: machineIdBySlug["ab-crunch-machine"], name: "Ab Crunch", day_number: 1, order_index: 5, sets: 2, reps_min: 15, reps_max: 20, rest_seconds: 60 },
    { program_id: programIdBySlug["lean-foundations"], machine_id: machineIdBySlug["stationary-bike"], name: "Bike Cool-Down", day_number: 1, order_index: 6, sets: 1, reps_min: null, reps_max: null, rest_seconds: 0, notes: "10 min easy" },
    { program_id: programIdBySlug["lean-foundations"], machine_id: machineIdBySlug["rowing-machine"], name: "Rowing Warm-Up", day_number: 2, order_index: 1, sets: 1, reps_min: null, reps_max: null, rest_seconds: 0, notes: "10 min easy rowing" },
    { program_id: programIdBySlug["lean-foundations"], machine_id: machineIdBySlug["shoulder-press-machine"], name: "Shoulder Press", day_number: 2, order_index: 2, sets: 3, reps_min: 10, reps_max: 15, rest_seconds: 90 },
    { program_id: programIdBySlug["lean-foundations"], machine_id: machineIdBySlug["cable-machine"], name: "Cable Row", day_number: 2, order_index: 3, sets: 3, reps_min: 12, reps_max: 15, rest_seconds: 90 },
    { program_id: programIdBySlug["lean-foundations"], machine_id: machineIdBySlug["leg-curl-machine"], name: "Leg Curl", day_number: 2, order_index: 4, sets: 3, reps_min: 12, reps_max: 15, rest_seconds: 90 },
    { program_id: programIdBySlug["lean-foundations"], machine_id: machineIdBySlug["hyperextension-bench"], name: "Back Extension", day_number: 3, order_index: 1, sets: 3, reps_min: 12, reps_max: 15, rest_seconds: 60 },
    { program_id: programIdBySlug["lean-foundations"], machine_id: machineIdBySlug["assisted-pullup-dip"], name: "Assisted Pull-Up", day_number: 3, order_index: 2, sets: 3, reps_min: 8, reps_max: 12, rest_seconds: 90 },
    { program_id: programIdBySlug["lean-foundations"], machine_id: machineIdBySlug["kettlebell-rack"], name: "Goblet Squat", day_number: 3, order_index: 3, sets: 3, reps_min: 12, reps_max: 15, rest_seconds: 75 },
    { program_id: programIdBySlug["lean-foundations"], machine_id: machineIdBySlug["treadmill"], name: "Treadmill Interval", day_number: 3, order_index: 4, sets: 6, reps_min: null, reps_max: null, rest_seconds: 120, notes: "1 min jog / 2 min walk" },

    // Strong Start — 3 days
    { program_id: programIdBySlug["strong-start"], machine_id: machineIdBySlug["smith-machine"], name: "Smith Machine Squat", day_number: 1, order_index: 1, sets: 4, reps_min: 6, reps_max: 10, rest_seconds: 120 },
    { program_id: programIdBySlug["strong-start"], machine_id: machineIdBySlug["chest-press-machine"], name: "Chest Press", day_number: 1, order_index: 2, sets: 4, reps_min: 6, reps_max: 10, rest_seconds: 120 },
    { program_id: programIdBySlug["strong-start"], machine_id: machineIdBySlug["lat-pulldown"], name: "Lat Pulldown", day_number: 1, order_index: 3, sets: 4, reps_min: 6, reps_max: 10, rest_seconds: 120 },
    { program_id: programIdBySlug["strong-start"], machine_id: machineIdBySlug["leg-press"], name: "Leg Press", day_number: 2, order_index: 1, sets: 4, reps_min: 8, reps_max: 12, rest_seconds: 90 },
    { program_id: programIdBySlug["strong-start"], machine_id: machineIdBySlug["shoulder-press-machine"], name: "Shoulder Press", day_number: 2, order_index: 2, sets: 3, reps_min: 8, reps_max: 12, rest_seconds: 90 },
    { program_id: programIdBySlug["strong-start"], machine_id: machineIdBySlug["seated-cable-row"], name: "Seated Cable Row", day_number: 2, order_index: 3, sets: 3, reps_min: 8, reps_max: 12, rest_seconds: 90 },
    { program_id: programIdBySlug["strong-start"], machine_id: machineIdBySlug["hack-squat"], name: "Hack Squat", day_number: 3, order_index: 1, sets: 3, reps_min: 10, reps_max: 12, rest_seconds: 90 },
    { program_id: programIdBySlug["strong-start"], machine_id: machineIdBySlug["assisted-pullup-dip"], name: "Assisted Dip", day_number: 3, order_index: 2, sets: 3, reps_min: 8, reps_max: 12, rest_seconds: 90 },
    { program_id: programIdBySlug["strong-start"], machine_id: machineIdBySlug["hyperextension-bench"], name: "Back Extension", day_number: 3, order_index: 3, sets: 3, reps_min: 12, reps_max: 15, rest_seconds: 75 },
    { program_id: programIdBySlug["strong-start"], machine_id: machineIdBySlug["ab-crunch-machine"], name: "Ab Crunch", day_number: 3, order_index: 4, sets: 3, reps_min: 15, reps_max: 20, rest_seconds: 60 },

    // Power Push — 5 days
    { program_id: programIdBySlug["power-push"], machine_id: machineIdBySlug["smith-machine"], name: "Smith Machine Squat", day_number: 1, order_index: 1, sets: 5, reps_min: 3, reps_max: 6, rest_seconds: 180 },
    { program_id: programIdBySlug["power-push"], machine_id: machineIdBySlug["hack-squat"], name: "Hack Squat", day_number: 1, order_index: 2, sets: 4, reps_min: 6, reps_max: 8, rest_seconds: 150 },
    { program_id: programIdBySlug["power-push"], machine_id: machineIdBySlug["leg-press"], name: "Leg Press", day_number: 1, order_index: 3, sets: 3, reps_min: 10, reps_max: 15, rest_seconds: 90 },
    { program_id: programIdBySlug["power-push"], machine_id: machineIdBySlug["leg-curl-machine"], name: "Leg Curl", day_number: 1, order_index: 4, sets: 4, reps_min: 8, reps_max: 10, rest_seconds: 90 },
    { program_id: programIdBySlug["power-push"], machine_id: machineIdBySlug["chest-press-machine"], name: "Chest Press Max Effort", day_number: 2, order_index: 1, sets: 5, reps_min: 3, reps_max: 5, rest_seconds: 180 },
    { program_id: programIdBySlug["power-push"], machine_id: machineIdBySlug["pec-deck"], name: "Pec Deck", day_number: 2, order_index: 2, sets: 4, reps_min: 10, reps_max: 12, rest_seconds: 90 },
    { program_id: programIdBySlug["power-push"], machine_id: machineIdBySlug["shoulder-press-machine"], name: "Shoulder Press", day_number: 2, order_index: 3, sets: 4, reps_min: 6, reps_max: 8, rest_seconds: 120 },
    { program_id: programIdBySlug["power-push"], machine_id: machineIdBySlug["cable-machine"], name: "Triceps Pushdown", day_number: 2, order_index: 4, sets: 3, reps_min: 10, reps_max: 15, rest_seconds: 75 },
    { program_id: programIdBySlug["power-push"], machine_id: machineIdBySlug["lat-pulldown"], name: "Lat Pulldown Heavy", day_number: 3, order_index: 1, sets: 5, reps_min: 4, reps_max: 6, rest_seconds: 180 },
    { program_id: programIdBySlug["power-push"], machine_id: machineIdBySlug["seated-cable-row"], name: "Seated Cable Row", day_number: 3, order_index: 2, sets: 4, reps_min: 6, reps_max: 8, rest_seconds: 120 },
    { program_id: programIdBySlug["power-push"], machine_id: machineIdBySlug["assisted-pullup-dip"], name: "Weighted Pull-Up", day_number: 3, order_index: 3, sets: 4, reps_min: 5, reps_max: 8, rest_seconds: 150 },
    { program_id: programIdBySlug["power-push"], machine_id: machineIdBySlug["cable-machine"], name: "Cable Bicep Curl", day_number: 3, order_index: 4, sets: 3, reps_min: 10, reps_max: 15, rest_seconds: 75 },
    { program_id: programIdBySlug["power-push"], machine_id: machineIdBySlug["rowing-machine"], name: "Rowing HIIT", day_number: 4, order_index: 1, sets: 6, reps_min: null, reps_max: null, rest_seconds: 60, notes: "1 min max / 1 min easy" },
    { program_id: programIdBySlug["power-push"], machine_id: machineIdBySlug["battle-ropes"], name: "Battle Ropes", day_number: 4, order_index: 2, sets: 5, reps_min: null, reps_max: null, rest_seconds: 60, notes: "45 sec on / 60 sec off" },
    { program_id: programIdBySlug["power-push"], machine_id: machineIdBySlug["ab-crunch-machine"], name: "Ab Circuit", day_number: 4, order_index: 3, sets: 4, reps_min: 15, reps_max: 20, rest_seconds: 45 },
    { program_id: programIdBySlug["power-push"], machine_id: machineIdBySlug["hyperextension-bench"], name: "Back Extension", day_number: 4, order_index: 4, sets: 3, reps_min: 12, reps_max: 15, rest_seconds: 60 },
    { program_id: programIdBySlug["power-push"], machine_id: machineIdBySlug["smith-machine"], name: "Smith Machine Deadlift", day_number: 5, order_index: 1, sets: 5, reps_min: 3, reps_max: 5, rest_seconds: 180 },
    { program_id: programIdBySlug["power-push"], machine_id: machineIdBySlug["leg-press"], name: "Leg Press Burnout", day_number: 5, order_index: 2, sets: 3, reps_min: 20, reps_max: 25, rest_seconds: 90, notes: "Drop weight, high reps" },
    { program_id: programIdBySlug["power-push"], machine_id: machineIdBySlug["kettlebell-rack"], name: "KB Swings", day_number: 5, order_index: 3, sets: 4, reps_min: 15, reps_max: 20, rest_seconds: 60 },
    { program_id: programIdBySlug["power-push"], machine_id: machineIdBySlug["treadmill"], name: "Treadmill HIIT Finisher", day_number: 5, order_index: 4, sets: 10, reps_min: null, reps_max: null, rest_seconds: 60, notes: "30 sec sprint / 60 sec walk" },
  ];

  await batchInsert("program_exercises", programExercises);

  // 6. Members (80)
  console.log("\nInserting members...");
  // Shuffle so status distribution is random across the name list
  // Distribution: 56 active, 12 at_risk, 8 churned, 4 paused (total 80)
  const shuffledNames = shuffle([...MEMBER_NAMES]);
  const memberInserts = shuffledNames.map(({ name, gender }, i) => {
    let status: "active" | "at_risk" | "churned" | "paused";
    if (i < 56) status = "active";
    else if (i < 68) status = "at_risk";
    else if (i < 76) status = "churned";
    else status = "paused";
    return {
      gym_id: gymId,
      full_name: name,
      email: `${name.toLowerCase().replace(/[^a-z0-9]/g, ".")}@demo.apexfitness.ae`,
      avatar_seed: name.toLowerCase().replace(/\s+/g, "-"),
      gender,
      fitness_level: randomChoice(FITNESS_LEVELS),
      goal: randomChoice(GOALS),
      joined_at: subtractDays(new Date(), randomBetween(30, 365)).toISOString(),
      notes: DEMO_FEATURED_NAMES.has(name) ? "DEMO_FEATURED" : null,
      status,
      is_active: status !== "churned",
    };
  });

  const { data: membersData, error: membersError } = await db
    .from("members")
    .insert(memberInserts)
    .select("id, full_name");

  if (membersError || !membersData) {
    console.error("Failed to insert members:", membersError?.message);
    process.exit(1);
  }
  console.log(`  ${membersData.length} members inserted.`);
  const memberIdByName: Record<string, string> = {};
  const nameToStatus: Record<string, string> = {};
  memberInserts.forEach((m) => { nameToStatus[m.full_name] = m.status; });
  const memberStatusMap: Record<string, string> = {};
  membersData.forEach((m) => {
    memberIdByName[m.full_name] = m.id;
    memberStatusMap[m.id] = nameToStatus[m.full_name] ?? "active";
  });
  const allMemberIds = membersData.map((m) => m.id);

  // 7. Member programs (~50 assignments)
  console.log("\nInserting member programs...");
  const programIds = Object.values(programIdBySlug);
  const memberProgramInserts = allMemberIds.slice(0, 50).map((memberId, i) => ({
    member_id: memberId,
    program_id: programIds[i % programIds.length],
    started_at: subtractDays(new Date(), randomBetween(14, 90)).toISOString(),
    is_active: true,
  }));

  await batchInsert("member_programs", memberProgramInserts);

  // 8. Sessions (~3 months of data)
  console.log("\nGenerating sessions...");
  const sessionInserts: Array<{
    member_id: string;
    gym_id: string;
    program_id: string | null;
    started_at: string;
    ended_at: string;
    duration_seconds: number;
  }> = [];

  const now = new Date();
  for (const memberId of allMemberIds) {
    const status = memberStatusMap[memberId] ?? "active";
    let sessionsCount: number;
    if (status === "active") sessionsCount = randomBetween(12, 35);
    else if (status === "at_risk") sessionsCount = randomBetween(3, 10);
    else if (status === "churned") sessionsCount = randomBetween(1, 5);
    else sessionsCount = randomBetween(5, 15); // paused

    for (let s = 0; s < sessionsCount; s++) {
      // Status-aware recency: at_risk = gap 21+ days, churned = gap 30+ days, paused = gap 14+ days
      let daysAgo: number;
      if (status === "active") daysAgo = randomBetween(0, 60);
      else if (status === "at_risk") daysAgo = randomBetween(22, 90);
      else if (status === "churned") daysAgo = randomBetween(31, 90);
      else daysAgo = randomBetween(15, 90); // paused
      const sessionStart = subtractDays(now, daysAgo);
      sessionStart.setHours(randomBetween(6, 21), randomBetween(0, 59), 0, 0);
      const durationMinutes = randomBetween(30, 90);
      const sessionEnd = addMinutes(sessionStart, durationMinutes);
      const programId = Math.random() > 0.3 ? randomChoice(programIds) : null;

      sessionInserts.push({
        member_id: memberId,
        gym_id: gymId,
        program_id: programId,
        started_at: sessionStart.toISOString(),
        ended_at: sessionEnd.toISOString(),
        duration_seconds: durationMinutes * 60,
      });
    }
  }

  // Sort by started_at for cleaner data
  sessionInserts.sort((a, b) => a.started_at.localeCompare(b.started_at));

  const { data: sessionsData, error: sessionsError } = await db
    .from("sessions")
    .insert(sessionInserts)
    .select("id");

  if (sessionsError || !sessionsData) {
    console.error("Failed to insert sessions:", sessionsError?.message);
    process.exit(1);
  }
  console.log(`  ${sessionsData.length} sessions inserted.`);
  const sessionIds = sessionsData.map((s) => s.id);

  // 9. Set logs (~3–8 sets per session)
  console.log("\nGenerating set logs...");
  const machineIds = Object.values(machineIdBySlug);
  const exercises = [
    "Chest Press", "Lat Pulldown", "Leg Press", "Shoulder Press",
    "Cable Row", "Leg Curl", "Hack Squat", "Pec Deck", "Bicep Curl",
    "Triceps Pushdown", "Leg Extension", "Back Extension", "Ab Crunch",
    "Kettlebell Swing", "Battle Ropes", "Treadmill Run",
  ];

  const setLogInserts: Array<{
    session_id: string;
    machine_id: string | null;
    exercise_name: string;
    set_number: number;
    reps: number | null;
    weight_kg: number | null;
    duration_seconds: number | null;
    logged_at: string;
  }> = [];

  for (const sessionId of sessionIds) {
    const numExercises = randomBetween(3, 6);
    const sessionIndex = sessionInserts.findIndex((_, idx) => {
      return idx < sessionsData.length;
    });
    const baseTime = new Date(sessionInserts[Math.min(sessionIndex, sessionInserts.length - 1)]?.started_at ?? now.toISOString());

    let minuteOffset = 5;
    for (let e = 0; e < numExercises; e++) {
      const exerciseName = randomChoice(exercises);
      const machineId = Math.random() > 0.3 ? randomChoice(machineIds) : null;
      const numSets = randomBetween(2, 5);
      const isCardio = exerciseName.includes("Treadmill") || exerciseName.includes("Battle");

      for (let setNum = 1; setNum <= numSets; setNum++) {
        const loggedAt = addMinutes(baseTime, minuteOffset);
        minuteOffset += randomBetween(3, 8);

        setLogInserts.push({
          session_id: sessionId,
          machine_id: machineId,
          exercise_name: exerciseName,
          set_number: setNum,
          reps: isCardio ? null : randomBetween(6, 20),
          weight_kg: isCardio ? null : randomBetween(20, 120) + 0.5 * randomBetween(0, 1),
          duration_seconds: isCardio ? randomBetween(30, 300) : null,
          logged_at: loggedAt.toISOString(),
        });
      }
    }
  }

  await batchInsert("set_logs", setLogInserts);

  // 10. Events (~2000–3000)
  console.log("\nGenerating events...");
  const eventTypes = [
    "check_in",
    "check_in",
    "check_in",  // weight it heavily
    "program_start",
    "session_complete",
    "session_complete",
    "milestone_10_sessions",
    "milestone_25_sessions",
    "qr_scan",
    "qr_scan",
    "program_complete",
    "member_joined",
  ];

  const eventInserts: Array<{
    gym_id: string;
    member_id: string | null;
    type: string;
    payload: Record<string, unknown>;
    occurred_at: string;
  }> = [];

  // member_joined events for all 80 members
  for (const memberId of allMemberIds) {
    const memberName = membersData.find((m) => m.id === memberId)?.full_name ?? "Member";
    eventInserts.push({
      gym_id: gymId,
      member_id: memberId,
      type: "member_joined",
      payload: { member_name: memberName },
      occurred_at: subtractDays(now, randomBetween(30, 365)).toISOString(),
    });
  }

  // Random events
  const targetEventCount = randomBetween(2000, 2500);
  for (let i = eventInserts.length; i < targetEventCount; i++) {
    const memberId = randomChoice(allMemberIds);
    const type = randomChoice(eventTypes);
    const daysAgo = randomBetween(0, 90);
    const occurred = subtractDays(now, daysAgo);
    occurred.setHours(randomBetween(6, 22), randomBetween(0, 59), 0, 0);

    let payload: Record<string, unknown> = {};
    if (type === "check_in") {
      payload = { method: randomChoice(["app", "qr_code", "front_desk"]) };
    } else if (type === "qr_scan") {
      payload = { machine_id: randomChoice(machineIds), machine_name: randomChoice(exercises) };
    } else if (type === "session_complete") {
      payload = { duration_minutes: randomBetween(30, 90), exercises_logged: randomBetween(3, 8) };
    } else if (type === "program_start") {
      payload = { program_id: randomChoice(programIds) };
    } else if (type === "milestone_10_sessions" || type === "milestone_25_sessions") {
      payload = { sessions_completed: type.includes("10") ? 10 : 25 };
    }

    eventInserts.push({
      gym_id: gymId,
      member_id: memberId,
      type,
      payload,
      occurred_at: occurred.toISOString(),
    });
  }

  await batchInsert("events", eventInserts);

  console.log("\n=== Seed complete! ===\n");
  console.log(`Gym:      Apex Fitness Dubai (${gymId})`);
  console.log(`Machines: ${machinesData.length}`);
  console.log(`Programs: ${programsData.length}`);
  console.log(`Members:  ${membersData.length} (${DEMO_FEATURED_NAMES.size} featured)`);
  console.log(`Sessions: ${sessionIds.length}`);
  console.log(`Set logs: ${setLogInserts.length}`);
  console.log(`Events:   ${eventInserts.length}`);
  console.log();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
