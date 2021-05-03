using TheOldDude.Domain.Messages;

using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;

namespace TheOldDude.Domain.Extensions
{
    public static class ArticleExtensions
    {
        /// <summary>
        /// calculates unit count from short description
        /// </summary>
        /// <param name="article"></param>
        /// <returns>unit count</returns>
        public static decimal UnitCount(this Article article)
        {
            var pattern = new Regex("[\\d]{1,} x [\\d]{1},[\\d]{1,}[\\D]{1,}.*");
            if (pattern.IsMatch(article.ShortDescription))
            {
                return article.ShortDescription
                    .Split(" ")
                    .Where((part, index) => index == 0 || index == 2)
                    .Select(part =>
                    {
                        var output = Regex.Replace(part, @"[^\d,]", string.Empty);
                        return output.Replace(",", ".");
                    })
                    .Select(normalizedPart => decimal.Parse(normalizedPart, CultureInfo.InvariantCulture))
                    .Aggregate(decimal.MaxValue, (acc, num) => acc == decimal.MaxValue ? num : acc * num);
            }
            else
            {
                throw new InvalidShortDescription(article.ShortDescription);
            }
        }

        /// <summary>
        /// price divided by unit count
        /// </summary>
        /// <param name="article"></param>
        /// <exception cref="InvalidShortDescription"></exception>
        /// <returns>price per unit</returns>
        public static decimal PricePerUnit(this Article article)
        {
            return article.Price / article.UnitCount();
        }
    }
}
