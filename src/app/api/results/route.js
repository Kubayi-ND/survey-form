import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    // Initialize Supabase client with error handling
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables');
      return Response.json({ error: 'Configuration error' }, { status: 500 });
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch all survey data
    const { data: surveys, error } = await supabase
      .from('tbl_surveys')
      .select('*');

    if (error) {
      console.error('Supabase error:', error);
      return Response.json({ error: 'Failed to fetch survey data' }, { status: 500 });
    }

    if (!surveys || surveys.length === 0) {
      return Response.json({ total: 0 });
    }

    // Calculate statistics
    const total = surveys.length;
    
    // Calculate age statistics from date of birth
    const ages = surveys
      .filter(survey => survey.dateofbirth)
      .map(survey => {
        const birthDate = new Date(survey.dateofbirth);
        const today = new Date();
        return today.getFullYear() - birthDate.getFullYear();
      });

    const averageAge = ages.length > 0 ? Math.round(ages.reduce((sum, age) => sum + age, 0) / ages.length) : 0;
    const oldest = ages.length > 0 ? Math.max(...ages) : 0;
    const youngest = ages.length > 0 ? Math.min(...ages) : 0;

    // Calculate pizza percentage
    const pizzaCount = surveys
      .filter(survey => survey.favouriteFood && survey.favouriteFood.includes('Pizza'))
      .length;
    const pizzaPercentage = total > 0 ? Math.round((pizzaCount / total) * 100) : 0;    // Calculate eat out average rating
    const eatOutRatings = surveys
      .filter(survey => survey.eat_out_rating)
      .map(survey => parseInt(survey.eat_out_rating))
      .filter(rating => !isNaN(rating));
    
    const eatOutAverage = eatOutRatings.length > 0 
      ? (eatOutRatings.reduce((sum, rating) => sum + rating, 0) / eatOutRatings.length).toFixed(1)
      : 0;

    // Calculate ratings averages for all questions
    const ratingQuestions = [
      { key: 'eat_out_rating', label: 'I like to eat out' },
      { key: 'watch_movies_rating', label: 'I like to watch movies' },
      { key: 'watch_tv_rating', label: 'I like to watch TV' },
      { key: 'listen_radio_rating', label: 'I like to listen to radio' }
    ];
     
    const ratingsData = {};
    
    ratingQuestions.forEach(question => {
      const ratings = surveys
        .filter(survey => survey[question.key])
        .map(survey => parseInt(survey[question.key]))
        .filter(rating => !isNaN(rating));
      
      ratingsData[question.label] = ratings.length > 0 
        ? (ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1)
        : 0;
    });

    // Calculate favorite food distribution
    const foodCounts = {};
    const allFoods = ['Pizza', 'Pasta', 'Pap and Wors'];
    
    allFoods.forEach(food => {
      const count = surveys
        .filter(survey => survey.favouriteFood && survey.favouriteFood.includes(food))
        .length;
      foodCounts[food] = {
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0
      };
    });

    return Response.json({
      total,
      averageAge,
      oldest,
      youngest,
      pizzaPercentage,
      eatOutAverage,
      ratingsData,
      foodCounts
    });

  } catch (err) {
    console.error('Unexpected error:', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
