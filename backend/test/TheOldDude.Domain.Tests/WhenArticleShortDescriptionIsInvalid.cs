using TheOldDude.Domain.Extensions;
using TheOldDude.Domain.Messages;

using FluentAssertions;
using Xunit;

using System;
using System.Globalization;

namespace TheOldDude.Domain.Tests
{
    public class WhenArticleShortDescriptionIsInvalid
    {
        [Theory]
        [InlineData("0.5")]
        [InlineData("0,5")]
        public void DeleteMe(string decimalString)
        {
            decimal.Parse
            (
                decimalString.Replace(",", "."),
                CultureInfo.InvariantCulture
            ).Should().Be(0.5m);
        }

        [Fact]
        public void ThenInvalidShortDescriptionIsThrown()
        {
            var article = new Article
            {
                ShortDescription = "20 x asdasdasd"
            };

            Action action = () => article.PricePerUnit();

            action.Should().ThrowExactly<InvalidShortDescription>()
                .WithMessage(article.ShortDescription);
        }
    }
}
