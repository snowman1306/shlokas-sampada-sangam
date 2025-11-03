import { supabase } from './client';
import type { Database } from './types';

type Tables = Database['public']['Tables'];
type ShlokaRow = Tables['shlokas']['Row'];
type CategoryRow = Tables['categories']['Row'];
type TranslationRow = Tables['translations']['Row'];
type WeatherData = Tables['weather_data']['Row'];
type Policy = Tables['government_policies']['Row'];
type ChatMessage = Tables['chat_messages']['Row'];

// Categories
export const categoryAPI = {
  async list() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    if (error) throw error;
    return data;
  },

  async create(name: string, description?: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('categories')
      .insert({ 
        name, 
        description,
        created_by: user.id
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};

// Shlokas
export const shlokaAPI = {
  async list(options?: { categoryId?: string; isPublic?: boolean }) {
    let query = supabase
      .from('shlokas')
      .select(`
        *,
        categories (*),
        translations (*)
      `);

    if (options?.categoryId) {
      query = query.eq('category_id', options.categoryId);
    }
    if (typeof options?.isPublic === 'boolean') {
      query = query.eq('is_public', options.isPublic);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .rpc('get_shloka_with_translations', { p_shloka_id: id });
    if (error) throw error;
    return data;
  },

  async create(shloka: {
    text: string;
    transliteration?: string;
    meaning?: string;
    source?: string;
    categoryId?: string;
    isPublic?: boolean;
  }) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('shlokas')
      .insert({
        text: shloka.text,
        transliteration: shloka.transliteration,
        meaning: shloka.meaning,
        source: shloka.source,
        category_id: shloka.categoryId,
         created_by: user.id,
        is_public: shloka.isPublic ?? false
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<ShlokaRow>) {
    const { data, error } = await supabase
      .from('shlokas')
      .update({ ...updates, id })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};

// Translations
export const translationAPI = {
  async create(translation: {
    shlokaId: string;
    language: string;
    translation: string;
  }) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('translations')
      .insert({
  shloka_id: translation.shlokaId,
  language: translation.language,
  translation: translation.translation,
  created_by: user.id,
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id: string, translation: string) {
    const { data, error } = await supabase
      .from('translations')
      .update({ id, translation })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};

// Weather API
export const weatherAPI = {
  async getWeather(city: string): Promise<WeatherData | null> {
    const { data, error } = await supabase
      .from('weather_data')
      .select('*')
      .eq('city', city)
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateWeather(data: Omit<Tables['weather_data']['Insert'], 'id' | 'created_at' | 'updated_at'>) {
    const { error } = await supabase.rpc('update_weather_data', {
      p_city: data.city,
      p_temperature: data.temperature,
      p_conditions: data.conditions,
      p_humidity: data.humidity,
      p_wind_speed: data.wind_speed
    });
    if (error) throw error;
  }
};

// Government Policies API
export const policyAPI = {
  async getPolicies(language: string = 'en'): Promise<Policy[]> {
    const { data, error } = await supabase
      .from('government_policies')
      .select('*')
      .eq('language', language)
      .eq('is_active', true)
      .order('published_date', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getPolicyById(id: string): Promise<Policy | null> {
    const { data, error } = await supabase
      .from('government_policies')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }
};

// Chat API
export const chatAPI = {
  async sendMessage(message: string, messageType: 'text' | 'image' | 'voice', mediaUrl?: string): Promise<ChatMessage> {
    const user = supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('chat_messages')
      .insert({
        user_id: (await user).data.user?.id,
        message,
        message_type: messageType,
        media_url: mediaUrl
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getMessageHistory(): Promise<ChatMessage[]> {
    const user = supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', (await user).data.user?.id)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  }
};

// Favorites
export const favoriteAPI = {
  async toggle(shlokaId: string) {
    const { data: existing } = await supabase
      .from('favorites')
      .select()
      .eq('shloka_id', shlokaId)
      .maybeSingle();

    if (existing) {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('id', existing.id);
      if (error) throw error;
      return null;
    } else {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('favorites')
           .insert({ 
             shloka_id: shlokaId,
             user_id: user.id
           })
        .select()
        .single();
      if (error) throw error;
      return data;
    }
  },

  async list() {
    const { data, error } = await supabase
      .from('favorites')
      .select(`
        *,
        shlokas (
          *,
          categories (*),
             user_id: user.id
          translations (*)
        )
      `);
    if (error) throw error;
    return data;
  }
};