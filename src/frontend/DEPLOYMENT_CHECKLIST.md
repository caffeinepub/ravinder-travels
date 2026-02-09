# Ravinder Travels - Frontend Deployment Checklist

## Pre-Deployment Build Steps

1. **Ensure backend is deployed first**
   ```bash
   dfx deploy backend
   ```

2. **Generate backend bindings**
   ```bash
   dfx generate backend
   ```

3. **Build frontend**
   ```bash
   cd frontend
   npm run build
   # or
   pnpm build
   ```

4. **Verify build output**
   - Check that `frontend/dist` directory exists
   - Verify `frontend/dist/env.json` is present
   - Confirm generated assets are in `frontend/dist/assets/generated/`

## Post-Deployment Verification (Smoke Tests)

### 1. Marketing Page Loads
- [ ] Open the deployed URL in a browser
- [ ] Verify the Marketing page renders without errors
- [ ] Check browser console for any runtime errors
- [ ] Confirm hero image loads correctly
- [ ] Confirm logo in header loads correctly

### 2. Booking Form Submission
- [ ] Scroll to "Book Your Ride" section
- [ ] Fill out all required fields:
  - Name
  - Phone number
  - Service type (select from dropdown)
  - Pickup location
  - Drop location
  - Date & time
  - Notes (optional)
- [ ] Click "Submit Request" button
- [ ] Verify success message appears: "Your booking request has been submitted successfully! We'll contact you soon."
- [ ] Confirm form clears after successful submission

### 3. Admin Navigation & Authentication
- [ ] Click "Admin" link in header (desktop) or mobile menu
- [ ] Verify navigation to Admin Requests page
- [ ] Confirm login prompt appears if not authenticated
- [ ] Click "Login" button
- [ ] Complete Internet Identity authentication flow
- [ ] Verify successful login (button changes to "Logout")

### 4. Admin Requests View (Authenticated)
- [ ] After successful login, verify booking requests table loads
- [ ] Confirm previously submitted test booking appears in the list
- [ ] Check that all booking details display correctly:
  - Name
  - Phone
  - Service Type
  - Pickup Location
  - Drop Location
  - Date & Time
  - Notes
- [ ] Verify "Back to Home" button returns to Marketing page

### 5. Responsive Design Check
- [ ] Test on mobile viewport (< 768px)
- [ ] Test on tablet viewport (768px - 1024px)
- [ ] Test on desktop viewport (> 1024px)
- [ ] Verify mobile hamburger menu works
- [ ] Confirm all sections are accessible on mobile

## Common Issues & Troubleshooting

### Assets Not Loading
- Verify generated assets exist in `frontend/public/assets/generated/`
- Check browser network tab for 404 errors
- Confirm asset paths use the `assetUrl` helper

### Backend Connection Errors
- Verify backend canister is deployed and running
- Check `frontend/dist/env.json` contains correct canister IDs
- Confirm network connectivity to Internet Computer

### Authentication Issues
- Clear browser cache and cookies
- Try incognito/private browsing mode
- Verify Internet Identity service is accessible
- Check browser console for authentication errors

### Form Submission Fails
- Verify backend canister is deployed
- Check browser console for error messages
- Confirm all required form fields are filled
- Test with anonymous (guest) access first

## Acceptance Criteria (REQ-11)

✅ Deployment completes successfully with no build/deploy errors
✅ The deployed frontend loads in a browser and renders the Marketing page without runtime errors
✅ Submitting the "Book a Ride / Request a Quote" form succeeds against the deployed backend (request is accepted and success feedback is shown)
✅ Admin view remains accessible (via the existing UI navigation) and can load booking requests when authenticated as an admin

## Notes

- The app uses Internet Identity for authentication
- Guest users can submit booking requests without logging in
- Only authenticated admin users can view all booking requests
- The first authenticated user is automatically assigned admin role
