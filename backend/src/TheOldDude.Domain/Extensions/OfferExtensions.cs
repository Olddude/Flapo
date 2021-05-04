using System.Collections.Generic;
using System.Linq;

namespace TheOldDude.Domain.Extensions
{
    public static class OfferExtensions
    {
        /// <summary>
        /// map articles into posts
        /// </summary>
        /// <param name="offer"></param>
        /// <returns>posts</returns>
        public static IEnumerable<Post> AsPosts(this Offer offer)
        {
            return offer.Articles.Select(article =>
            {
                return new Post
                {
                    Offer = new Offer
                    {
                        Id = offer.Id,
                        BrandName = offer.BrandName,
                        DescriptionText = offer.DescriptionText,
                        Name = offer.Name
                    },
                    Article = article,
                    PricePerUnit = article.PricePerUnit()
                };
            });
        }
    }
}
