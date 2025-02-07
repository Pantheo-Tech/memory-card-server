export class GameRawgBasicDto {
  id: number;
  name: string;
  slug: string;
  background_image: string;
}

export class GameRawgDto extends GameRawgBasicDto {
  released?: string;
  tba?: boolean;
  rating?: number;
  rating_top?: number;
  ratings?: Record<string, any>;
  ratings_count?: number;
  reviews_text_count?: string;
  added?: number;
  added_by_status?: Record<string, any>;
  metacritic?: number;
  playtime?: number;
  suggestions_count?: number;
  updated?: string;

  esrb_rating?: {
    id: number;
    slug: string;
    name: string;
  };

  platforms?: {
    platform: {
      id: number;
      slug: string;
      name: string;
    };
    released_at?: string;
    requirements?: {
      minimum?: string;
      recommended?: string;
    };
  }[];
}

export class MetacriticPlatform {
  metascore: number;
  url: string;
  platform: {
    platform: number;
    name: string;
    slug: string;
  };
}

export class Rating {
  id: number;
  title: string;
  count: number;
  percent: number;
}

export class PlatformInfo {
  platform: {
    id: number;
    name: string;
    slug: string;
    image?: string | null;
    year_end?: number | null;
    year_start?: number | null;
    games_count: number;
    image_background: string;
  };
  released_at: string;
  requirements?: any;
}

export class StoreInfo {
  id: number;
  url: string;
  store: {
    id: number;
    name: string;
    slug: string;
    domain: string;
    games_count: number;
    image_background: string;
  };
}

export class Developer {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export class Genre {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export class Tag {
  id: number;
  name: string;
  slug: string;
  language: string;
  games_count: number;
  image_background: string;
}

export class Publisher {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export class EsrbRating {
  id: number;
  name: string;
  slug: string;
}

export class FullGameInfo {
  id: number;
  slug: string;
  name: string;
  name_original: string;
  description: string;
  metacritic: number;
  metacritic_platforms: MetacriticPlatform[];
  released: string;
  tba: boolean;
  updated: string;
  background_image: string;
  background_image_additional: string;
  website: string;
  rating: number;
  rating_top: number;
  ratings: Rating[];
  added: number;
  playtime: number;
  screenshots_count: number;
  movies_count: number;
  achievements_count: number;
  reddit_url: string;
  reddit_count: number;
  twitch_count: number;
  youtube_count: number;
  ratings_count: number;
  suggestions_count: number;
  metacritic_url: string;
  platforms: PlatformInfo[];
  stores: StoreInfo[];
  developers: Developer[];
  genres: Genre[];
  tags: Tag[];
  publishers: Publisher[];
  esrb_rating: EsrbRating;
  description_raw: string;
}
