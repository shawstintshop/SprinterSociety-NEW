import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Van life related search terms for varied content
const searchQueries = [
  'van life build tour',
  'van life solar installation',
  'van life electrical setup',
  'van life plumbing',
  'van life heating',
  'van life off grid',
  'van life maintenance',
  'van life camping spots',
  'van life travel',
  'van life tips',
  'sprinter van conversion',
  'van life adventure',
  'boondocking van life',
  'van life kitchen build',
  'van life bathroom'
];

// Parse ISO 8601 duration to human readable format
function parseDuration(duration: string): string {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '0:00';
  
  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Categorize videos based on title and description
function categorizeVideo(title: string, description: string): string {
  const text = (title + ' ' + description).toLowerCase();
  
  if (text.includes('build') || text.includes('tour') || text.includes('conversion')) return 'builds';
  if (text.includes('solar') || text.includes('electrical') || text.includes('battery')) return 'electrical';
  if (text.includes('plumbing') || text.includes('water') || text.includes('heating') || text.includes('heater')) return 'plumbing';
  if (text.includes('maintenance') || text.includes('repair') || text.includes('fix')) return 'maintenance';
  if (text.includes('camping') || text.includes('boondocking') || text.includes('travel') || text.includes('road trip')) return 'camping';
  if (text.includes('tips') || text.includes('hack') || text.includes('trick')) return 'tips';
  if (text.includes('offroad') || text.includes('off-road') || text.includes('4x4')) return 'offroad';
  if (text.includes('review') || text.includes('product') || text.includes('gear')) return 'reviews';
  if (text.includes('mod') || text.includes('upgrade') || text.includes('install')) return 'mods';
  
  return 'van-life';
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting YouTube video fetch...');
    
    const youtubeApiKey = Deno.env.get('YOUTUBE_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!youtubeApiKey) {
      throw new Error('YouTube API key not configured');
    }

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase configuration missing');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const { maxResults = 20, forceRefresh = false } = await req.json().catch(() => ({}));
    
    console.log(`Fetching ${maxResults} videos, forceRefresh: ${forceRefresh}`);

    // Check if we should skip fetching (don't fetch if we have recent videos and not forcing)
    if (!forceRefresh) {
      const { data: recentVideos } = await supabase
        .from('youtube_videos')
        .select('id')
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()) // Last 24 hours
        .limit(1);
      
      if (recentVideos && recentVideos.length > 0) {
        console.log('Recent videos found, skipping fetch');
        return new Response(JSON.stringify({ 
          message: 'Recent videos already exist, use forceRefresh=true to update',
          count: 0 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    let allVideos: any[] = [];
    const videosPerQuery = Math.ceil(maxResults / searchQueries.length);
    
    // Fetch videos from multiple search queries for variety
    for (let i = 0; i < Math.min(searchQueries.length, 5); i++) { // Limit to 5 queries to avoid quota issues
      const query = searchQueries[i];
      console.log(`Searching for: ${query}`);
      
      try {
        // Search for videos
        const searchResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?` +
          `part=snippet&type=video&videoDuration=medium&videoDefinition=high&` +
          `order=relevance&publishedAfter=${new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()}&` + // Last 30 days
          `q=${encodeURIComponent(query)}&maxResults=${videosPerQuery}&key=${youtubeApiKey}`
        );

        if (!searchResponse.ok) {
          console.error(`Search API error for "${query}":`, await searchResponse.text());
          continue;
        }

        const searchData = await searchResponse.json();
        console.log(`Found ${searchData.items?.length || 0} videos for "${query}"`);

        if (!searchData.items || searchData.items.length === 0) continue;

        // Get video IDs for detailed info
        const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');
        
        // Fetch detailed video information
        const detailsResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?` +
          `part=snippet,contentDetails,statistics&id=${videoIds}&key=${youtubeApiKey}`
        );

        if (!detailsResponse.ok) {
          console.error(`Details API error:`, await detailsResponse.text());
          continue;
        }

        const detailsData = await detailsResponse.json();
        
        // Process and add videos
        if (detailsData.items) {
          allVideos.push(...detailsData.items);
        }
      } catch (error) {
        console.error(`Error processing query "${query}":`, error);
        continue;
      }
    }

    console.log(`Total videos fetched: ${allVideos.length}`);

    // Process and insert videos into database
    let insertedCount = 0;
    const videoInserts = [];

    for (const video of allVideos) {
      try {
        const category = categorizeVideo(video.snippet.title, video.snippet.description || '');
        
        const videoData = {
          youtube_id: video.id,
          title: video.snippet.title,
          description: video.snippet.description || '',
          thumbnail_url: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium?.url || video.snippet.thumbnails.default?.url,
          channel_title: video.snippet.channelTitle,
          channel_id: video.snippet.channelId,
          published_at: video.snippet.publishedAt,
          duration: parseDuration(video.contentDetails.duration),
          view_count: parseInt(video.statistics.viewCount || '0'),
          like_count: parseInt(video.statistics.likeCount || '0'),
          category: category,
          tags: video.snippet.tags || []
        };

        videoInserts.push(videoData);
      } catch (error) {
        console.error(`Error processing video ${video.id}:`, error);
      }
    }

    // Batch insert videos
    if (videoInserts.length > 0) {
      const { data, error } = await supabase
        .from('youtube_videos')
        .upsert(videoInserts, { 
          onConflict: 'youtube_id',
          ignoreDuplicates: false 
        });

      if (error) {
        console.error('Database insert error:', error);
        throw error;
      }

      insertedCount = videoInserts.length;
      console.log(`Successfully inserted/updated ${insertedCount} videos`);
    }

    return new Response(JSON.stringify({ 
      message: 'YouTube videos fetched successfully',
      count: insertedCount,
      categories: [...new Set(videoInserts.map(v => v.category))]
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in fetch-youtube-videos function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Check function logs for more information'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});