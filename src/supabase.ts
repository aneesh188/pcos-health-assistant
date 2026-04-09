import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://kptvgnmpclvswhejlttg.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_aowlG6USWkVSstyFtDvTEg_1U3LpvWZ'

export const supabase = createClient(supabaseUrl, supabaseKey)