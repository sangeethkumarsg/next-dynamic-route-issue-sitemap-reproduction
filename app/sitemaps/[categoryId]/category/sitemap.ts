//app/sitemaps/[categoryId]/category/sitemap.ts

import { MetadataRoute } from 'next';

const SiteURL = "https://www.example.com";

const getCategories = async(categoryId:number) => {
    const categoryMap:any = {
        1: ["videos","articles"],
        2: ["news", "images"]
    }
    return categoryMap[categoryId];
}

const getCategoryLink = (category:string) => {
    return `${category.toLocaleLowerCase().replace(/\./g, '-').replace(/\s/g,'-')}`
}

export default async function sitemap({ params }: { params: { categoryId: string } }) : Promise<MetadataRoute.Sitemap> {
    console.log("Params: ",params);
    const categories:string[] = await getCategories(parseInt(params.categoryId));

    return categories.map(category => {
        return( {
            url: `${SiteURL}${getCategoryLink(category)}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
          })
    })
}


