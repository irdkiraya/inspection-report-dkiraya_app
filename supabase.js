import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'ISI_URL_SUPABASE_ANDA'
const supabaseAnonKey = 'ISI_ANON_KEY_SUPABASE_ANDA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)