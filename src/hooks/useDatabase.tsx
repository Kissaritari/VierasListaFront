
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://okhmiydbagubyoeheoso.supabase.co'
const supabaseKey = process.env.SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
const data = await fetch('https://okhmiydbagubyoeheoso.supabase.co/rest/v1/countries', {
  headers: {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9raG1peWRiYWd1YnlvZWhlb3NvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwOTUzOTQsImV4cCI6MjA2NTY3MTM5NH0.gVmI18E_s6pGBtsXpNAFGEcDb02c7XgLtoENWqn4CrY'
  }
})
  .then(res => res.json())
  .catch(error => {
    // Handle error
  });