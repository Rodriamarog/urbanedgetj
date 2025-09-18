# Urban Edge TJ - F1 Racing Jackets Waitlist Setup

## Backend Integration Complete ✅

Your F1 racing jacket waitlist now has full backend functionality with ConvertKit and Facebook Pixel integration.

## What's Been Implemented

### 1. Environment Variables
- `.env.local` and `.env.example` files created
- Configuration for ConvertKit API and Facebook Pixel

### 2. API Routes
- `/api/subscribe` endpoint for email capture
- Integrates with ConvertKit API
- Handles duplicate subscriptions gracefully
- Returns standardized "URBANEDGE20" coupon code

### 3. Facebook Pixel Integration
- Automatic pageview tracking
- Lead event tracking on email capture
- Development/production environment handling

### 4. Enhanced UI
- Real API integration instead of mock data
- Improved success state with coupon display
- Better error handling and user feedback
- Loading states during submission

## Next Steps - Required Configuration

### 1. ConvertKit Setup
1. Get your ConvertKit API key from: https://app.convertkit.com/account_settings/advanced_settings
2. Create a form in ConvertKit and get the Form ID
3. Update `.env.local`:
   ```
   CONVERTKIT_API_KEY=your_actual_api_key
   CONVERTKIT_FORM_ID=your_actual_form_id
   ```

### 2. Facebook Pixel Setup
1. Create a Facebook Pixel in your Facebook Ads Manager
2. Get your Pixel ID
3. Update `.env.local`:
   ```
   NEXT_PUBLIC_FACEBOOK_PIXEL_ID=your_actual_pixel_id
   ```

### 3. ConvertKit Email Automation
- Set up welcome email sequence in ConvertKit
- Include "URBANEDGE20" coupon code in the email
- Tag subscribers with: `urbanedge20`, `f1-waitlist`, `mexico`

## Testing
1. Server is running on: http://localhost:3001
2. Test email submission with valid email
3. Check ConvertKit for new subscribers
4. Verify Facebook Pixel events in Facebook Events Manager

## Production Deployment
- Add environment variables to your hosting platform (Vercel, Netlify, etc.)
- Ensure Facebook Pixel is working in production
- Test ConvertKit integration with real emails

## Files Created/Modified
- `/app/api/subscribe/route.ts` - Email subscription API
- `/components/FacebookPixel.tsx` - Facebook Pixel provider
- `/app/layout.tsx` - Added Facebook Pixel provider
- `/app/page.tsx` - Updated form submission logic
- `/.env.local` - Environment variables
- `/.env.example` - Environment variables template

Your waitlist is ready for Facebook ads and real email capture! 🏎️