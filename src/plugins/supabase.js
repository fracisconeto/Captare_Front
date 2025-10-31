import { createClient } from '@supabase/supabase-js'

// URL do seu projeto e ANON PUBLIC KEY
export const supabase = createClient(
  'https://putkkeklitgdjfxgubxd.supabase.co', 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1dGtrZWtsaXRnZGpmeGd1YnhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzMzg5OTksImV4cCI6MjA3MTkxNDk5OX0.bmmM9j6Q2hA2dP7Q7jR1v_IJQeloAIveTcLNyD4F-g4'
)
