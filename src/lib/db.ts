import { neon, type NeonQueryFunction } from "@neondatabase/serverless"

// Create a singleton instance of the SQL client
let sqlClient: NeonQueryFunction<any, any>

export function getSqlClient() {
  if (!sqlClient) {
    sqlClient = neon(process.env.DATABASE_URL!)
  }
  return sqlClient
}

// Export the SQL client directly for convenience
const sql = getSqlClient()
export default sql

// Cache the database queries for ISR
export const revalidationTime = 60 * 60 * 24 * 30 // 1 month in seconds

