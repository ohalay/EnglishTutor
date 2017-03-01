interface Word extends Information {
    name: string;
    translation: string;
    description: string;
    sentences: string[];
    images: any[];
    timestamp: number;
    translateAmount: number;
    lastTranslated: number;
}
