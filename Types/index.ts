export interface bannerType {
    buttontext: string;
    desc: string;
    discount: string;
    image: imageType[];
    largeText: string;
    largerText: string;
    midText: string;
    product: string;
    saleTime: string;
    smallText: string;
}

interface imageType{
    _type: 'image';
    _key: string;
}

interface slugType{
    _type: "slug";
    current: string;
}

export interface productType {
    name: string;
    image: imageType[];
    slug: slugType;
    price: number;
    details: string;
    rating: number;
    _id: string;
}