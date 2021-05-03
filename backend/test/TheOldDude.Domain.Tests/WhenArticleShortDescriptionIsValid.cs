using TheOldDude.Domain.Extensions;

using FluentAssertions;
using Xunit;

namespace TheOldDude.Domain.Tests
{
    public class WhenArticleShortDescriptionIsValid
    {
        [Fact]
        public void ThenPricePerUnitIsCalculated()
        {
            var article = new Article
            {
                Price = 19.99m,
                ShortDescription = "20 x 0,5L (Glas)"
            };
            article.PricePerUnit().Should().Be(1.999m);
        }
    }
}
