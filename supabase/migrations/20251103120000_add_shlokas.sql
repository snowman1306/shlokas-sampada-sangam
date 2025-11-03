-- Create shlokas table with translations
CREATE TABLE public.shlokas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE,
  original text not null,
  translation_en text,
  translation_hi text,
  author text,
  created_at timestamptz default now()
);

-- Insert a few sample shlokas for display
INSERT INTO public.shlokas (slug, original, translation_en, translation_hi, author)
VALUES
('shloka-1', 'शिवकान्त शम्भो...', 'Shivakanta Shambho...', 'शिवकान्त शम्भो...', 'Anonymous'),
('shloka-2', 'व्यासेन वाचः...', 'Verses by Vyasa...', 'व्यासेन वाचः...', 'Vyasa');
