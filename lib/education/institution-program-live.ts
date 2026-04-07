/**
 * Institution / education pilot (key redemption, public licensing email). Off by default — `/education`
 * stays a read-only “coming soon” preview (no placeholder email).
 *
 * Enable with `NEXT_PUBLIC_EDUCATION_INSTITUTION_LIVE=true`.
 * When live, set `NEXT_PUBLIC_EDUCATION_CONTACT_EMAIL` to show the mailto; otherwise only an operator hint is shown.
 */
export function isEducationInstitutionProgramLive(): boolean {
  return process.env.NEXT_PUBLIC_EDUCATION_INSTITUTION_LIVE === 'true';
}
