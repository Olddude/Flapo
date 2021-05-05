using TheOldDude.Domain.Extensions;

using FluentAssertions;
using Xunit;

namespace TheOldDude.Domain.Tests
{
    public class WhenArticleShortDescriptionIsValid
    {
        [Fact]
        public void ThenUnitCountIsCalculated()
        {
            var sut = new Article
            {
                Price = 19.99m,
                ShortDescription = "20 x 0,5L (Glas)"
            };
            var unitCount = sut.UnitCount();
            unitCount.Should().Be(10.0m);
        }

        [Fact]
        public void ThenPricePerUnitIsCalculated()
        {
            var sut = new Article
            {
                Price = 19.99m,
                ShortDescription = "20 x 0,5L (Glas)"
            };
            var pricePerUnit = sut.PricePerUnit();
            pricePerUnit.Should().Be(1.999m);
        }
    }
}
