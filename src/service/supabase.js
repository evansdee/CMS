

import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://qtubihsbqxewhrenphaz.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0dWJpaHNicXhld2hyZW5waGF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIxNTQzOTUsImV4cCI6MjAzNzczMDM5NX0.rNSdCBgfmcwynP0dwOBjZ3Q0OoXPjzOgLvUwuZ3lFj0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
