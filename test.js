import dns from "dns";

dns.lookup("db.feaxqdtzzspcrmlnfqpq.supabase.co", (err, address) => {
  if (err) console.error("❌ DNS lookup failed:", err);
  else console.log("✅ DNS resolved:", address);
});
