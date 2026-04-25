import { NextResponse } from 'next/server';
import { fallbackCanteenMenu } from '@/app/lib/canteen-data';
import { getSupabaseServerClient } from '@/app/lib/supabase-server';

export async function GET() {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json({
      source: 'fallback',
      data: fallbackCanteenMenu,
      message: 'Using fictional fallback data. Configure Supabase env vars to load from database.',
    });
  }

  const { data, error } = await supabase
    .from('canteen_menu')
    .select('id, day, mealPeriod, name, description, allergens, dietaryTags, priceLabel')
    .order('day')
    .order('mealPeriod');

  if (error || !data) {
    return NextResponse.json({
      source: 'fallback',
      data: fallbackCanteenMenu,
      message: 'Supabase query failed. Falling back to fictional seed data.',
    });
  }

  return NextResponse.json({
    source: 'supabase',
    data,
  });
}
