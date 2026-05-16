# Settings Sections Expansion (Finance Portal)

## Overview
Expand the Settings page to include fully fleshed sections for Security, Notifications, and Billing while keeping the page as a single, stacked layout. Preserve the existing visual language and component style. The left column becomes a compact account overview and quick actions panel.

## Goals
- Provide complete content for Security, Notifications, and Billing sections.
- Keep a single Settings route with a clear, scannable layout.
- Match the existing brand styling, spacing, and typography.

## Non-goals
- No backend wiring or persistence.
- No new routes or tabs.
- No auth, payments, or real data integration.

## User Stories
- As a user, I can see and manage my security settings and active sessions.
- As a user, I can customize notification channels and events.
- As a user, I can view my plan, payment method, and invoices.

## Page Layout
- Two-column layout.
  - Left column: Account Overview card + Quick Actions list.
  - Right column: stacked sections in this order: Profile, Security, Notifications, Billing.

## Section Details
### Profile
- Keep existing fields and actions.
- Minor spacing cleanup to align with other sections.

### Security
- Password card with CTA to change password.
- Two-factor authentication status with CTA to enable/manage.
- Active sessions list (device, location, last active) with sign-out-other-sessions CTA.
- Login alerts toggle with short helper text.

### Notifications
- Channels card: Email, SMS, In-app toggles.
- Events card: Report status updates, Approvals, Thread messages, Weekly digest.
- Quiet hours row with toggle and start/end time fields (disabled if toggle off).

### Billing
- Plan summary: tier, renewal date, seats.
- Payment method: masked card and update CTA.
- Billing address: short block and edit link.
- Recent invoices list with date, amount, status, and download action.

## Data Model (Static)
All content remains static seed data in the Settings component. No API calls or mutations.

## Error and Empty States
- If an optional list is empty (sessions or invoices), show a short helper line and keep the card.
- Actions are non-functional UI elements with consistent hover states.

## Accessibility
- Buttons and toggles remain keyboard reachable.
- Labels are visible and associated with inputs.
- Use existing contrast tokens and avoid new colors.

## Files to Change
- src/routes/settings.tsx: main layout and new sections.

## Testing Plan
- Visual check for alignment and spacing.
- Verify all buttons and toggles render with correct states.
- Confirm layout works on small and large breakpoints.
