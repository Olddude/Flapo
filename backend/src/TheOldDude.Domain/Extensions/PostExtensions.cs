using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace TheOldDude.Domain.Extensions
{
    public static class PostExtensions
    {
        /// <summary>
        /// Builds post response
        /// </summary>
        /// <param name="post"></param>
        /// <returns>post response</returns>
        public static PostResponse AsResponse(this Post post)
        {
            return new PostResponse
            {
                OfferId = post.Offer.Id,
                ArticleId = post.Article.Id,
                Name = post.Offer.Name,
                Image = post.Article.Image,
                PricePerUnit = post.Article.PricePerUnitText,
                Description = post.Article.ShortDescription
            };
        }

        /// <summary>
        /// Multisorts an enumeration of posts applied in order
        /// </summary>
        /// <param name="posts"></param>
        /// <param name="options"></param>
        /// <returns>sorted posts</returns>
        public static IEnumerable<Post> SortBy(this IEnumerable<Post> posts, SortOptions options)
        {
            if (options == null)
            {
                return posts;
            }

            var sorters = options.GetKeyValuePairs()
                .Where(sorter =>
                {
                    var validSorterProperties = new string[] { "pricePerUnit", "price" };
                    if (!validSorterProperties.Contains(sorter.Key))
                    {
                        return false;
                    }

                    var validSorterOrder = new string[] { "asc", "desc" };
                    if (!validSorterOrder.Contains(sorter.Value))
                    {
                        return false;
                    }

                    return true;
                });
            
            return sorters.Count() <= 0
                ? posts
                : posts.Aggregate(new List<Post>(), (acc, post) =>
                {
                    acc.Add(post);

                    foreach(var sorter in sorters)
                    {
                        var sorterType = sorter.Value;

                        if (sorter.Key == "pricePerUnit")
                        {
                            if (sorterType == "asc")
                            {
                                acc = acc.OrderBy(post => post.PricePerUnit).ToList();
                            }
                            if (sorterType == "desc")
                            {
                                acc = acc.OrderByDescending(post => post.PricePerUnit).ToList();
                            }
                        }

                        if (sorter.Key == "price")
                        {
                            if (sorterType == "asc")
                            {
                                acc = acc.OrderBy(order => order.Article.Price).ToList();
                            }
                            if (sorterType == "desc")
                            {
                                acc = acc.OrderByDescending(order => order.Article.Price).ToList();
                            }
                        }
                    }

                    return acc;
                });
        }

        public static IEnumerable<Post> FilterBy(this IEnumerable<Post> posts, FilterOptions options)
        {
            if (options == null)
            {
                return posts;
            }

            var filters = options.GetKeyValuePairs()
                .Where(filter =>
                {
                    var validFilterProperties = new string[] { "pricePerUnit", "price" };
                    if (!validFilterProperties.Contains(filter.Key))
                    {
                        return false;
                    }

                    var filterType = filter.Value.Substring(0, 3);

                    var validFilterTypes = new string[] { "$lt", "$gt", "$eq" };
                    if (!validFilterTypes.Contains(filterType))
                    {
                        return false;
                    }

                    return true;
                });

            return filters.Count() <= 0
                ? posts
                : posts.Where(post =>
                {
                    var result = false;

                    foreach (var filter in filters)
                    {
                        var filterType = filter.Value.Substring(0, 3);
                        var filterValue = filter.Value.Replace(filterType, string.Empty);

                        if (filter.Key == "pricePerUnit")
                        {
                            var value = decimal.Parse(filterValue, CultureInfo.InvariantCulture);
                            if (filterType == "$gt") return post.PricePerUnit > value;
                            if (filterType == "$lt") return post.PricePerUnit < value;
                            if (filterType == "$eq") return post.PricePerUnit == value;
                            return false;
                        }

                        if (filter.Key == "price")
                        {
                            var value = decimal.Parse(filterValue, CultureInfo.InvariantCulture);
                            if (filterType == "$gt") return post.Article.Price > value;
                            if (filterType == "$lt") return post.Article.Price < value;
                            if (filterType == "$eq") return post.Article.Price == value;
                            return false;
                        }
                    }

                    return result;
                });
        }
    }
}
