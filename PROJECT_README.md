# Survey Form Application

A Next.js survey form application with Supabase backend integration for collecting and displaying survey responses.

## Features

- **Modern Survey Form**: Clean, responsive form with validation
- **Real-time Database**: Direct integration with Supabase for data storage
- **Results Dashboard**: Comprehensive statistics and data visualization
- **Controlled Components**: Fully controlled form inputs with proper state management
- **Error Handling**: Robust error handling with user feedback
- **Loading States**: User-friendly loading indicators

## Form Fields

- **Personal Details**:
  - Full Name
  - Email Address
  - Date of Birth
  - Contact Details

- **Preferences**:
  - Favorite Food (multiple choice checkboxes)
  - Rating questions (5-point scale):
    - I like to eat out
    - I like to watch movies
    - I like to watch TV
    - I like to listen to radio

## Database Schema

The application uses a Supabase table `tbl_surveys` with the following structure:

```sql
CREATE TABLE tbl_surveys (
  id SERIAL PRIMARY KEY,
  fullname TEXT NOT NULL,
  email TEXT NOT NULL,
  dateofbirth DATE NOT NULL,
  contact TEXT NOT NULL,
  favouriteFood TEXT[],
  "I like to eat out" INTEGER,
  "I like to watch movies" INTEGER,
  "I like to watch TV" INTEGER,
  "I like to listen to radio" INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Pages

- `/` - Main survey form
- `/surveyresults` - Results dashboard with statistics

## Setup Instructions

1. **Environment Variables**: Create a `.env.local` file with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Access the Application**:
   - Survey Form: http://localhost:3000
   - Results Dashboard: http://localhost:3000/surveyresults

## API Endpoints

- `GET /api/results` - Fetch survey statistics and aggregated data

## Technologies Used

- **Next.js 15** - React framework with App Router
- **Supabase** - Backend as a Service (BaaS)
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - State management and side effects

## Features Implemented

✅ **Survey Form**:
- Controlled form inputs
- Form validation
- Checkbox handling for multiple selections
- Radio button groups for rating questions
- Loading states during submission
- Success/error feedback

✅ **Database Integration**:
- Direct Supabase client integration
- Real-time data insertion
- Error handling for database operations

✅ **Results Dashboard**:
- Total survey count
- Age statistics (average, oldest, youngest)
- Favorite food distribution
- Rating averages with visual progress bars
- Responsive design with Tailwind CSS

✅ **User Experience**:
- Loading indicators
- Form reset after successful submission
- Clear error messages
- Modern, clean UI design

## Project Structure

```
survey-form/
├── components/
│   ├── navbar.jsx          # Navigation component
│   ├── results.jsx         # Results dashboard component
│   └── surveyform.jsx      # Main survey form component
├── lib/
│   └── supabase.js         # Supabase client configuration
├── src/app/
│   ├── api/
│   │   └── results/
│   │       └── route.js    # Results API endpoint
│   └── surveyresults/
│       └── page.jsx        # Results page
└── .env.local              # Environment variables
```

## Development Status

**COMPLETED:**
- ✅ Supabase client setup and configuration
- ✅ Survey form with controlled components
- ✅ Database integration for form submissions
- ✅ Results dashboard with comprehensive statistics
- ✅ Error handling and user feedback
- ✅ Loading states and form validation
- ✅ API endpoints for data retrieval
- ✅ Responsive design implementation

**TESTED:**
- ✅ Form submission to Supabase database
- ✅ Results page data fetching and display
- ✅ Error handling scenarios

The application is fully functional and ready for production use with proper Supabase database integration.
