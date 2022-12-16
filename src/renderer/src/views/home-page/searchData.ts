export interface Thumb {
    large: string;
    original: string;
    small: string;
}

export interface Data {
    id: string;
    url: string;
    short_url: string;
    views: number;
    favorites: number;
    source: string;
    purity: string;
    category: string;
    dimension_x: number;
    dimension_y: number;
    resolution: string;
    ratio: string;
    file_size: number;
    file_type: string;
    created_at: string;
    colors: string[];
    path: string;
    thumbs: Thumb;
}

export interface Meta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    query: string;
    seed: string;
}

export interface RootObject {
    data: Data[];
    meta: Meta;
}